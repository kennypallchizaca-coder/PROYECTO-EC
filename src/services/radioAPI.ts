import { ImageSourcePropType } from 'react-native';

export type Station = {
  id: string;
  name: string;
  streamUrl: string;
  genre: string;
  country: string;
  description: string;
  image: string | ImageSourcePropType;
  website?: string;
  bitrateKbps?: number;
};

// Solo la emisora principal para una app más ligera
const STATIONS: Station[] = [
  {
    id: 'radio-sisid-ecuador',
    name: 'Radio Sisid Ecuador',
    // TODO: Reemplazar con la URL oficial del stream de Radio Sisid Ecuador
    streamUrl: 'https://stream.radioparadise.com/aac-320',
    genre: 'Noticias y Música',
    country: 'Ecuador',
    description: 'Programación local, noticias y música. Señal oficial.',
    image: require('../images/logoradiosisidec.jpg'),
    website: 'https://radiosisid.ec',
    bitrateKbps: 128,
  },
];

export const fetchStations = async (): Promise<Station[]> => STATIONS;

export const getStationById = async (id: string): Promise<Station | undefined> =>
  STATIONS.find((station) => station.id === id);

