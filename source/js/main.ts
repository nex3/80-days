(window as any).CESIUM_BASE_URL = '/Cesium'; 

import * as Cesium from 'cesium';
import PlaneGeometry from 'cesium/Source/Core/PlaneGeometry';
import Entity from 'cesium/Source/DataSources/Entity';
import {upperCase} from 'upper-case';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTQzNWEwNi01YzM0LTRmZjItYjZmMy1jOTExNTllNTY4MzYiLCJpZCI6MTAzNDI4LCJpYXQiOjE2NTk0OTU4OTN9.-GZMqtr9hUYcNVSPYgGwK5eFNhr4-QN6p7gWB5hAPpw';

interface City {
  name: string;
  lat: number;
  long: number;
}

const cities: City[] = [
  {name: "Acapulco", lat: 16.8531, long: -99.8237},
  {name: "Aden", lat: 12.7855, long: 45.0187},
  {name: "Agra", lat: 27.1767, long: 78.0081},
  {name: "Albuquerque", lat: 35.0844, long: -106.6504},
  {name: "Alexandria", lat: 31.2001, long: 29.9187},
  {name: "Allahabad", lat: 25.4358, long: 81.8463},
  {name: "Amsterdam", lat: 52.3676, long: 4.9041},
  {name: "Antalya", lat: 36.8969, long: 30.7133},
  {name: "Antananarivo", lat: -18.8792, long: 47.5079},
  {name: "Astrakhan", lat: 46.3586, long: 48.0569},
  {name: "Asunción", lat: -25.2637, long: -57.5759},
  {name: "Aswan", lat: 24.0889, long: 32.8998},
  {name: "Athens", lat: 37.9838, long: 23.7275},
  {name: "Atlanta", lat: 33.7490, long: -84.3880},
  {name: "Auckland", lat: -36.8509, long: 174.7645},
  {name: "Baghdad", lat: 33.3152, long: 44.3661},
  {name: "Baku", lat: 40.4093, long: 49.8671},
  {name: "Bandar Abbas", lat: 27.1963, long: 56.2884},
  {name: "Bangalore", lat: 12.9716, long: 77.5946},
  {name: "Batavia", lat: -6.2088, long: 106.8456},
  {name: "Beijing", lat: 39.9042, long: 116.4074},
  {name: "Beirut", lat: 33.8938, long: 35.5018},
  {name: "Belgrade", lat: 44.8125, long: 20.4612},
  {name: "Belém", lat: -1.4563, long: -48.5013},
  {name: "Benares", lat: 25.3176, long: 82.9739},
  {name: "Berlin", lat: 52.5200, long: 13.4050},
  {name: "Bhayi", lat: -33.9608, long: 25.6022},
  {name: "Bloemfontein", lat: -29.0852, long: 26.1596},
  {name: "Bogota", lat: 4.7110, long: -74.0721},
  {name: "Bombay", lat: 19.0760, long: 72.8777},
  {name: "Brisbane", lat: -27.4705, long: 153.0260},
  {name: "Bucharest", lat: 44.4268, long: 26.1025},
  {name: "Budapest", lat: 47.4979, long: 19.0402},
  {name: "Buenos Aires", lat: -34.6037, long: -58.3816},
  {name: "Burlington", lat: 38.6270, long: -90.1994},
  {name: "Cairo", lat: 30.0444, long: 31.3257},
  {name: "Calcutta", lat: 22.5726, long: 88.3639},
  {name: "Calgary", lat: 51.0447, long: -114.0719},
  {name: "Cambridge", lat: 52.1951, long: 0.1313},
  {name: "Canton", lat: 23.1291, long: 113.2644},
  {name: "Caracas", lat: 10.4806, long: -66.9036},
  {name: "Cheyenne", lat: 41.1400, long: -104.8202},
  {name: "Chicago", lat: 41.8781, long: -87.6298},
  {name: "Chittagong", lat: 22.3569, long: 91.7832},
  {name: "Colombo", lat: 6.9271, long: 79.8612},
  {name: "Copenhagen", lat: 55.6761, long: 12.5683},
  {name: "Dakar", lat: 14.7167, long: -17.4677},
  {name: "Dallas", lat: 32.7767, long: -96.7970},
  {name: "Delhi", lat: 28.7041, long: 77.1025},
  {name: "Dubai", lat: 25.2048, long: 55.2708},
  {name: "Dubrovnik", lat: 42.6507, long: 18.0944},
  {name: "Duluth", lat: 46.7867, long: -92.1005},
  {name: "Dvarka", lat: 22.2442, long: 68.9685},
  {name: "Ekaterinburg", lat: 56.8431, long: 60.6454},
  {name: "Freetown", lat: 8.4657, long: -13.2317},
  {name: "Gastown", lat: 49.2827, long: -123.1207},
  {name: "Guwahati", lat: 26.1158, long: 91.7086},
  {name: "Ha'il", lat: 27.5114, long: 41.7208},
  {name: "Havana", lat: 23.1136, long: -82.3666},
  {name: "Helsinki", lat: 60.1699, long: 24.9384},
  {name: "Herat", lat: 34.3529, long: 62.2040},
  {name: "Hong Kong", lat: 22.3193, long: 114.1694},
  {name: "Honolulu", lat: 21.3099, long: -157.8581},
  {name: "Houston", lat: 29.7604, long: -95.3698},
  {name: "Imphal", lat: 24.8170, long: 93.9368},
  {name: "Irkutsk", lat: 52.2855, long: 104.2890},
  {name: "Istanbul", lat: 41.0082, long: 28.9784},
  {name: "Ivujivik", lat: 62.4167, long: -77.9167},
  {name: "Izmir", lat: 38.4237, long: 27.1428},
  {name: "Jeddah", lat: 21.4858, long: 39.1925},
  {name: "Kabul", lat: 34.5553, long: 69.2075},
  {name: "Karachi", lat: 24.8607, long: 67.0011},
  {name: "Karimskaya", lat: 56.6575, long: 124.7110},
  {name: "Khartoum", lat: 15.5007, long: 32.5599},
  {name: "Krasnovodsk", lat: 40.0337, long: 52.9759},
  {name: "Kristiania", lat: 59.9139, long: 10.7522},
  {name: "Lahore", lat: 31.5204, long: 74.3587},
  {name: "Las Vegas", lat: 36.1716, long: -115.1391},
  {name: "Lima", lat: -14.1910, long: -75.6980},
  {name: "Lisbon", lat: 38.7223, long: -9.1393},
  {name: "London", lat: 51.5072, long: 0.1276},
  {name: "Lusaka", lat: -15.3875, long: 28.3228},
  {name: "Luxor", lat: 25.6872, long: 32.6396},
  {name: "Machu Picchu", lat: -11.8915, long: -74.8702},
  {name: "Madras", lat: 13.0827, long: 80.2707},
  {name: "Manama", lat: 26.2235, long: 50.5876},
  {name: "Manila", lat: 14.5995, long: 120.9842},
  {name: "Marrakesh", lat: 31.6295, long: -7.9811},
  {name: "Merv", lat: 37.6644, long: 62.1747},
  {name: "Meteora Valley", lat: 39.7141, long: 21.6311},
  {name: "Miami", lat: 25.7617, long: -80.1918},
  {name: "Minsk", lat: 53.9006, long: 27.5590},
  {name: "Mount Elbrus", lat: 40, long: 45.3661},
  {name: "Moscow", lat: 55.7558, long: 37.6173},
  {name: "Munich", lat: 48.1351, long: 11.5820},
  {name: "Muscat", lat: 23.5880, long: 58.3829},
  {name: "Nassau", lat: 25.0443, long: -77.3504},
  {name: "New Orleans", lat: 29.9511, long: -90.0715},
  {name: "New York", lat: 40.7128, long: -74.0060},
  {name: "Nice", lat: 43.7102, long: 7.2620},
  {name: "Nova Goa", lat: 15.4909, long: 73.8278},
  {name: "Novorossiysk", lat: 44.7180, long: 37.7770},
  {name: "Nsenga", lat: -9.6333, long: 29.7000},
  {name: "Odessa", lat: 46.4825, long: 30.7233},
  {name: "Omaha", lat: 41.2565, long: -95.9345},
  {name: "Omsk", lat: 54.9914, long: 73.3645},
  {name: "Ottawa", lat: 45.4215, long: -75.6972},
  {name: "Panama City", lat: 8.9824, long: -79.5199},
  {name: "Pangsau Pass", lat: 27.2476, long: 96.1560},
  {name: "Paris", lat: 48.8566, long: 2.3522},
  {name: "Pitcairn Island", lat: -24.3768, long: -128.3242},
  {name: "Ponta Delgada", lat: 37.7394, long: -25.6687},
  {name: "Port Royal", lat: 17.9368, long: -76.8411},
  {name: "Port Moresby", lat: -9.4438, long: 147.1803},
  {name: "Port-au-Prince", lat: 18.5944, long: -72.3074},
  {name: "Porto-Novo", lat: 6.4969, long: 2.6289},
  {name: "Prague", lat: 50.0755, long: 14.4378},
  {name: "Pyongyang", lat: 39.0738, long: 125.8198},
  {name: "Quebec City", lat: 46.8131, long: -71.2075},
  {name: "Quelimane", lat: -17.8503, long: 36.9219},
  {name: "Quetta", lat: 30.1798, long: 66.9750},
  {name: "Rangoon", lat: 16.8409, long: 96.1735},
  {name: "Regina", lat: 50.4452, long: -104.6189},
  {name: "Reykjavik", lat: 64.1466, long: -21.9426},
  {name: "Rio de Janeiro", lat: -22.9068, long: -43.1729},
  {name: "Riyadh", lat: 24.7136, long: 46.6753},
  {name: "Rome", lat: 41.9028, long: 12.4964},
  {name: "Rub' al Khali", lat: 20.0953, long: 52.7190},
  {name: "Saint-Denis", lat: -20.8907, long: 55.4551},
  {name: "Salt Lake City", lat: 40.7608, long: -111.8910},
  {name: "Salvador", lat: -12.9777, long: -42.5016},
  {name: "San Francisco", lat: 37.7749, long: -122.4194},
  {name: "San Pedro", lat: 33.7361, long: -118.2922},
  {name: "Santiago", lat: -33.4489, long: -70.6693},
  {name: "Singapore", lat: 1.3521, long: 103.8198},
  {name: "Smeerenburg", lat: 79.7256, long: 10.9903},
  {name: "Snowdon", lat: 53.0685, long: -4.0763},
  {name: "Sofia", lat: 42.6977, long: 23.3219},
  {name: "St Petersburg", lat: 59.9311, long: 30.3609},
  {name: "Stockholm", lat: 59.3293, long: 18.0686},
  {name: "Stone Town", lat: -6.1622, long: 39.1921},
  {name: "Suez", lat: 29.9668, long: 32.5498},
  {name: "Tabatinga", lat: -4.2315, long: -69.9369},
  {name: "Tangier", lat: 35.7595, long: 5.8340},
  {name: "Tehran", lat: 35.7219, long: 51.3347},
  {name: "The North Pole", lat: 90, long: 135},
  {name: "Thessaloniki", lat: 40.6401, long: 22.9444},
  {name: "Timbuktu", lat: 16.7666, long: -3.0026},
  {name: "Toronto", lat: 43.6532, long: -79.3832},
  {name: "Tromsø", lat: 69.6492, long: 18.9553},
  {name: "Tsaritsyn", lat: 48.7080, long: 44.5133},
  {name: "Tunis", lat: 36.8065, long: 10.1815},
  {name: "Ujiji", lat: -4.9115, long: 29.6746},
  {name: "Ulundi", lat: -28.2997, long: 31.4342},
  {name: "Urga", lat: 47.8864, long: 106.9057},
  {name: "Ussuriysk", lat: 44.8015, long: 131.4405},
  {name: "Venice", lat: 45.4408, long: 12.3155},
  {name: "Vienna", lat: 48.2082, long: 16.3738},
  {name: "Vladivostok", lat: 43.1332, long: 131.9113},
  {name: "Wadi Halfa", lat: 21.7991, long: 31.3713},
  {name: "Waltair", lat: 17.6868, long: 83.2185},
  {name: "Warsaw", lat: 52.2297, long: 21.0122},
  {name: "Washington", lat: 38.9072, long: -77.0369},
  {name: "Winisk", lat: 55.2667, long: -85.2000},
  {name: "Winnipeg", lat: 49.8954, long: -97.1385},
  {name: "Yadanabon", lat: 21.9588, long: 96.0891},
  {name: "Yokohama", lat: 35.4437, long: 139.6380},
  {name: "Zurich", lat: 47.3769, long: 8.5417},
];

