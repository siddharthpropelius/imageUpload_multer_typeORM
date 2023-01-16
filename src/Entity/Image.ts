import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("image")
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
}
