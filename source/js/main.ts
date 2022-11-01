import './cesium-types';

window.CESIUM_BASE_URL = '/Cesium';

import * as Cesium from 'cesium';
import {upperCase} from 'upper-case';
import {getPatch} from 'fast-array-diff';

import {City, CityName, cities, citiesByName} from './cities';
import {Player, playersByCity, players} from './players';
import Entity from 'cesium/Source/DataSources/Entity';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTQzNWEwNi01YzM0LTRmZjItYjZmMy1jOTExNTllNTY4MzYiLCJpZCI6MTAzNDI4LCJpYXQiOjE2NTk0OTU4OTN9.-GZMqtr9hUYcNVSPYgGwK5eFNhr4-QN6p7gWB5hAPpw';

const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.IonImageryProvider({assetId: 3845}),
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false,
  homeButton: false,
});
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 3e5;

const viewCity = citiesByName['Dallas'];
const viewAdjust = {lat: -8, long: 0, zoom: 15, offset: -10, pitch: -18};

const startingZoom = 8 + viewAdjust.zoom;
const offset = 15 + viewAdjust.offset;
const pitch = -60 + viewAdjust.pitch;
viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    viewCity.long + viewAdjust.long - startingZoom,
    viewCity.lat + viewAdjust.lat - startingZoom - offset,
    viewCity.long + viewAdjust.long + startingZoom,
    viewCity.lat + viewAdjust.lat + startingZoom - offset
  ),
  orientation: {
    heading: 0,
    pitch: Cesium.Math.toRadians(pitch),
    roll: 0.0, // default value
  },
});

const entitiesByCity = {} as Record<CityName, Cesium.Entity>;
const defaultLabelTranslucency = new Cesium.NearFarScalar(1.5e6, 1, 2.5e6, 0);
for (const city of cities) {
  entitiesByCity[city.name] = viewer.entities.add({
    name: city.name,
    position: Cesium.Cartesian3.fromDegrees(city.long, city.lat),
    point: {
      pixelSize: 8,
      color: Cesium.Color.RED.withAlpha(0.01),
      outlineColor: playersByCity[city.name]
        ? Cesium.Color.WHITE.withAlpha(0.8)
        : Cesium.Color.WHITE.withAlpha(0.6),
      outlineWidth: 2,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 3, 7e6, 0.5),
    },
    label: {
      text: upperCase(city.name),
      font: '20px Helvetica',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      translucencyByDistance: playersByCity[city.name]
        ? new Cesium.NearFarScalar(3.5e6, 1, 2.5e7, 0)
        : defaultLabelTranslucency,
      pixelOffset: playersByCity[city.name]
        ? new Cesium.Cartesian2(-6, -5)
        : new Cesium.Cartesian2(0, -25),
      horizontalOrigin: playersByCity[city.name]
        ? Cesium.HorizontalOrigin.RIGHT
        : Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
}

const pathsByPlayerEntity = new Map<Cesium.Entity, Cesium.Entity>();
const playersByEntity = new Map<Cesium.Entity, Player>();
for (const player of players) {
  const count = playersByCity[player.city.name!]?.length ?? 0;
  const r = player.progress || count === 1 ? 0 : Math.random() * (10 + count);
  const theta = Math.random() * 2 * Math.PI;
  const playerEntity = viewer.entities.add({
    name: player.name,
    position: player.location,
    billboard: {
      image: player.pin,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(
        r * Math.cos(theta),
        r * Math.sin(theta)
      ),
      // -50 Z positions labels above city circles
      eyeOffset: new Cesium.Cartesian3(0, 0, -50),
    },
  });
  playersByEntity.set(playerEntity, player);

  if (player.path.length > 1) {
    const positions = player.path.map(name => {
      const city = citiesByName[name];
      return Cesium.Cartesian3.fromDegrees(city.long, city.lat);
    });
    if (player.progress) {
      positions[positions.length - 1] = player.location;
    }

    const pathEntity = viewer.entities.add({
      name: `${player.name}'s path`,
      polyline: {
        positions,
        width: 6,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: player.color.withAlpha(0.5),
          outlineWidth: 3,
          outlineColor: player.color
            .brighten(0.7, new Cesium.Color())
            .withAlpha(0),
        }) as Cesium.MaterialProperty,
      },
    });
    pathsByPlayerEntity.set(playerEntity, pathEntity);
  }
}

