import { DataSource } from 'typeorm';
export declare class HealthController {
    private dataSource;
    constructor(dataSource: DataSource);
    check(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        database: {
            status: string;
            message: string;
            timestamp: string;
            error?: undefined;
        } | {
            status: string;
            message: string;
            error: any;
            timestamp: string;
        };
    }>;
    checkDatabase(): Promise<{
        status: string;
        message: string;
        timestamp: string;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        timestamp: string;
    }>;
}
