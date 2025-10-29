"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
exports.textEquals = textEquals;
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
function textEquals(text1, text2) {
    return normalizeText(text1) === normalizeText(text2);
}
//# sourceMappingURL=text-utils.js.map