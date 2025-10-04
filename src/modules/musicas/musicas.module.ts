import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicasService } from './musicas.service';
import { MusicasController } from './musicas.controller';
import { Musica } from './entities/musica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musica])],
  controllers: [MusicasController],
  providers: [MusicasService],
  exports: [MusicasService],
})
export class MusicasModule {}
