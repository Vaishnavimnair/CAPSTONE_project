export interface OverpassPlace {
    lat: number; // Latitude
    lon: number; // Longitude
    tags: {
      name?: string; // Optional name property
    };
  }
