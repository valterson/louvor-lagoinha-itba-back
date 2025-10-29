/**
 * Remove acentos e converte para minúsculas para comparação
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica se dois textos são equivalentes (case e accent insensitive)
 */
export function textEquals(text1: string, text2: string): boolean {
  return normalizeText(text1) === normalizeText(text2);
}