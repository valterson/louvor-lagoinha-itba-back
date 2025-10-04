import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMusicaDto {
  @ApiProperty({
    description: 'Título da música',
    example: 'O Senhor é Bom',
  })
  @IsString()
  titulo: string;

  @ApiPropertyOptional({
    description: 'Artista ou compositor da música',
    example: 'Ministério Zoe',
  })
  @IsOptional()
  @IsString()
  artista?: string;

  @ApiPropertyOptional({
    description: 'Link para a cifra da música',
    example: 'https://www.cifraclub.com.br/ministerio-zoe/o-senhor-e-bom/',
  })
  @IsOptional()
  @IsUrl()
  link_cifra?: string;

  @ApiPropertyOptional({
    description: 'Link para o vídeo no YouTube',
    example: 'https://www.youtube.com/watch?v=example',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Link do YouTube deve ser uma URL válida' })
  link_youtube?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'Tom deve ter no máximo 10 caracteres' })
  tom?: string;
}