const citiesByName: Record<string, City> = {};
for (const city of cities) {
  citiesByName[city.name] = city;
}

interface Player {
  name: string;
  pin: HTMLCanvasElement;
  color: Cesium.Color;
  path: string[];
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
    name: "jebwrench 🐧",
    path: ['London'],
    color: Cesium.Color.fromBytes(0xFF, 0x5C, 0xD6, 0xFF),
    pin: emojiPin('🐧', Cesium.Color.fromBytes(0xFF, 0x5C, 0xD6, 0xFF)),
  },
  {
    name: "WulfOrc 🦀",
    path: ['London'],
    color: Cesium.Color.fromBytes(0xE2, 0x3B, 0x59, 0xFF),
    pin: emojiPin('🦀', Cesium.Color.fromBytes(0xE2, 0x3B, 0x59, 0xFF)),
  },
  {
    name: "Athene 😼",
    path: ['London'],
    color: Cesium.Color.fromBytes(0xFA, 0x46, 0xF4, 0xFF),
    pin: emojiPin('😼', Cesium.Color.fromBytes(0xFA, 0x46, 0xF4, 0xFF)),
  },
  {
    name: "Ronja 🐢",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x00, 0x9D, 0x9D, 0xFF),
    pin: emojiPin('🐢', Cesium.Color.fromBytes(0x00, 0x9D, 0x9D, 0xFF)),
  },
  {
    name: "wayward 🎻",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x9A, 0x86, 0xA3, 0xFF),
    pin: emojiPin('🎻', Cesium.Color.fromBytes(0x9A, 0x86, 0xA3, 0xFF)),
  },
  {
    name: "jae",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x48, 0xD1, 0xCC, 0xFF),
    pin: await imagePin(
      '/images/eggbug.png',
      Cesium.Color.fromBytes(0x48, 0xD1, 0xCC, 0xFF),
    ),
  },
  {
    name: "@garak ꙮ",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x6B, 0xEC, 0x58, 0xFF),
    pin: emojiPin('ꙮ', Cesium.Color.fromBytes(0x6B, 0xEC, 0x58, 0xFF)),
  },
  {
    name: "Liz 🦭",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x00, 0x63, 0x7B, 0xFF),
    pin: await imagePin(
      '/images/liz.webp',
      Cesium.Color.fromBytes(0x00, 0x63, 0x7B, 0xFF),
    ),
  },
  {
    name: "Natalie 🌿",
    path: ['London'],
    color: Cesium.Color.BLUE,
    pin: emojiPin('🌿', Cesium.Color.BLUE),
  },
  {
    name: "RAT 🐀",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x70, 0xFF, 0x61, 0xFF),
    pin: emojiPin('🐀', Cesium.Color.fromBytes(0x70, 0xFF, 0x61, 0xFF)),
  },
  {
    name: "wing 🥑",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x00, 0x80, 0x80, 0xFF),
    pin: emojiPin('🥑', Cesium.Color.fromBytes(0x00, 0x80, 0x80, 0xFF)),
  },
  {
    name: "bcj 👻",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x66, 0x00, 0xAA, 0xFF),
    pin: emojiPin('👻', Cesium.Color.fromBytes(0x66, 0x00, 0xAA, 0xFF)),
  },
  {
    name: "Zandra 🐭",
    path: ['London'],
    color: Cesium.Color.fromBytes(0x33, 0xCC, 0xFF, 0xFF),
    pin: emojiPin('🐭', Cesium.Color.fromBytes(0x33, 0xCC, 0xFF, 0xFF)),
  },
];

