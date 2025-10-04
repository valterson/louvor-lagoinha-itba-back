import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getEstatisticas(): Promise<any>;
    getMusicasMaisTocadas(): Promise<any[]>;
    getParticipacaoPessoas(): Promise<any[]>;
}
