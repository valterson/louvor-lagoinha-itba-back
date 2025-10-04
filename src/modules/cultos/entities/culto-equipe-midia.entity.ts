import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Culto } from './culto.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

export enum TipoEquipeMidia {
  FOTOGRAFIA = 'fotografia',
  MESA_SOM = 'mesa_som',
  DATA_SHOW = 'data_show',
}

@Entity('cultos_equipe_midia')
export class CultoEquipeMidia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'culto_id', nullable: false })
  cultoId: string;

  @Column({ name: 'pessoa_id', nullable: false })
  pessoaId: string;

  @Column({ type: 'enum', enum: TipoEquipeMidia, nullable: false })
  tipo: TipoEquipeMidia;

  @ManyToOne(() => Culto, (culto) => culto.equipeMidia, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'culto_id' })
  culto: Culto;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
