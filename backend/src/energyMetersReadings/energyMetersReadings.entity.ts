import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Decimal from 'decimal.js';
import { DecimalTransformer } from '../decimalTransformer';
import { Transform } from 'class-transformer';

@Entity()
export class EnergyMetersReadings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    // precision: 10,
    // scale: 2,
    // default: 0.0,
    // transformer: new DecimalTransformer(),
  })
  date: Date;

  @Column({
    type: 'time',
    // precision: 10,
    // scale: 2,
    // default: 0.0,
    // transformer: new DecimalTransformer(),
  })
  time: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  energyMeterReadingsDay: Decimal;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  energyMeterReadingsNight: Decimal;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  inputCircuitBreakerEnergy: Decimal;
}
