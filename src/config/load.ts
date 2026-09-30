// src/config/load.ts
import type { SiteConfig } from './schema';

// Carga todas las configuraciones de sites/*/site.config.ts
const sites = import.meta.glob<SiteConfig>('../../sites/*/site.config.ts', {
  eager: true,
  import: 'default',
});

const siteName = process.env.SITE ?? 'cafeteria';

// Solo nombres simples: evita rutas raras como "../../algo"
if (!/^[a-z0-9-]+$/.test(siteName)) {
  throw new Error(`Nombre de sitio no válido: "${siteName}"`);
}

const key = `../../sites/${siteName}/site.config.ts`;

if (!(key in sites)) {
  const disponibles = Object.keys(sites)
    .map((k) => k.split('/').at(-2))
    .join(', ');
  throw new Error(`No existe el sitio "${siteName}". Disponibles: ${disponibles}`);
}

export const site: SiteConfig = sites[key];