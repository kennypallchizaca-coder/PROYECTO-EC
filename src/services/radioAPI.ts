export type Station = {
  id: string;
  name: string;
  streamUrl: string;
  genre: string;
  country: string;
  description: string;
  image: string;
  website?: string;
  bitrateKbps?: number;
};

const STATIONS: Station[] = [
  {
    id: 'radio-paradise',
    name: 'Radio Paradise',
    streamUrl: 'https://stream.radioparadise.com/aac-320',
    genre: 'Eclectic',
    country: 'Estados Unidos',
    description: 'Selección curada de rock, electrónica y world music en alta calidad.',
    image: 'https://img.radioparadise.com/cdn/rp-2023.svg',
    website: 'https://radioparadise.com',
    bitrateKbps: 320,
  },
  {
    id: 'bbc-radio-one',
    name: 'BBC Radio 1',
    streamUrl: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
    genre: 'Pop / Hits',
    country: 'Reino Unido',
    description: 'Lo último en música pop, entrevistas y sesiones en vivo.',
    image: 'https://ichef.bbci.co.uk/images/ic/320xn/p07b27qy.png',
    website: 'https://www.bbc.co.uk/sounds/play/live:bbc_radio_one',
    bitrateKbps: 128,
  },
  {
    id: 'radio-garden',
    name: 'Costa Rica Radio Hits',
    streamUrl: 'https://stream-149.zeno.fm/bm4qaf8m4tzuv?zs=8aYlCWHrRruUzzdfHTn-0w',
    genre: 'Latino',
    country: 'Costa Rica',
    description: 'Éxitos latinos y pop tropical durante todo el día.',
    image: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/radio-2029710_1280.png',
    website: 'https://zeno.fm/radio/costa-rica-radio-hits/',
    bitrateKbps: 192,
  },
  {
    id: 'lofi-girl',
    name: 'Lofi Girl',
    streamUrl: 'https://stream.lofi.cloud/hls/lofi.m3u8',
    genre: 'Lo-Fi / Chill',
    country: 'Global',
    description: 'Beats relajantes ideales para concentrarte o estudiar.',
    image: 'https://cdn.lofigirl.com/assets/logo.png',
    website: 'https://lofigirl.com',
    bitrateKbps: 128,
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchStations = async (): Promise<Station[]> => {
  await sleep(300);
  return STATIONS;
};

export const getStationById = async (id: string): Promise<Station | undefined> => {
  await sleep(100);
  return STATIONS.find((station) => station.id === id);
};
