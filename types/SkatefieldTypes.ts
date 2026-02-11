export type Skatefield = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  area: string;
  maintenanceDelta: number;
  maintenanceLatest: string;
}

/*
  SkatefieldReturn vastaa rajapinnasta saatavan GeoJSON datan FeatureCollection objektin
  features taulukon yksittäistä alkiota.
  {
    "type": "FeatureCollection",
    "features": []
  }
*/
export type SkatefieldReturn = {
  id: string;
  properties: {
    typeId: string; // Kentän tyyppi
    name: string;
    status: string; // Open / Closed
    groupId: string;  // Kaupunginosa
    maintenance?: {
      delta: number; // Tuntia viimeisestä huollosta
      latest: string; // Viimeisin huoltopäivämäärä
    };
  };
  geometry: {
    type: string; // Point, polygon, MultiLineString
    coordinates: number[]; // lon, lat(voi sisältää useita koordinaattipareja)
  };
};

