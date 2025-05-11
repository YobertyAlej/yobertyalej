/**
 * Combina múltiples nombres de clases CSS en una sola cadena
 */
export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea una fecha en formato legible
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Obtiene la versión actual del proyecto desde package.json
 */
export function getProjectVersion(): string {
  return '0.1.0'; // En una implementación real, esto se obtendría dinámicamente
}

/**
 * Valida si una cadena es un correo electrónico válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}