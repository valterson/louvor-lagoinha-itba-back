import { CreateMusicaDto } from './create-musica.dto';
declare const UpdateMusicaDto_base: import("@nestjs/common").Type<Partial<CreateMusicaDto>>;
export declare class UpdateMusicaDto extends UpdateMusicaDto_base {
    titulo?: string;
    artista?: string;
    link_cifra?: string;
    link_youtube?: string;
    tom?: string;
}
export {};
