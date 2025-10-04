"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
    constructor(configService) {
        this.configService = configService;
        console.log('🔍 Database Configuration Debug:');
        console.log('DB_HOST:', this.configService.get('DB_HOST'));
        console.log('DB_PORT:', this.configService.get('DB_PORT'));
        console.log('DB_USERNAME:', this.configService.get('DB_USERNAME'));
        console.log('DB_PASSWORD:', this.configService.get('DB_PASSWORD') ? '***SET***' : 'NOT SET');
        console.log('DB_DATABASE:', this.configService.get('DB_DATABASE'));
        console.log('NODE_ENV:', this.configService.get('NODE_ENV'));
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
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
                    extra: {
                        max: 10,
                        idleTimeoutMillis: 30000,
                    },
                }),
            }),
        ],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseModule);
//# sourceMappingURL=database.module.js.map