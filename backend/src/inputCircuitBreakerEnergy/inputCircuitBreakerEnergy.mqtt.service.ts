import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy.entity';
import { v4 as uuidv4 } from 'uuid';
import { PendingDeviceRequestService } from '../mqttResponse/pendingDeviceRequest.service';
import {
  CHANNEL_DEVICES,
  SLICE_DAY,
  SLICE_NIGHT,
} from '../energyMetersReadings/channelDevices';

@Injectable()
export class InputCircuitBreakerEnergysMqttService {
  constructor(
    @InjectRepository(InputCircuitBreakerEnergy)
    private usersRepository: Repository<InputCircuitBreakerEnergy>,
    private readonly pendingDeviceRequest: PendingDeviceRequestService,
  ) {}

  findAll(): Promise<InputCircuitBreakerEnergy[]> {
    return this.usersRepository.find();
  }

  findWhere(date, time): Promise<InputCircuitBreakerEnergy[]> {
    return this.usersRepository.find({
      where: {
        day: date,
        // time: time,
      },
    });
  }

  findOne(id: string): Promise<InputCircuitBreakerEnergy | null> {
    return this.usersRepository.findOneBy({ id });
  }

  insertIndication(data): Promise<InputCircuitBreakerEnergy | null> {
    this.usersRepository.save(data);
    return data;
  }

  insert(data): Promise<InputCircuitBreakerEnergy | null> {
    const addZero = (data) => {
      if (data / 10 < 1) {
        return `0${data}`;
      } else return data;
    };
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();

    const today = `${year}-${addZero(month)}-${addZero(dayOfMonth)}`;

    // Устройство ответа: если openhab его прислал — верим ему, иначе
    // сопоставляем с ожидающим запросом.
    const pendingDevice = this.pendingDeviceRequest.take();

    data.forEach(async (element) => {
      const device = element.device ?? pendingDevice;

      if (!device) {
        console.warn(
          'Ответ /energy/response без ожидающего запроса — отброшен',
          element,
        );
        return;
      }

      element.device = device;

      const elementDay = await this.usersRepository.find({
        where: {
          day: element.day,
          device: device,
        },
      });
      console.log(
        'today',
        !(today === element.day),
        element.day,
        today,
        elementDay,
        elementDay.length === 0 && 0,
      );

      if (elementDay.length === 0) {
        console.log('today21', element, element.energyDay);
        if (element.energyDay) {
          element.id = uuidv4();
          this.usersRepository.insert(element);
          console.log('today2', element);
        }
      } else {
        if (Number(elementDay[0].energyDay) === 0 && element.energyDay) {
          const saveStr = {
            id: elementDay[0].id,
            energyDay: element.energyDay,
          };
          this.usersRepository.save(saveStr);
          console.log('today111', saveStr);
        }
        if (Number(elementDay[0].energyNight) === 0 && element.energyNight) {
          const saveStr = {
            id: elementDay[0].id,
            energyNight: element.energyNight,
          };
          this.usersRepository.save(saveStr);
          console.log('today112', saveStr);
        }
      }
    });

    return null;
  }

  /**
   * Показания всех каналов на один срез (07:00 или 23:00). В отличие от
   * /energy/days такой ответ самодостаточен: в нём есть и дата, и время, и
   * все каналы, поэтому сопоставлять его с запросом не нужно.
   */
  async insertSlice(data: any): Promise<void> {
    const day = data?.date;
    const time = data?.time;

    if (!day || (time !== SLICE_DAY && time !== SLICE_NIGHT)) {
      return;
    }

    const column = time === SLICE_DAY ? 'energyDay' : 'energyNight';

    for (const [channel, device] of Object.entries(CHANNEL_DEVICES)) {
      const value = Number(data[channel]);

      if (!data[channel] || Number.isNaN(value) || value === 0) {
        continue;
      }

      const rows = await this.usersRepository.find({ where: { day, device } });

      if (rows.length === 0) {
        await this.usersRepository.insert({
          id: uuidv4(),
          day,
          device,
          [column]: value,
        } as any);
        continue;
      }

      // Уже записанное показание не трогаем: срез снимается один раз.
      if (Number(rows[0][column]) === 0) {
        await this.usersRepository.save({ id: rows[0].id, [column]: value });
      }
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
