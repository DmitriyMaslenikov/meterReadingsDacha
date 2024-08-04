import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Year {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;
}
