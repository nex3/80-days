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
function emojiPin(emoji: string, color: Cesium.Color): HTMLCanvasElement {
  const canvas = pinBuilder.fromColor(color, 40);
  const context2d = canvas.getContext("2d")!;
  context2d.font = "16px sans-serif";
  context2d.fillText(emoji, 10, 18);
  return canvas;
}

async function imagePin(url: string, color: Cesium.Color): Promise<HTMLCanvasElement> {
  const size = 40;
  const canvas = pinBuilder.fromColor(color, size);
  const image = await Cesium.Resource.fetchImage({url}) as HTMLImageElement;
  const context2d = canvas.getContext("2d")!;

  const imageSize = size / 2.5;
  let sizeX = imageSize;
  let sizeY = imageSize;
  if (image.width > image.height) {
    sizeY = imageSize * (image.height / image.width);
  } else if (image.width < image.height) {
    sizeX = imageSize * (image.width / image.height);
  }

  //x and y are the center of the pin box
  const x = Math.round((size - sizeX) / 2);
  const y = Math.round((7 / 24) * size - sizeY / 2);

  context2d.drawImage(image, x, y, sizeX, sizeY);

  return canvas;
}

const players: Player[] = [
  {
    name: "Liz 🦭",
    city: citiesByName['London'],
    pin: await imagePin(
      '/images/openmoji/1F9AD.svg',
      Cesium.Color.fromBytes(0x00, 0x63, 0x7B, 0xFF),
    ),
  },
  {
    name: "Natalie 🌿",
    city: citiesByName['London'],
    pin: emojiPin('🌿', Cesium.Color.BLUE),
  },
  {
    name: "RAT 🐀",
    city: citiesByName['London'],
    pin: emojiPin('🐀', Cesium.Color.fromBytes(0x70, 0xFF, 0x61, 0xFF)),
  },
  {
    name: "wing 🥑",
    city: citiesByName['London'],
    pin: emojiPin('🥑', Cesium.Color.fromBytes(0x00, 0x80, 0x80, 0xFF)),
  },
  {
    name: "bcj 👻",
    city: citiesByName['London'],
    pin: emojiPin('👻', Cesium.Color.fromBytes(0x66, 0x00, 0xAA, 0xFF)),
  },
  {
    name: "Zandra 🐭",
    city: citiesByName['London'],
    pin: emojiPin('🐭', Cesium.Color.fromBytes(0x33, 0xCC, 0xFF, 0xFF)),
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
