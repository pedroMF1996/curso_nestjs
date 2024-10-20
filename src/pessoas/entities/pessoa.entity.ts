import { IsEmail } from 'class-validator';
import { RecadoEntity } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => RecadoEntity, recado => recado.de)
  recadosEnviados: Array<RecadoEntity>;
  @OneToMany(() => RecadoEntity, recado => recado.para)
  recadosRecebidos: Array<RecadoEntity>;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
