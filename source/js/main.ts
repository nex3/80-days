(window as any).CESIUM_BASE_URL = '/Cesium'; 

import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTQzNWEwNi01YzM0LTRmZjItYjZmMy1jOTExNTllNTY4MzYiLCJpZCI6MTAzNDI4LCJpYXQiOjE2NTk0OTU4OTN9.-GZMqtr9hUYcNVSPYgGwK5eFNhr4-QN6p7gWB5hAPpw';

function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

interface City {
  name: string;
  lat: number;
  long: number;
}

const cities: City[] = [
  {name: "London", lat: 51.5072, long: 0.1276}
];

const citiesByName: Record<string, City> = {};
for (const city of cities) {
  citiesByName[city.name] = city;
}

interface Player {
  name: string;
  city: City;
  pin: HTMLCanvasElement
}

const pinBuilder = new Cesium.PinBuilder();
const players: Player[] = [
  {
    name: "Liz",
    city: citiesByName['London'],
    pin: pinBuilder.fromText('🦭', Cesium.Color.fromBytes(0x00, 0x63, 0x7B, 0xFF), 40),
  },
  {
    name: "Natalie",
    city: citiesByName['London'],
    pin: pinBuilder.fromText('🌿', Cesium.Color.BLUE, 40),
  },
  {
    name: "RAT",
    city: citiesByName['London'],
    pin: pinBuilder.fromText('🐀', Cesium.Color.fromBytes(0x70, 0xFF, 0x61, 0xFF), 40),
  },
  {
    name: "bcj",
    city: citiesByName['London'],
    pin: pinBuilder.fromText('👻', Cesium.Color.fromBytes(0x66, 0x00, 0xAA, 0xFF), 40),
  },
  {
    name: "Zandra",
    city: citiesByName['London'],
    pin: pinBuilder.fromText('🐭', Cesium.Color.fromBytes(0x33, 0xCC, 0xFF, 0xFF), 40),
  },
];

// Start focused on London
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle(
  degToRad(0.1276),
  degToRad(51.5072),
  degToRad(0.1276),
  degToRad(51.5072)
);

const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false,
});

for (const city of cities) {
  const position = Cesium.Cartesian3.fromDegrees(city.long, city.lat);
  viewer.entities.add({
    name: city.name,
    position,
    point: {
      pixelSize: 8,
      color: Cesium.Color.RED.withAlpha(0),
      outlineColor: Cesium.Color.WHITE.withAlpha(0.8),
      outlineWidth: 2,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 3, 7e6, 0.5),
    },
    label: {
      text: city.name,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2, 7e6, 0.2),
      pixelOffset: new Cesium.Cartesian2(-6, -5),
      horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
}

const playersPerCity: Record<string, number> = {};
for (const player of players) {
  playersPerCity[player.city.name] ??= 0;
  const count = playersPerCity[player.city.name]++;

  const r = count == 0 ? 0 : 4 + count;
  const theta = Math.random() * 2 * Math.PI;
  viewer.entities.add({
    name: player.name,
    position: Cesium.Cartesian3.fromDegrees(player.city.long, player.city.lat),
    billboard: {
      image: player.pin,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(
        r * Math.cos(theta),
        r * Math.sin(theta),
      ),
      eyeOffset: new Cesium.Cartesian3(
        0,
        0,
        -50 - count // -50 Z positions labels above city circles
      ),
    },
  });
}
