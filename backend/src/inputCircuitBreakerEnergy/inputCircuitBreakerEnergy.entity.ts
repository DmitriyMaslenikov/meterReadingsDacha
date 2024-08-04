import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Decimal from 'decimal.js';
import { DecimalTransformer } from '../decimalTransformer';
import { Transform } from 'class-transformer';

@Entity()
export class InputCircuitBreakerEnergy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    // precision: 10,
    // scale: 2,
    // default: 0.0,
    // transformer: new DecimalTransformer(),
  })
  day: Date;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  energyDay: Decimal;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  energyNight: Decimal;
}
