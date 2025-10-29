const { DataSource } = require('typeorm');
const { ConfigService } = require('@nestjs/config');

const configService = new ConfigService();

module.exports = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT') || '5432'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 5,
    min: 1,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 15000,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
});
