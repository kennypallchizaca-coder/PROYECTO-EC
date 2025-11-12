// Datos de contacto centralizados para que los componentes puedan
// reutilizarlos o actualizarlos desde un único lugar.
export type ContactChannel = {
  id: string;
  type: 'email' | 'phone' | 'social';
  label: string;
  value: string;
  description: string;
  actionUrl?: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'whatsapp',
    type: 'phone',
    label: 'Escríbenos por WhatsApp',
    value: '+593 987 654 321',
    description: 'Atención personalizada de lunes a viernes de 8h00 a 18h00.',
    actionUrl: 'https://wa.me/593987654321',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Contacto general',
    value: 'hola@radiowave.fm',
    description: 'Consultas comerciales, prensa y programación.',
    actionUrl: 'mailto:hola@radiowave.fm',
  },
  {
    id: 'instagram',
    type: 'social',
    label: 'Instagram',
    value: '@radiowave.fm',
    description: 'Historias, backstage y concursos en vivo.',
    actionUrl: 'https://instagram.com/radiowave.fm',
  },
  {
    id: 'tiktok',
    type: 'social',
    label: 'TikTok',
    value: '@radiowave.fm',
    description: 'Clips de programas, retos y playlists para descubrir música.',
    actionUrl: 'https://www.tiktok.com/@radiowave.fm',
  },
];
