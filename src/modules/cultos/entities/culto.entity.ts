import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CultoMusica } from './culto-musica.entity';
import { CultoBanda } from './culto-banda.entity';
import { CultoEquipeMidia } from './culto-equipe-midia.entity';

export enum TipoCulto {
  QUARTA = 'quarta',
  DOMINGO = 'domingo',
}

@Entity('cultos')
export class Culto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  nome: string;

  @Column({ type: 'enum', enum: TipoCulto, nullable: false })
  tipo: TipoCulto;

  @Column({ type: 'date', nullable: false })
  data: Date;

  @OneToMany(() => CultoMusica, (cultoMusica) => cultoMusica.culto)
  musicas: CultoMusica[];

  @OneToMany(() => CultoBanda, (cultoBanda) => cultoBanda.culto)
  banda: CultoBanda[];

  @OneToMany(
    () => CultoEquipeMidia,
    (cultoEquipeMidia) => cultoEquipeMidia.culto,
  )
  equipeMidia: CultoEquipeMidia[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