function findHoveredCity(
  movement: Cesium.ScreenSpaceEventHandler.MotionEvent
): [City, Cesium.Entity] | [] {
  const pickedObject = viewer.scene.pick(movement.endPosition);
  if (!Cesium.defined(pickedObject)) return [];
  if (!(pickedObject.primitive instanceof Cesium.PointPrimitive)) return [];

  const entries = Object.entries(entitiesByCity) as [CityName, Entity][];
  for (const [cityName, entity] of entries) {
    if (pickedObject.id === entity) return [citiesByName[cityName], entity];
  }
  return [];
}

const hovered = new Set<Cesium.Entity>();
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(
  (movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
    const [city, entity] = findHoveredCity(movement);

    for (const prev of hovered) {
      if (prev === entity) continue;
      prev.point!.outlineColor!.setValue(Cesium.Color.WHITE.withAlpha(0.6));
      prev.label!.translucencyByDistance!.setValue(defaultLabelTranslucency);
    }

    if (city && entity) {
      if (playersByCity[city.name]) return;
      entity.point!.outlineColor!.setValue(Cesium.Color.WHITE);
      entity.label!.translucencyByDistance!.setValue(null);
      hovered.add(entity);
    }
  },
  Cesium.ScreenSpaceEventType.MOUSE_MOVE
);

let highlightedRemainder: Cesium.Entity | undefined;
viewer.selectedEntityChanged.addEventListener(entity => {
  // Remove city highlights added for a previous path
  for (const city of Object.values(entitiesByCity)) {
    city.point!.color!.setValue(Cesium.Color.RED.withAlpha(0.01));
    city.point!.pixelSize!.setValue(9);
    city.point!.outlineWidth!.setValue(2);
  }

  const highlightedPath = pathsByPlayerEntity.get(entity);
  if (highlightedPath) {
    // Hide all non-selected paths
    for (const path of pathsByPlayerEntity.values()) {
      if (path === highlightedPath) continue;
      const material = path.polyline!.material;
      material.color.setValue(material.color.getValue().withAlpha(0));
      material.outlineColor.setValue(
        material.outlineColor.getValue().withAlpha(0)
      );
    }
  } else {
    // Nothing is highlighted, so set every path to its default style
    for (const path of pathsByPlayerEntity.values()) {
      const material = path.polyline!.material;
      material.color.setValue(material.color.getValue().withAlpha(0.5));
      material.outlineColor.setValue(
        material.outlineColor.getValue().withAlpha(0)
      );
    }
  }

  if (highlightedRemainder) {
    viewer.entities.remove(highlightedRemainder);
    highlightedRemainder = undefined;
  }

  if (!highlightedPath) return;

  // Make the selected player's path more vivid
  const material = highlightedPath.polyline!.material;
  material.color.setValue(material.color.getValue().withAlpha(1));
  material.outlineColor.setValue(
    material.outlineColor.getValue().withAlpha(0.2)
  );

  // Highlight the remaining path for an in-progress player
  const player = playersByEntity.get(entity)!;
  highlightedRemainder = viewer.entities.add({
    polyline: {
      positions: [
        player.location,
        Cesium.Cartesian3.fromDegrees(player.city.long, player.city.lat),
      ],
      width: 6,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.WHITE.withAlpha(0.3),
        outlineWidth: 3,
        outlineColor: Cesium.Color.WHITE.withAlpha(0.15),
      }) as Cesium.MaterialProperty,
    },
  });

  // Highlight cities along the path
  let path = player.path;
  if (player.progress) {
    entitiesByCity[path[path.length - 1]].point!.color!.setValue(
      Cesium.Color.WHITE.withAlpha(0.6)
    );
    path = path.slice(0, path.length - 1);
  }
  for (const city of path) {
    const entity = entitiesByCity[city];
    entity.point!.color!.setValue(player.color);
    entity.point!.pixelSize!.setValue(10);
    entity.point!.outlineWidth!.setValue(1);
  }
});

const finished = players.filter(
  player =>
    player.path.length > 1 && player.path[player.path.length - 1] === 'London'
);

const countByCityF: Record<string, number> = {};
for (const player of finished) {
  for (const city of player.path) {
    countByCityF[city] ??= 0;
    countByCityF[city]++;
  }
}

console.log(
  [...cities]
    .sort((a, b) => (countByCityF[b.name] ?? 0) - (countByCityF[a.name] ?? 0))
    .slice(0, 20)
    .map(c => `${c.name}: ${countByCityF[c.name]}`)
);

const countByCityA: Record<string, number> = {};
for (const player of players) {
  for (const city of player.path) {
    countByCityA[city] ??= 0;
    countByCityA[city]++;
  }
}

