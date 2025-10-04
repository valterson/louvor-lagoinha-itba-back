import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Musica } from '../modules/musicas/entities/musica.entity';
import { Pessoa } from '../modules/pessoas/entities/pessoa.entity';
import { Culto } from '../modules/cultos/entities/culto.entity';
import { CultoBanda } from '../modules/cultos/entities/culto-banda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musica, Pessoa, Culto, CultoBanda])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
