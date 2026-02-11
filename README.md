## Oleelliset tiedostot
```
components/
    SkatefieldMap.tsx   # Karttakomponentti
hooks/
    useSkatefield.ts    # Hook datan hakemiseen
types/
    SkatefieldTypes.ts  # Tyypit rajapinnalle ja sovellukselle
utils/
    RawtoSkatefield.ts  # Datan muunnos ja suodatus
App.tsx
```

## Sovelluksen idea
Näyttää kartalla Oulun luistelukenttien huoltotilanne.

## Tietoa rajapinnasta
Alkuperäisenä ajatuksena oli käyttää Oulun avoimen datan hiihtolatujen ja luistelukenttien [kunnossapitorajapintaa](https://data.ouka.fi/data/fi/dataset/oulun-seudun-hiihtolatujen-ja-luistelukenttien-kunnossapitorajapinta/resource/b794a8b3-008e-4a11-8ff2-12a6d9d26d46).

Tämä rajapinta kuitenkin on vanha ja ominaisuuksiltaan hyvin rajoittunut. Tutkimalla rajapinnan toteuttajan (**Fluent Progress**) omaa [sovellustoteutusta](https://oulu.fluentprogress.fi/outdoors/), löysin rajapinnan, joka palauttaa koko datan yhtenä listana **GeoJSON** muodossa.
- <https://oulu.fluentprogress.fi/outdoors/api/public/venue/list>.

Tämä lista sisältää luistelukentät, ladut ja moottorikelkkareitit, joten data pitää suodattaa tyypin mukaan. Kohteiden tyyppi-id:t löytyi toisesta rajapinnasta:
- <https://oulu.fluentprogress.fi/outdoors/api/public/venue-type/list>.

## Sovelluksen rakenne

### Types
Sovellus käyttää kahta tyyppiä, **Skatefield** ja **SkatefieldReturn**:

- **SkatefieldReturn**: Vastaa rajapinnan GeoJSON-rakennetta. Sisältää rajapinnasta tarvittavien tietojen kentät.

- **Skatefield**: Sisältää raa'sta palautusdatasta suodatetun tiedon, jota sovellus voi käyttää suoraan käyttöliittymäkomponenteissa.

### Components
- **SkatefieldMap**: Käyttää ```react-native-maps``` kirjaston ```MapView```-komponenttia. Piirtää kentät kartalle Markereina, joiden väri vaihtuu huoltotilanteen mukaan. Komponentti sisältää myös alareunasta nousevan infolaatikon (Bottom Sheet), joka näyttää valitun kentän tiedot.

### Hooks
- **useSkatefield**: Yhteydenpito rajapintaan. Hallitsee lataustilan, virheet, ja käyttää ```AbortControlleria``` kutsujen katkaisemiseen.

### Utils
- **RawToSkateField**: Sisältää kaksi apufunktiota pienimuotoiseen data mappingiin:
    - **toSkatefield**: Map-funktio, joka muuntaa ```SkatefieldReturn``` -objektin ```Skatefield``` tyyppiin. Kääntää myös GeoJSON-koordinaatit ```[lon, lat]```,
    koska ```MapView``` haluaa ne muodossa ```{ latitude, longitude }```.

    - **isSkatefield**: Suodatusfunktio, jonka avulla listasta valitaan vain luistelukentät ```typeId``` ja että kohteen geometria on tyyppiä ```Point```.

## Yleiset lähdemateriaalit
- Sovelluksen yleisrakenne ja useSkatefield-hook on pitkälti kurssin Cocktails harjoituksista.
- React Native maps-dokumentaatio: <https://github.com/react-native-maps/react-native-maps>.
- JSON datan jäsentäminen ja TypeScript tyypit: <https://www.convex.dev/typescript/typescript-101/fundamentals/typescript-json-type>.