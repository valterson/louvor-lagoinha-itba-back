import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultosService } from './cultos.service';
import { CultosController } from './cultos.controller';
import { Culto } from './entities/culto.entity';
import { CultoMusica } from './entities/culto-musica.entity';
import { CultoBanda } from './entities/culto-banda.entity';
import { CultoEquipeMidia } from './entities/culto-equipe-midia.entity';
import { MusicasModule } from '../musicas/musicas.module';
import { PessoasModule } from '../pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Culto,
      CultoMusica,
      CultoBanda,
      CultoEquipeMidia,
    ]),
    MusicasModule,
    PessoasModule,
  ],
  controllers: [CultosController],
  providers: [CultosService],
  exports: [CultosService],
})
export class CultosModule {}
