import { Culto } from './culto.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
export declare enum TipoBanda {
    INSTRUMENTO = "instrumento",
    VOZ = "voz"
}
export declare class CultoBanda {
    id: string;
    cultoId: string;
    pessoaId: string;
    tipo: TipoBanda;
    instrumento: string;
    culto: Culto;
    pessoa: Pessoa;
    createdAt: Date;
}
