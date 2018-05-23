export interface Place {
    id: number;
    name: string;
    country: string;
    coord: Coord;
  }
  export interface Coord {
    lon: number;
    lat: number;
  }
