"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCultoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_culto_dto_1 = require("./create-culto.dto");
class UpdateCultoDto extends (0, swagger_1.PartialType)(create_culto_dto_1.CreateCultoDto) {
}
exports.UpdateCultoDto = UpdateCultoDto;