function cityForPlayer(player: Player): City {
  const path = player.path;
  return citiesByName[path[path.length - 1]]!;
}

const playersByCity: Record<string, Player[]> = {};
for (const player of players) {
  (playersByCity[cityForPlayer(player).name] ??= []).push(player);
}

const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false,
  homeButton: false,
});
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 3e5;

const startingZoom = 8;
const offset = 15;
viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    citiesByName['London'].long - startingZoom,
    citiesByName['London'].lat - startingZoom - offset,
    citiesByName['London'].long + startingZoom,
    citiesByName['London'].lat + startingZoom - offset,
  ),
  orientation: {
      heading : 0,
      pitch : Cesium.Math.toRadians(-60),    // default value (looking down)
      roll : 0.0                             // default value
  }
});

const entitiesByCity: Record<string, Cesium.Entity> = {};
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
      font: "20px Helvetica",
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
for (const player of players) {
  const city = cityForPlayer(player);
  const count = playersByCity[city.name]!.length;
  const r = count === 1 ? 0 : Math.random() * (6 + count);
  const theta = Math.random() * 2 * Math.PI;
  const playerEntity = viewer.entities.add({
    name: player.name,
    position: Cesium.Cartesian3.fromDegrees(city.long, city.lat),
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
        -50 // -50 Z positions labels above city circles
      ),
    },
  });

  if (player.path.length > 1) {
    const pathEntity = viewer.entities.add({
      name: `${player.name}'s path`,
      polyline: {
        positions: player.path.map(name => {
          const city = citiesByName[name];
          return Cesium.Cartesian3.fromDegrees(city.long, city.lat);
        }),
        width: 4,
        material: player.color.withAlpha(0.5),
      }
    });
    pathsByPlayerEntity.set(playerEntity, pathEntity);
  }
}

