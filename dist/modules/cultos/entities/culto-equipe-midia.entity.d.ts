import { Culto } from './culto.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
export declare enum TipoEquipeMidia {
    FOTOGRAFIA = "fotografia",
    MESA_SOM = "mesa_som",
    DATA_SHOW = "data_show"
}
export declare class CultoEquipeMidia {
    id: string;
    cultoId: string;
    pessoaId: string;
    tipo: TipoEquipeMidia;
    culto: Culto;
    pessoa: Pessoa;
    createdAt: Date;
}