for (const player of players) {
  for (const city of player.path) {
    if (countByCityA[city] === 1) {
      console.log(`${player.name} was the only player to visit ${city}`);
    }
  }
}

function diffDistance<T>(items1: T[], items2: T[]): number {
  return getPatch(items1, items2).reduce(
    (sum, patch) => sum + patch.items.length,
    0
  );
}

let mostDifferentRoute: [Player | null, Player | null, number] = [
  null,
  null,
  0,
];
let mostSimilarRoute: [Player | null, Player | null, number] = [
  null,
  null,
  Infinity,
];
for (const player1 of finished) {
  for (const player2 of finished) {
    if (player1 === player2) continue;
    const distance = diffDistance(player1.path, player2.path);
    if (distance < mostSimilarRoute[2]) {
      mostSimilarRoute = [player1, player2, distance];
    }
    if (distance > mostDifferentRoute[2]) {
      mostDifferentRoute = [player1, player2, distance];
    }
  }
}

console.log(
  `Most similar route: ${mostSimilarRoute[0]?.name} and ${mostSimilarRoute[1]?.name}`
);
console.log(
  `Most different route: ${mostDifferentRoute[0]?.name} and ${mostDifferentRoute[1]?.name}`
);

function maxBy<E>(array: E[], fn: (element: E) => number): E {
  let result = null;
  let metric = -Infinity;
  for (const element of array) {
    const newMetric = fn(element);
    if (newMetric > metric) {
      result = element;
      metric = newMetric;
    }
  }
  return result!;
}

function minBy<E>(array: E[], fn: (element: E) => number): E {
  return maxBy(array, e => -fn(e));
}

const poorest = minBy(finished, player => player.cash!);
const richest = maxBy(finished, player => player.cash!);
console.log(`Poorest player: ${poorest.name}`);
console.log(`Richest player: ${richest.name}`);

const mostTravelled = maxBy(finished, player => new Set(player.path).size);
const leastTravelled = minBy(finished, player => new Set(player.path).size);
console.log(
  `${mostTravelled.name} visited the most cities (${
    new Set(mostTravelled.path).size
  })`
);
console.log(
  `${leastTravelled.name} visited the fewest cities (${
    new Set(leastTravelled.path).size
  })`
);

function degToRad(value: number): number {
  return (value / 360) * Math.PI * 2;
}

function pointDistance(
  [lat1, long1]: [number, number],
  [lat2, long2]: [number, number]
): number {
  const earthRadius = 6371;
  lat1 = degToRad(lat1);
  lat2 = degToRad(lat2);
  return (
    earthRadius *
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.cos(Math.abs(degToRad(long1) - degToRad(long2)))
    )
  );
}

function cityDistance(city1: City, city2: City): number {
  return pointDistance([city1.lat, city1.long], [city2.lat, city2.long]);
}

interface Leg {
  start: City;
  end: City;
  distance: number;
  players: Set<Player>;
}

const legs = new Map<string, Map<string, Leg>>();
for (const player of players) {
  for (let i = 0; i < player.path.length - 1; i++) {
    if (i === player.path.length - 2 && player.progress) continue;
    const start = citiesByName[player.path[i]];
    const end = citiesByName[player.path[i + 1]];

    if (!legs.has(start.name)) legs.set(start.name, new Map());
    const mid = legs.get(start.name)!;

    let leg = mid.get(end.name);
    if (!leg) {
      const distance = cityDistance(start, end);
      leg = {start, end, distance, players: new Set()};
      mid.set(end.name, leg);
    }
    leg.players.add(player);
  }
}
const allLegs = [...legs.values()].flatMap(map => [...map.values()]);

const longest = maxBy(allLegs, leg => leg.distance);
const longestAlone = maxBy(
  [...allLegs.filter(leg => leg.players.size === 1)],
  leg => leg.distance
);
const shortest = minBy(allLegs, leg => leg.distance);

console.log(
  `Longest leg: ${longest.start.name} -> ${longest.end.name} by ${[
    ...longest.players,
  ]
    .map(p => p.name)
    .join(', ')} (${longest.distance}km)`
);

console.log(
  `Longest unique leg: ${longestAlone.start.name} -> ${
    longestAlone.end.name
  } by ${[...longestAlone.players].map(p => p.name).join(', ')} (${
    longestAlone.distance
  }km)`
);

