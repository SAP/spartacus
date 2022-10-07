export interface StoreData {
  id: string;
  name: string;
  displayName: string;
  line1: string;
  line2: string;
  town: string;
  formattedDistance: string;
  latitude: number;
  longitude: number;
  image: string;
  productcode: string;
  openings: { [opening: string]: string };
  features: Array<string>;
}

export interface MapData {
  total: number;
  data: Array<StoreData>;
}
