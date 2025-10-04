import { CultoMusica } from './culto-musica.entity';
import { CultoBanda } from './culto-banda.entity';
import { CultoEquipeMidia } from './culto-equipe-midia.entity';
export declare enum TipoCulto {
    QUARTA = "quarta",
    DOMINGO = "domingo"
}
export declare class Culto {
    id: string;
    nome: string;
    tipo: TipoCulto;
    data: Date;
    musicas: CultoMusica[];
    banda: CultoBanda[];
    equipeMidia: CultoEquipeMidia[];
    createdAt: Date;
    updatedAt: Date;
}
