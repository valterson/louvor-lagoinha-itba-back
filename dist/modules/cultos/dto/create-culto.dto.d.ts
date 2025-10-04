import { TipoCulto } from '../entities/culto.entity';
import { MomentoMusica } from '../entities/culto-musica.entity';
import { TipoBanda } from '../entities/culto-banda.entity';
declare class CultoBandaDto {
    pessoa_id: string;
    tipo: TipoBanda;
    instrumento?: string;
}
declare class CultoMusicaDto {
    musica_id: string;
    momento: MomentoMusica;
    ordem: string;
}
export declare class CreateCultoDto {
    tipo?: TipoCulto;
    data: string;
    fotografia_ids?: string[];
    mesa_som_id?: string;
    data_show_id?: string;
    banda?: CultoBandaDto[];
    musicas?: CultoMusicaDto[];
}
export {};
