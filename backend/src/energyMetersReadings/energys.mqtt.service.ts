import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnergyMetersReadings } from './energyMetersReadings.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EnergysMqttService {
  constructor(
    @InjectRepository(EnergyMetersReadings)
    private usersRepository: Repository<EnergyMetersReadings>,
  ) {}

  findAll(): Promise<EnergyMetersReadings[]> {
    return this.usersRepository.find();
  }

  findWhere(date, time): Promise<EnergyMetersReadings[]> {
    return this.usersRepository.find({
      where: {
        date: date,
        time: time,
      },
    });
  }

  findOne(id: string): Promise<EnergyMetersReadings | null> {
    return this.usersRepository.findOneBy({ id });
  }

  insertIndication(data): Promise<EnergyMetersReadings | null> {
    this.usersRepository.save(data);
    return data;
  }

  insert(data): Promise<EnergyMetersReadings | null> {
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
          //   day: element.day,
        },
      });
      console.log('today', !(today === element.day), element.day, today);
      if (elementDay.length === 0 && !(today === element.day)) {
        element.id = uuidv4();
        this.usersRepository.insert(element);
        console.log('today2', today === element.day, element.day, today);
      }
    });

    return null;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
