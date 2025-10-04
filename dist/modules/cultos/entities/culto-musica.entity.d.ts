import { Culto } from './culto.entity';
import { Musica } from '../../musicas/entities/musica.entity';
export declare enum MomentoMusica {
    INICIO = "inicio",
    DIZIMO = "dizimo",
    CRIANCAS = "criancas",
    FINAL = "final"
}
export declare class CultoMusica {
    id: string;
    cultoId: string;
    musicaId: string;
    momento: MomentoMusica;
    ordem: number;
    culto: Culto;
    musica: Musica;
    createdAt: Date;
}
