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
        ssl: {
          rejectUnauthorized: false,
        },
        // Configurações otimizadas para Supabase Connection Pooler no Render
        extra: {
          max: 5, // Reduzido para evitar sobrecarga
          min: 1, // Mínimo de conexões
          idleTimeoutMillis: 20000, // Reduzido timeout
          connectionTimeoutMillis: 15000, // Timeout de conexão
          acquireTimeoutMillis: 30000, // Timeout para adquirir conexão
          createTimeoutMillis: 30000, // Timeout para criar conexão
          destroyTimeoutMillis: 5000, // Timeout para destruir conexão
          reapIntervalMillis: 1000, // Intervalo de limpeza
          createRetryIntervalMillis: 200, // Intervalo entre tentativas
        },
        // Configurações de retry para conexão
        retryAttempts: 10,
        retryDelay: 3000,
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
