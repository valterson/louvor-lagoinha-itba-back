import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') || '5432'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? {
          rejectUnauthorized: false,
          ca: undefined,
        } : false,
        // Configurações otimizadas para Supabase Connection Pooler no Render
        extra: {
          max: 3, // Reduzido ainda mais para evitar sobrecarga
          min: 0, // Sem conexões mínimas para economizar recursos
          idleTimeoutMillis: 30000, // Aumentado para manter conexões por mais tempo
          connectionTimeoutMillis: 60000, // Aumentado timeout de conexão
          acquireTimeoutMillis: 60000, // Aumentado timeout para adquirir conexão
          createTimeoutMillis: 60000, // Aumentado timeout para criar conexão
          destroyTimeoutMillis: 10000, // Aumentado timeout para destruir conexão
          reapIntervalMillis: 5000, // Aumentado intervalo de limpeza
          createRetryIntervalMillis: 1000, // Aumentado intervalo entre tentativas
        },
        // Configurações de retry para conexão
        retryAttempts: 15,
        retryDelay: 5000,
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
    }),
  ],
})
export class DatabaseModule {
  constructor(private configService: ConfigService) {
    console.log('🔍 Database Configuration Debug:');
    console.log('DB_HOST:', this.configService.get('DB_HOST'));
    console.log('DB_PORT:', this.configService.get('DB_PORT'));
    console.log('DB_USERNAME:', this.configService.get('DB_USERNAME'));
    console.log(
      'DB_PASSWORD:',
      this.configService.get('DB_PASSWORD') ? '***SET***' : 'NOT SET',
    );
    console.log('DB_DATABASE:', this.configService.get('DB_DATABASE'));
    console.log('NODE_ENV:', this.configService.get('NODE_ENV'));
  }
}
