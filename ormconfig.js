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
    max: 10,
    idleTimeoutMillis: 30000,
  },
});