console.log(
  `Shortest leg: ${shortest.start.name} -> ${shortest.end.name} by ${[
    ...shortest.players,
  ]
    .map(p => p.name)
    .join(', ')} (${shortest.distance}km)`
);

const totalDistances: Record<string, number> = {};
for (const player of players) {
  let totalDistance = 0;
  for (let i = 0; i < player.path.length - 1; i++) {
    totalDistance +=
      legs.get(player.path[i])?.get(player.path[i + 1])?.distance ?? 0;
  }
  totalDistances[player.name] = totalDistance;
}

const longestD = maxBy(finished, player => totalDistances[player.name]!);
const shortestD = minBy(finished, player => totalDistances[player.name]!);
console.log(
  `Longest distance: ${longestD.name} (${totalDistances[longestD.name]}km)`
);
console.log(
  `Shortest distance: ${shortestD.name} (${totalDistances[shortestD.name]}km)`
);

function cityDistanceWithinLats(
  city1: City,
  city2: City,
  min: number,
  max: number
): number {
  if (city1.lat > max && city2.lat > max) return 0;
  if (city1.lat < min && city2.lat < min) return 0;

  const slope = (city2.long - city1.long) / (city2.lat - city1.lat);
  const intercept = city1.long - slope * city1.lat;

  const lat1 = Math.max(city1.lat, min);
  const long1 = slope * lat1 + intercept;

  const lat2 = Math.min(city2.lat, max);
  const long2 = slope * lat2 + intercept;

  return pointDistance([lat1, long1], [lat2, long2]);
}

function cityDistanceWithinLongs(
  city1: City,
  city2: City,
  min: number,
  max: number
): number {
  if (city1.long > max && city2.long > max) return 0;
  if (city1.long < min && city2.long < min) return 0;

  const slope = (city2.lat - city1.lat) / (city2.long - city1.long);
  const intercept = city1.lat - slope * city1.long;

  const long1 = Math.max(city1.long, min);
  const lat1 = slope * long1 + intercept;

  const long2 = Math.min(city2.long, max);
  const lat2 = slope * long2 + intercept;

  return pointDistance([lat1, long1], [lat2, long2]);
}

const distanceSouth: Record<string, number> = {};
const distanceSubtrop: Record<string, number> = {};
const distanceTrop: Record<string, number> = {};
const distanceSupertrop: Record<string, number> = {};
const distanceWest: Record<string, number> = {};
for (const player of players) {
  let southernHemisphere = 0;
  let belowCapricorn = 0;
  let tropics = 0;
  let aboveCancer = 0;
  let westernHemisphere = 0;
  for (let i = 0; i < player.path.length - 1; i++) {
    const start = citiesByName[player.path[i]];
    const end = citiesByName[player.path[i + 1]];
    southernHemisphere += cityDistanceWithinLats(start, end, -90, 0);
    belowCapricorn += cityDistanceWithinLats(start, end, -90, -23.43632);
    tropics += cityDistanceWithinLats(start, end, -23.43632, 23.43632);
    aboveCancer += cityDistanceWithinLats(start, end, 23.43632, 90);
    westernHemisphere += cityDistanceWithinLongs(start, end, -90, 0);
  }
  distanceSouth[player.name] = southernHemisphere;
  distanceSubtrop[player.name] = belowCapricorn;
  distanceTrop[player.name] = tropics;
  distanceSupertrop[player.name] = aboveCancer;
  distanceWest[player.name] = westernHemisphere;
}

function printPercentiest(
  distances: Record<string, number>,
  name: string
): void {
  const mostest = maxBy(
    finished,
    player => distances[player.name]! / totalDistances[player.name]!
  );
  console.log(
    `${name} player: ${mostest.name} (${
      distances[mostest.name]! / totalDistances[mostest.name]!
    }%)`
  );
}

printPercentiest(distanceSouth, 'Southest');
printPercentiest(distanceSubtrop, 'Subtropical');
printPercentiest(distanceTrop, 'Tropical');
printPercentiest(distanceSupertrop, 'Supertropical');
printPercentiest(distanceWest, 'Westest');

const slowest = minBy(
  finished,
  player => totalDistances[player.name]! / player.day!
);
const fastest = maxBy(
  finished,
  player => totalDistances[player.name]! / player.day!
);
console.log(
  `Slowest player: ${slowest.name} (${
    totalDistances[slowest.name]! / slowest.day! / 24
  }kph)`
);
console.log(
  `Fastest player: ${fastest.name} (${
    totalDistances[fastest.name]! / fastest.day! / 24
  }kph)`
);
