// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://example.com', // cámbialo por el dominio real al publicar

  security: {
    csp: {
      algorithm: 'SHA-256',
      // script-src y style-src los gestiona Astro con hashes automáticos
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
    },
  },
});