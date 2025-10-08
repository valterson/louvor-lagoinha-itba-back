import { CultoMusica } from './culto-musica.entity';
import { CultoBanda } from './culto-banda.entity';
import { CultoEquipeMidia } from './culto-equipe-midia.entity';
export declare class Culto {
    id: string;
    nome: string | null;
    data: Date;
    musicas: CultoMusica[];
    banda: CultoBanda[];
    equipeMidia: CultoEquipeMidia[];
    createdAt: Date;
    updatedAt: Date;
}