function findHoveredCity(movement: Cesium.ScreenSpaceEventHandler.MotionEvent): [City, Cesium.Entity]|[] {
  const pickedObject = viewer.scene.pick(movement.endPosition);
  if (!Cesium.defined(pickedObject)) return [];
  if (!(pickedObject.primitive instanceof Cesium.PointPrimitive)) return [];

  console.log(pickedObject);
  for (const [cityName, entity] of Object.entries(entitiesByCity)) {
    if (pickedObject.id === entity) return [citiesByName[cityName], entity];
  }
  return [];
}

const hovered = new Set<Cesium.Entity>();
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
  const [city, entity] = findHoveredCity(movement);
  
  for (const prev of hovered) {
    if (prev === entity) continue;
    (prev as any).point.outlineColor = Cesium.Color.WHITE.withAlpha(0.6);
    (prev as any).label.translucencyByDistance = defaultLabelTranslucency;
  }

  if (city && entity) {
    if (playersByCity[city.name]) return;
    (entity as any).point.outlineColor = Cesium.Color.WHITE;
    (entity as any).label.translucencyByDistance = null;
    hovered.add(entity);
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

let highlightedPath: Cesium.Entity|undefined;
viewer.selectedEntityChanged.addEventListener(entity => {
  if (highlightedPath) {
    const color = (highlightedPath as any).polyline.material.color;
    color.setValue(color.getValue().withAlpha(0.5));
  }

  highlightedPath = pathsByPlayerEntity.get(entity);
  if (!highlightedPath) return;

  const color = (highlightedPath as any).polyline.material.color;
  color.setValue(color.getValue().withAlpha(1));
});
