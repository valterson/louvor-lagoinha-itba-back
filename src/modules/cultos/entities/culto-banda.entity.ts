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

export enum TipoBanda {
  INSTRUMENTO = 'instrumento',
  VOZ = 'voz',
}

@Entity('cultos_banda')
export class CultoBanda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'culto_id', nullable: false })
  cultoId: string;

  @Column({ name: 'pessoa_id', nullable: false })
  pessoaId: string;

  @Column({ type: 'enum', enum: TipoBanda, nullable: false })
  tipo: TipoBanda;

  @Column({ length: 50, nullable: true })
  instrumento: string;

  @ManyToOne(() => Culto, (culto) => culto.banda)
  @JoinColumn({ name: 'culto_id' })
  culto: Culto;

  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
