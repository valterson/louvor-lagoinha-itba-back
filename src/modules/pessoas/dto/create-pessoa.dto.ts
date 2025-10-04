import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const instrumentosValidos = [
  'bateria',
  'baixo',
  'violao',
  'guitarra',
  'teclado',
];
const habilidadesValidas = ['fotografia', 'mesa_som', 'data_show'];

export class CreatePessoaDto {
  @ApiProperty({
    description: 'Nome da pessoa',
    example: 'João Silva',
  })
  @IsString()
  nome: string;

  @ApiPropertyOptional({
    description: 'Telefone da pessoa',
    example: '(11) 99999-9999',
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Instrumentos que a pessoa toca',
    example: ['violao', 'guitarra'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsIn(instrumentosValidos, { each: true })
  instrumentos?: string[];

  @ApiPropertyOptional({
    description: 'Se a pessoa é vocalista',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_vocalista?: boolean;

  @ApiPropertyOptional({
    description: 'Habilidades em mídia',
    example: ['fotografia', 'mesa_som'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsIn(habilidadesValidas, { each: true })
  habilidades_midia?: string[];
}
