import * as Cesium from 'cesium';

import {City, CityName, citiesByName} from './cities';

const pinBuilder = new Cesium.PinBuilder();

interface PlayerOptions {
  color: Cesium.Color;
  path: CityName[];
  emoji?: string;
  progress?: number;
}

export class Player {
  readonly name: string;
  readonly pin: HTMLCanvasElement;
  readonly color: Cesium.Color;
  readonly path: CityName[];
  readonly progress?: number;

  private constructor(
    name: string,
    options: PlayerOptions & {pin: HTMLCanvasElement}
  ) {
    this.name = options.emoji ? `${name} ${options.emoji}` : name;

    this.color = options.color;
    this.path = options.path;
    this.pin = options.pin;
    this.progress = options.progress;
  }

  static emoji(name: string, options: PlayerOptions & {emoji: string}): Player {
    const pin = pinBuilder.fromColor(options.color, 40);
    const context2d = pin.getContext('2d')!;
    context2d.font = '16px sans-serif';
    context2d.fillText(options.emoji, 10, 18);
    return new Player(name, {...options, pin});
  }

  static async image(
    name: string,
    options: PlayerOptions & {image: string}
  ): Promise<Player> {
    const size = 40;
    const pin = pinBuilder.fromColor(options.color, size);
    const image = (await Cesium.Resource.fetchImage({
      url: options.image,
    })) as HTMLImageElement;
    const context2d = pin.getContext('2d')!;

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

    return new Player(name, {...options, pin});
  }

  get location(): Cesium.Cartesian3 {
    const next = Cesium.Cartesian3.fromDegrees(this.city.long, this.city.lat);
    if (!this.progress) return next;

    const prev = Cesium.Cartesian3.fromDegrees(
      this.prevCity.long,
      this.prevCity.lat
    );
    const cartesianMidpoint = new Cesium.Cartesian3();
    Cesium.Cartesian3.lerp(prev, next, this.progress, cartesianMidpoint);
    const cartographicMidpoint =
      Cesium.Cartographic.fromCartesian(cartesianMidpoint);
    return Cesium.Cartesian3.fromRadians(
      cartographicMidpoint.longitude,
      cartographicMidpoint.latitude,
      0.0
    );
  }

  get city(): City {
    const path = this.path;
    return citiesByName[path[path.length - 1]]!;
  }

  get prevCity(): City {
    const path = this.path;
    return citiesByName[path[path.length - 2]]!;
  }
}

function rgb(hex: string): Cesium.Color {
  return Cesium.Color.fromBytes(
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
    0xff
  );
}

