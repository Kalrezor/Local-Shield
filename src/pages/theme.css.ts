// src/pages/theme.css.ts
import type { APIRoute } from 'astro';
import { site } from '../config/load';

export const GET: APIRoute = () => {
  const { primary, accent, background, text, font } = site.theme;

  const fontStack =
    font === 'serif'
      ? "Georgia, 'Times New Roman', serif"
      : "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  // Los colores ya están validados por el esquema (#RRGGBB),
  // así que no se puede inyectar CSS desde la configuración
  const css = `:root{--color-primary:${primary};--color-accent:${accent};--color-bg:${background};--color-text:${text};--font-body:${fontStack};}`;

  return new Response(css, {
    headers: { 'Content-Type': 'text/css; charset=utf-8' },
  });
};