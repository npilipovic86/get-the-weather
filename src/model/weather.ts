export interface WeatherPlaces {
    cnt: number;
    list?: (Place)[] | null;
  }
  export interface Place {
    coord: Coord;
    sys: Sys;
    weather?: (WeatherEntity)[] | null;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    id: number;
    name: string;
  }
  export interface Coord {
    lon: number;
    lat: number;
  }
  export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  export interface WeatherEntity {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  }
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number | null;
  }
  export interface Clouds {
    all: number;
  }
