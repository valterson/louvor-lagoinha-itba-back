import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('musicas')
export class Musica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  titulo: string;

  @Column({ length: 255, nullable: true })
  artista: string;

  @Column({ type: 'text', nullable: true })
  link_cifra: string;

  @Column({ type: 'text', nullable: true })
  link_youtube: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tom: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
