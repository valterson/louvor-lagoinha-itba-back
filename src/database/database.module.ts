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
        // Configurações adicionais para o pooler do Supabase
        extra: {
          max: 10, // número máximo de conexões
          idleTimeoutMillis: 30000,
        },
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
