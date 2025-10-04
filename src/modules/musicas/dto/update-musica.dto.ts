import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { CreateMusicaDto } from './create-musica.dto';

export class UpdateMusicaDto extends PartialType(CreateMusicaDto) {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  artista?: string;

  @IsOptional()
  @IsUrl()
  link_cifra?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Link do YouTube deve ser uma URL válida' })
  link_youtube?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'Tom deve ter no máximo 10 caracteres' })
  tom?: string;
}
