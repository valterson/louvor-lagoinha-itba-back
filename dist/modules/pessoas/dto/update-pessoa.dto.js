"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePessoaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_pessoa_dto_1 = require("./create-pessoa.dto");
class UpdatePessoaDto extends (0, swagger_1.PartialType)(create_pessoa_dto_1.CreatePessoaDto) {
}
exports.UpdatePessoaDto = UpdatePessoaDto;
