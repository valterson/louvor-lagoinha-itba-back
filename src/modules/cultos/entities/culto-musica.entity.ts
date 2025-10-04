import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Culto } from './culto.entity';
import { Musica } from '../../musicas/entities/musica.entity';

export enum MomentoMusica {
  INICIO = 'inicio',
  DIZIMO = 'dizimo',
  CRIANCAS = 'criancas',
  FINAL = 'final',
}

@Entity('cultos_musicas')
export class CultoMusica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'culto_id', nullable: false })
  cultoId: string;

  @Column({ name: 'musica_id', nullable: false })
  musicaId: string;

  @Column({ type: 'enum', enum: MomentoMusica, nullable: false })
  momento: MomentoMusica;

  @Column({ type: 'int', nullable: false })
  ordem: number;

  @ManyToOne(() => Culto, (culto) => culto.musicas)
  @JoinColumn({ name: 'culto_id' })
  culto: Culto;

  @ManyToOne(() => Musica)
  @JoinColumn({ name: 'musica_id' })
  musica: Musica;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
