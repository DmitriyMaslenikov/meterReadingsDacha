import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InputCircuitBreakerEnergysMqttService {
  constructor(
    @InjectRepository(InputCircuitBreakerEnergy)
    private usersRepository: Repository<InputCircuitBreakerEnergy>,
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

    data.forEach(async (element) => {
      const elementDay = await this.usersRepository.find({
        where: {
          day: element.day,
        },
      });
      console.log('today', !(today === element.day), element.day, today);
      if (elementDay.length === 0) {
        element.id = uuidv4();
        this.usersRepository.insert(element);
        console.log('today2', today === element.day, element.day, today);
      } else {
        if (Number(elementDay[0].energyDay) === 0 && element.energyDay) {
          const saveStr = {
            id: elementDay[0].id,
            energyDay: element.energyDay,
          };
          this.usersRepository.save(saveStr);
        }
        if (Number(elementDay[0].energyNight) === 0 && element.energyNight) {
          console.log('today111', today);
          const saveStr = {
            id: elementDay[0].id,
            energyNight: element.energyNight,
          };
          this.usersRepository.save(saveStr);
        }
      }
    });

    return null;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
