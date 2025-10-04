import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MusicasModule } from './modules/musicas/musicas.module';
import { PessoasModule } from './modules/pessoas/pessoas.module';
import { CultosModule } from './modules/cultos/cultos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    MusicasModule,
    PessoasModule,
    CultosModule,
    DashboardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