export const players: Player[] = [
  Player.emoji('Lade Ada Locke & Jeanne Watson', {
    // kouhai, UTC-7, Day 12, used 3 grace and down 1 day
    emoji: '✨',
    color: rgb('00002e'),
    progress: 0.15,
    path: [
      'London',
      'Paris',
      'Nice',
      'Venice',
      'Rome',
      'Athens',
      'Izmir',
      'Istanbul',
      'Beirut',
    ],
  }),
  Player.emoji('swiftie', {
    // not telling, UTC-7, used 1 grace, day l9
    emoji: '🧣️',
    color: rgb('9300FF'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Berlin',
      'Prague',
      'Vienna',
      'Budapest',
      'Bucharest',
      'Minsk',
    ],
  }),
  Player.emoji('Coraphii', {
    // UTC-5, Day 14, used 2 graces
    emoji: '🐻‍❄️',
    color: rgb('00dda4'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Copenhagen',
      'Helsinki',
      'Minsk',
      'Moscow', 'Tsaritsyn'
    ],
  }),
  Player.emoji('HeartbreakDaisy', {
    // K V, UTC-7, Day 14
    emoji: '🌼',
    color: rgb('FFD139'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Stockholm',
      'Helsinki',
      'St Petersburg',
      'Moscow',
      'Tsaritsyn',
    ],
  }),
  Player.emoji('@topghost', {
    // Casey, UTC-7, Day 13, down one grace
    emoji: '🙈',
    color: rgb('966bb6'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Munich',
      'Berlin',
      'Warsaw',
      'Stockholm',
      'Helsinki',
      'St Petersburg',
    ],
  }),
  Player.emoji('Dana Callista Lexa', {
    // UTC-5, Day 14
    emoji: '☕',
    color: rgb('8E562E'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Munich',
      'Vienna',
      'Budapest',
      'Belgrade',
      'Thessaloniki',
      'Istanbul',
      'Antalya',
    ],
  }),
  Player.emoji('Rushfoil', {
    // UTC+1, Day 15
    emoji: '🐇',
    color: rgb('7e8c8f'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Munich',
      'Vienna',
      'Budapest',
      'Belgrade',
      'Thessaloniki',
      'Athens',
      'Izmir',
      'Antalya',
      'Beirut',
      'Alexandria',
      'Cairo',
      'Suez',
    ],
  }),
  Player.emoji('Ari-topper', {
    // Delphine, UTC+2, Day 13
    emoji: '🌻',
    color: rgb('8773d3'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Budapest',
      'Belgrade',
      'Thessaloniki',
      'Athens',
      'Izmir',
      'Antalya',
      'Beirut',
      "Ha'il",
    ],
  }),
  Player.emoji('Modulusshift', {
    // Eli UTC-6, Day 13, used 1 grace
    emoji: '~',
    color: rgb('96f9f9'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Belgrade',
      'Istanbul',
      'Izmir',
      'Antalya',
    ],
  }),
  Player.emoji('Michelle S', {
    // UTC-7, Day 13
    emoji: '🍩️',
    color: rgb('A51DE5'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Berlin',
      'Prague',
      'Cairo',
      'Luxor',
      'Aswan',
      'Wadi Halfa',
    ],
  }),
  Player.emoji('ferns', {
    // UTC-7, Day 8
    emoji: '🦊️',
    color: rgb('2C9510'),
    path: ['London', 'Paris', 'Amsterdam', 'Munich'],
  }),
  Player.emoji('two', {
    // UTC+10, Day 14
    emoji: '2️⃣',
    color: rgb('139DFE'),
    progress: 0.05,
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Munich',
      'Vienna',
      'Budapest',
      'Thessaloniki',
      'Istanbul',
      'Tehran',
    ],
  }),
  Player.emoji('Brian P', {
    // UTC-4, Day 13
    emoji: ':/',
    color: rgb('7C8383'),
    progress: 0.2,
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Munich',
      'Berlin',
      'Prague',
      'Odessa',
      'Moscow',
      'Ekaterinburg',
    ],
  }),
  Player.emoji('BibliovoreOrc', {
    // Rob, UTC-5, Day 13
    emoji: '📚',
    color: rgb('33FF33'),
    path: [
      'London',
      'Paris',
      'Nice',
      'Rome',
      'Athens',
      'Antalya',
      'Beirut',
      'Alexandria',
      'Cairo',
      'Luxor',
    ],
  }),
  Player.emoji('Tomato', {emoji: '🍅', color: rgb('f1948a'), path: ['London']}),
  Player.emoji('Gwentacles', {
    // UTC-7, Day 6, used 2 graces
    emoji: '🐙️',
    color: rgb('32fff4'),
    path: ['London', 'Paris', 'Amsterdam', 'Berlin'],
  }),
  Player.emoji('Les', {
    // daanniii, UTC+0, Day 9
    emoji: '🐸️',
    color: rgb('b00b69'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Stockholm',
      'Helsinki',
      'St Petersburg',
    ],
  }),
  Player.emoji('Rain Doggerel', {
    // UTC-7, Day 14, used 2 grace (fast forward to Day 16)
    emoji: '☣️',
    color: rgb('14bccc'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Prague',
      'Budapest',
      'Bucharest',
      'Thessaloniki',
      'Izmir',
    ],
  }),
  Player.emoji('Mallumet', {
    // UTC-5, Day 14
    emoji: '🤖',
    color: rgb('44ad9c'),
    progress: 0.8,
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Warsaw',
      'Minsk',
      'Moscow',
      'Ekaterinburg',
      'Omsk',
      'Irkutsk',
    ],
  }),
  Player.emoji('Tekgo', {
    // UTC-7, Day 13
    emoji: '💖',
    color: rgb('e60283'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Kristiania',
      'Stockholm',
      'St Petersburg',
      'Moscow',
      'Ekaterinburg',
    ],
  }),
  Player.emoji('fellatiomatic', {
    // toadman
    emoji: '🤠',
    color: rgb('e8b4ff'),
    progress: 0.4,
    path: ['London', 'Paris'],
  }),
  Player.emoji('jebwrench', {
    // UTC-4, Day 15
    emoji: '🐧',
    color: rgb('ff5cd6'),
    progress: 0.5,
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Budapest',
      'Thessaloniki',
      'Izmir',
      'Antalya',
      'Beirut',
      'Alexandria',
      'Cairo',
      "Ha'il",
      'Riyadh',
    ],
  }),
  Player.emoji('WulfOrc', {
    // Cliff, UTC-7, Day 14, one grace used
    emoji: '🦀',
    color: rgb('e23b59'),
    progress: 0.6,
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Copenhagen',
      'Stockholm',
      'Warsaw',
      'Minsk',
      'Odessa',
      'Moscow',
    ],
  }),
  Player.emoji('Athene', {
    // UTC+1, Day 15
    emoji: '😼',
    color: rgb('fa46f4'),
    progress: 0.45,
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Venice',
      'Rome',
      'Athens',
      'Alexandria',
      'Cairo',
      "Ha'il",
      'Riyadh',
    ],
  }),
  Player.emoji('Ronja', {
    // UTC-4, Day 2
    emoji: '🐢',
    color: rgb('009d9d'),
    path: ['London', 'Paris'],
  }),
  Player.emoji('wayward', {
    // UTC-7, Day 13, 1 grace used
    emoji: '🎻',
    color: rgb('9a86a3'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Venice',
      'Athens',
      'Izmir',
      'Antalya',
      'Beirut',
      "Ha'il",
    ],
  }),
  await Player.image('jae', {
    // UTC-5, Day 3
    image: '/images/eggbug.svg',
    color: rgb('48d1cc'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('@garak', {
    // UTC-5, Day 13
    emoji: 'ꙮ',
    color: rgb('6bec58'),
    progress: 0.8,
    path: [
      'London',
      'Paris',
      'Munich',
      'Berlin',
      'Warsaw',
      'Minsk',
      'Odessa',
      'Istanbul',
      'Tehran',
    ],
  }),
  await Player.image('Liz', {
    // UTC-7, Day 13
    emoji: '🦭',
    image: '/images/liz.webp',
    color: rgb('00637b'),
    path: [
      'London',
      'Paris',
      'Nice',
      'Venice',
      'Dubrovnik',
      'Meteora Valley',
      'Thessaloniki',
      'Athens',
      'Izmir',
      'Istanbul',
    ],
  }),
  Player.emoji('Natalie', {
    // UTC-7, Day 15
    emoji: '🌿',
    color: Cesium.Color.BLUE,
    path: [
      'London',
      'Paris',
      'Nice',
      'Rome',
      'Athens',
      'Alexandria',
      'Cairo',
      'Luxor',
      'Aswan',
      'Wadi Halfa',
      'Khartoum',
      'Stone Town',
      'Quelimane',
    ],
  }),
  Player.emoji('RAT', {
    // piper, UTC-5, Day 13
    emoji: '🐀',
    color: rgb('70ff61'),
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Warsaw',
      'Minsk',
      'Moscow',
      'Ekaterinburg',
      'Omsk',
    ],
  }),
  Player.emoji('wing', {
    // UTC-7, Day 14, used 1 grace
    emoji: '🥑',
    color: rgb('008080'),
    progress: 0.05,
    path: [
      'London',
      'Paris',
      'Amsterdam',
      'Berlin',
      'Prague',
      'Vienna',
      'Budapest',
      'Bucharest',
      'Odessa',
      'Moscow',
      'Ekaterinburg',
    ],
  }),
  Player.emoji('bcj', {
    // UTC-5, Day 12
    emoji: '👻',
    color: rgb('6600aa'),
    path: [
      'London',
      'Paris',
      'Munich',
      'Vienna',
      'Budapest',
      'Thessaloniki',
      'Athens',
      'Izmir',
      'Istanbul',
      'Beirut',
    ],
  }),
  Player.emoji('Zandra', {
    // UTC-5, Day 13
    emoji: '🐭',
    color: rgb('33ccff'),
    path: [
      'London',
      'Paris',
      'Nice',
      'Rome',
      'Bucharest',
      'Odessa',
      'Istanbul',
      "Ha'il",
    ],
  }),
];

export const playersByCity: Record<string, Player[]> = {};
for (const player of players) {
  if (player.progress) continue;
  (playersByCity[player.city.name] ??= []).push(player);
}
