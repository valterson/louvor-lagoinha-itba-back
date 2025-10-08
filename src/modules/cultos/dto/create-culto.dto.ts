import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MomentoMusica } from '../entities/culto-musica.entity';
import { TipoBanda } from '../entities/culto-banda.entity';

class CultoBandaDto {
  @ApiProperty({
    description: 'ID da pessoa',
    example: 'uuid-da-pessoa',
  })
  @IsUUID()
  pessoa_id: string;

  @ApiProperty({
    description: 'Tipo (instrumento ou voz)',
    enum: TipoBanda,
    example: TipoBanda.INSTRUMENTO,
  })
  @IsEnum(TipoBanda)
  tipo: TipoBanda;

  @ApiPropertyOptional({
    description: 'Instrumento (se tipo for instrumento)',
    example: 'violao',
  })
  @IsOptional()
  @IsString()
  instrumento?: string;
}

class CultoMusicaDto {
  @ApiProperty({
    description: 'ID da música',
    example: 'uuid-da-musica',
  })
  @IsUUID()
  musica_id: string;

  @ApiProperty({
    description: 'Momento da música no culto',
    enum: MomentoMusica,
    example: MomentoMusica.INICIO,
  })
  @IsEnum(MomentoMusica)
  momento: MomentoMusica;

  @ApiProperty({
    description: 'Ordem da música dentro do momento',
    example: 1,
  })
  @IsString() // Note: será convertido para number no service
  ordem: string;
}

export class CreateCultoDto {
  @ApiPropertyOptional({
    description: 'Nome personalizado do culto',
    example: 'Culto Especial de Natal',
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Data do culto',
    example: '2024-12-29',
  })
  @IsDateString()
  data: string;

  @ApiPropertyOptional({
    description: 'IDs das pessoas responsáveis pela fotografia',
    example: ['uuid-da-pessoa-1', 'uuid-da-pessoa-2'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  fotografia_ids?: string[];

  @ApiPropertyOptional({
    description: 'ID da pessoa responsável pela mesa de som',
    example: 'uuid-da-pessoa',
  })
  @IsOptional()
  @IsUUID()
  mesa_som_id?: string;

  @ApiPropertyOptional({
    description: 'ID da pessoa responsável pelo data show',
    example: 'uuid-da-pessoa',
  })
  @IsOptional()
  @IsUUID()
  data_show_id?: string;

  @ApiPropertyOptional({
    description: 'Banda do culto (instrumentos e vozes)',
    type: [CultoBandaDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CultoBandaDto)
  banda?: CultoBandaDto[];

  @ApiPropertyOptional({
    description: 'Músicas do culto',
    type: [CultoMusicaDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CultoMusicaDto)
  musicas?: CultoMusicaDto[];
}
