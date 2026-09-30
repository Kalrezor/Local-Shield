// src/config/schema.ts
import { z } from 'astro/zod';

// --- Tipos reutilizables con validación de seguridad ---

// Solo enlaces https: bloquea javascript:, data:, http: y similares
const httpsUrl = z
  .string()
  .url()
  .refine((u) => new URL(u).protocol === 'https:', 'Solo se permiten enlaces https://');

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un color #RRGGBB');

// Teléfono en formato internacional: +34 600 000 000
const phone = z.string().regex(/^\+[1-9][0-9 ]{7,17}$/, 'Usa formato internacional: +34 600 000 000');

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Usa formato HH:MM');

// Toda imagen lleva texto alternativo (accesibilidad y SEO)
const image = z.object({
  src: z.custom<ImageMetadata>(),
  alt: z.string().min(1, 'Toda imagen necesita texto alternativo'),
});

// --- Esquema del negocio ---

export const siteSchema = z.object({
  business: z.object({
    name: z.string().min(1).max(60),
    tagline: z.string().max(120),
    description: z.string().max(300), // meta description para SEO
    type: z.enum(['CafeOrCoffeeShop', 'Restaurant', 'HairSalon', 'AutoRepair', 'Store', 'LocalBusiness']),
  }),

  theme: z.object({
    primary: hexColor,
    accent: hexColor,
    background: hexColor,
    text: hexColor,
    font: z.enum(['sans', 'serif']).default('sans'),
  }),

  contact: z.object({
    phone: phone,
    whatsapp: phone.optional(), // se convierte en https://wa.me/...
    email: z.string().email(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string().default('España'),
    }),
    mapsUrl: httpsUrl.optional(),
  }),

  hours: z.array(
    z.object({
      days: z.string(), // "Lunes a viernes"
      open: time,
      close: time,
    }),
  ),

  sections: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      image: image.optional(),
    }),
    about: z.object({
      title: z.string(),
      text: z.string().max(800),
      image: image.optional(),
    }),
    products: z.object({
      title: z.string(),
      items: z
        .array(
          z.object({
            name: z.string(),
            description: z.string().max(160),
            price: z.string().optional(), // texto libre: "2,50 €"
            image: image.optional(),
          }),
        )
        .max(24),
    }),
    gallery: z.array(image).max(12).default([]),
  }),

  social: z
    .array(
      z.object({
        network: z.enum(['instagram', 'facebook', 'tiktok', 'x', 'linkedin', 'youtube']),
        url: httpsUrl,
      }),
    )
    .default([]),

  // Datos para aviso legal y privacidad (LSSI-CE y RGPD)
  legal: z.object({
    owner: z.string(),  // razón social o nombre del titular
    taxId: z.string(),  // CIF/NIF del negocio
    email: z.string().email(),
  }),
});

export type SiteConfig = z.infer<typeof siteSchema>;

// Valida la configuración al importarla: si algo falla, el build se para
export function defineSite(config: z.input<typeof siteSchema>): SiteConfig {
  const result = siteSchema.safeParse(config);
  if (!result.success) {
    const errores = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Configuración del sitio no válida:\n${errores}`);
  }
  return result.data;
}