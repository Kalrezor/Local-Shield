// sites/cafeteria/site.config.ts
import { defineSite } from '../../src/config/schema';

export default defineSite({
  business: {
    name: 'Café Aurora',
    tagline: 'Café de especialidad y bollería artesana en el centro',
    description:
      'Cafetería de barrio con café de especialidad, desayunos caseros y bollería artesana horneada cada mañana.',
    type: 'CafeOrCoffeeShop',
  },

  theme: {
    primary: '#6B4226',
    accent: '#D9A441',
    background: '#FBF7F2',
    text: '#2B2118',
    font: 'serif',
  },

  contact: {
    phone: '+34 600 000 000',
    whatsapp: '+34 600 000 000',
    email: 'hola@cafeaurora.example',
    address: {
      street: 'Calle Ejemplo, 12',
      city: 'Madrid',
      postalCode: '28000',
    },
  },

  hours: [
    { days: 'Lunes a viernes', open: '07:30', close: '20:00' },
    { days: 'Sábados y domingos', open: '09:00', close: '14:00' },
  ],

  sections: {
    hero: {
      title: 'Empieza el día con buen café',
      subtitle: 'Tostado local, leche fresca y bollería recién hecha.',
    },
    about: {
      title: 'Quiénes somos',
      text: 'Abrimos en 2019 con una idea sencilla: servir el café que nos gustaría tomar a nosotros. Trabajamos con tostadores locales y horneamos cada mañana.',
    },
    products: {
      title: 'Nuestra carta',
      items: [
        { name: 'Café con leche', description: 'Espresso de especialidad con leche fresca.', price: '1,80 €' },
        { name: 'Flat white', description: 'Doble ristretto con leche texturizada.', price: '2,50 €' },
        { name: 'Croissant de mantequilla', description: 'Horneado cada mañana.', price: '1,90 €' },
        { name: 'Tostada con tomate', description: 'Pan de masa madre, tomate y aceite de oliva.', price: '2,80 €' },
      ],
    },
  },

  legal: {
    owner: 'Café Aurora S.L. (empresa ficticia de demostración)',
    taxId: 'B00000000',
    email: 'privacidad@cafeaurora.example',
  },
});