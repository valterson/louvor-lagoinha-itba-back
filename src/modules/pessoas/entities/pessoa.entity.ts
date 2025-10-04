import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  nome: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'text', array: true, nullable: true })
  instrumentos: string[];

  @Column({ name: 'is_vocalista', default: false })
  isVocalista: boolean;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    name: 'habilidades_midia',
  })
  habilidadesMidia: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
