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
  {name: "Auckland", lat: -36.8509, long: -174.7645},
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
  {name: "Bogota", lat: -4.7110, long: -74.0721},
  {name: "Bombay", lat: 19.0760, long: 72.8777},
  {name: "Brisbane", lat: -27.4705, long: 153.0260},
  {name: "Bucharest", lat: 44.4268, long: 26.1025},
  {name: "Budapest", lat: 47.4979, long: 19.0402},
  {name: "Buenos Aires", lat: -34.6037, long: -58.3816},
  {name: "Burlington", lat: 38.6270, long: -90.1994},
  {name: "Cairo", lat: 30.0444, long: 31.3257},
  {name: "Calcutta", lat: 22.5726, long: 88.3639},
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
  {name: "Karimskaya", lat: 51, long: 0}, // TODO: find me by process of elimination in https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2F80days%2Fimages%2F7%2F79%2FAlso_asia.jpg%2Frevision%2Flatest%3Fcb%3D20170303045745&imgrefurl=https%3A%2F%2F80days.fandom.com%2Fwiki%2FAsia&tbnid=S_DS4tf5aGongM&vet=12ahUKEwjVovyngaz5AhWzFTQIHZJOBCMQMygSegQIARBF..i&docid=RlAB4dfEJEK1NM&w=1080&h=1211&q=karimskaya%2080%20days&ved=2ahUKEwjVovyngaz5AhWzFTQIHZJOBCMQMygSegQIARBF
  {name: "Khartoum", lat: 15.5007, long: 32.5599},
  {name: "Krasnovodsk", lat: 40.0337, long: 52.9759},
  {name: "Kristiania", lat: 59.9139, long: 10.7522},
  {name: "Lahore", lat: 31.5204, long: 74.3587},
  {name: "Las Vegas", lat: 36.1716, long: -115.1391},
  {name: "Lima", lat: -12.0464, long: -77.0428},
  {name: "Lisbon", lat: 38.7223, long: -9.1393},
  {name: "London", lat: 51.5072, long: 0.1276},
  {name: "Lusaka", lat: -15.3875, long: 28.3228},
  {name: "Luxor", lat: 25.6872, long: 32.6396},
  {name: "Machu Picchu", lat: -13.1631, long: -72.5450},
  {name: "Madras", lat: 13.0827, long: 80.2707},
  {name: "Manama", lat: 26.2235, long: 50.5876},
  {name: "Manila", lat: 14.5995, long: 120.9842},
  {name: "Marrakesh", lat: 31.6295, long: -7.9811},
  {name: "Merv", lat: 37.6644, long: 62.1747},
  {name: "Meteora Valley", lat: 39.7141, long: 21.6311},
  {name: "Miami", lat: 25.7617, long: -80.1918},
  {name: "Minsk", lat: 53.9006, long: 27.5590},
  {name: "Moscow", lat: 55.7558, long: 37.6173},
  {name: "Munich", lat: 48.1351, long: 11.5820},
  {name: "Muscat", lat: 23.5880, long: 58.3829},
  {name: "New Orleans", lat: 29.9511, long: -90.0715},
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

const playersByCity: Record<string, Player[]> = {};
for (const player of players) {
  (playersByCity[player.city.name] ??= []).push(player);
}

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
  viewer.entities.add({
    name: city.name,
    position: Cesium.Cartesian3.fromDegrees(city.long, city.lat),
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
      scaleByDistance: new Cesium.NearFarScalar(
        1.5e2,
        playersByCity[city.name] ? 2 : 1.5,
        playersByCity[city.name] ? 7e6 : 6e6,
        0.2),
      pixelOffset: new Cesium.Cartesian2(-6, -5),
      horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
}

for (const player of players) {
  const count = playersByCity[player.city.name]!.length;
  const r = count === 0 ? 0 : Math.random() * (6 + count);
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
        -50 // -50 Z positions labels above city circles
      ),
    },
  });
}
