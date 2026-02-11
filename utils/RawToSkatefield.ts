import { Skatefield, SkatefieldReturn } from '../types/SkatefieldTypes';

const SKATEFIELD_TYPE_ID = "59268607-87f1-46c7-8a0e-cf99b220678b"; // Luistelukentät
const SKATEFIELD_TYPE = "Point"; // Geometrian tyyppi

export function toSkatefield(item: SkatefieldReturn): Skatefield {
  return {
    id: item.id,
    name: item.properties.name,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    status: item.properties?.status ?? "Ei tietoa",
    area: item.properties.groupId,
    maintenanceDelta: item.properties.maintenance?.delta ?? 999,
    maintenanceLatest: item.properties.maintenance?.latest ?? "Ei tietoa",
  };
}

// Suodatetaan kentät, joiden koordinaatit tyyppiä Point(yksi koordinaattipari)
// Palautusdatassa on muutama polygoni, joiden merkkaaminen kartalle vaikeampaa
export function isSkatefield(item: SkatefieldReturn): boolean {
  return (
    item.properties.typeId === SKATEFIELD_TYPE_ID && 
    item.geometry.type === SKATEFIELD_TYPE
  );
}