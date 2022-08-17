import * as Cesium from 'cesium';

import {City, citiesByName} from './cities';

const pinBuilder = new Cesium.PinBuilder();

interface PlayerOptions {
  color: Cesium.Color;
  path: string[];
  emoji?: string;
  progress?: number;
}

export class Player {
  readonly name: string;
  readonly pin: HTMLCanvasElement;
  readonly color: Cesium.Color;
  readonly path: string[];
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
  Player.emoji('swiftie', {
    // not telling, UTC-7, Day 3
    emoji: '🧣️',
    color: rgb('9300FF'),
    path: ['London', 'Paris', 'Munich', 'Berlin'],
  }),
  Player.emoji('Coraphii', {
    // UTC-5, Day 4
    emoji: '🐻‍❄️',
    color: rgb('00dda4'),
    progress: 0.5,
    path: ['London', 'Paris', 'Amsterdam', 'Copenhagen'],
  }),
  Player.emoji('HeartbreakDaisy', {
    // K V, UTC-7, Day 3
    emoji: '🌼',
    color: rgb('FFD139'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('@topghost', {
    // Casey, UTC-7, Day 4
    emoji: '🙈',
    color: rgb('966bb6'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('Dana Callista Lexa', {
    // UTC-5, Day 3
    emoji: '☕',
    color: rgb('8E562E'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('Rushfoil', {
    // UTC+1, Day 4
    emoji: '🐇',
    color: rgb('7e8c8f'),
    progress: 0.55,
    path: ['London', 'Paris', 'Amsterdam', 'Berlin'],
  }),
  Player.emoji('Ari-topper', {
    // Delphine, UTC+2, Day 3
    emoji: '🌻',
    color: rgb('8773d3'),
    path: ['London', 'Paris', 'Munich', 'Vienna', 'Budapest'],
  }),
  Player.emoji('Modulusshift', {
    // UTC-6, Day 4, used 1 grace
    emoji: '~',
    color: rgb('96f9f9'),
    path: ['London', 'Paris', 'Munich', 'Vienna'],
  }),
  Player.emoji('Michelle S', {
    // UTC-7, Day 3
    emoji: '🍩️',
    color: rgb('A51DE5'),
    path: ['London', 'Paris', 'Munich'],
  }),
  Player.emoji('ferns', {
    // UTC-7, Day 3
    emoji: '🦊️',
    color: rgb('2C9510'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('two', {
    // UTC+10, Day 5
    emoji: '2️⃣',
    color: rgb('139DFE'),
    progress: 0.25,
    path: ['London', 'Paris', 'Amsterdam', 'Munich'],
  }),
  Player.emoji('Brian P', {
    // UTC-4, Day 2
    emoji: ':/',
    color: rgb('7C8383'),
    progress: 0.1,
    path: ['London', 'Paris', 'Amsterdam', 'Munich'],
  }),
  Player.emoji('BibliovoreOrc', {
    // UTC-5, Day 3
    emoji: '📚',
    color: rgb('33FF33'),
    path: ['London', 'Paris', 'Nice'],
  }),
  Player.emoji('Tomato', {emoji: '🍅', color: rgb('f1948a'), path: ['London']}),
  Player.emoji('Gwentacles', {
    // UTC-7, Day 3, used 1 grace
    emoji: '🐙️',
    color: rgb('32fff4'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('Les', {
    // daanniii, UTC+0, Day 3
    emoji: '🐸️',
    color: rgb('b00b69'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('Rain Doggerel', {
    // UTC-7, used 1 grace
    emoji: '☣️',
    color: rgb('14bccc'),
    progress: 0.5,
    path: ['London', 'Paris', 'Amsterdam', 'Berlin'],
  }),
  Player.emoji('Mallumet', {
    // UTC-5, Day 4
    emoji: '🤖',
    color: rgb('44ad9c'),
    progress: 0.85,
    path: ['London', 'Paris', 'Munich', 'Vienna'],
  }),
  Player.emoji('Tekgo', {
    // UTC-7, Day 4
    emoji: '💖',
    color: rgb('e60283'),
    progress: 0.45,
    path: ['London', 'Paris', 'Amsterdam', 'Kristiania'],
  }),
  Player.emoji('fellatiomatic', {
    // toadman
    emoji: '🤠',
    color: rgb('e8b4ff'),
    progress: 0.4,
    path: ['London', 'Paris'],
  }),
  Player.emoji('jebwrench', {
    // UTC-4, Day 3
    emoji: '🐧',
    color: rgb('ff5cd6'),
    path: ['London', 'Paris', 'Munich', 'Vienna'],
  }),
  Player.emoji('WulfOrc', {
    // Cliff, UTC-7, Day 2
    emoji: '🦀',
    color: rgb('e23b59'),
    progress: 0.65,
    path: ['London', 'Paris', 'Amsterdam', 'Copenhagen'],
  }),
  Player.emoji('Athene', {
    // UTC+1, Day 4
    emoji: '😼',
    color: rgb('fa46f4'),
    progress: 0.05,
    path: ['London', 'Paris', 'Munich', 'Vienna', 'Venice'],
  }),
  Player.emoji('Ronja', {
    // UTC-4, Day 2
    emoji: '🐢',
    color: rgb('009d9d'),
    path: ['London', 'Paris'],
  }),
  Player.emoji('wayward', {
    // UTC-7, Day 4
    emoji: '🎻',
    color: rgb('9a86a3'),
    path: ['London', 'Paris', 'Munich', 'Vienna'],
  }),
  await Player.image('jae', {
    // UTC-5, Day 3
    image: '/images/eggbug.svg',
    color: rgb('48d1cc'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('@garak', {
    // UTC-5, Day 3
    emoji: 'ꙮ',
    color: rgb('6bec58'),
    path: ['London', 'Paris'],
  }),
  await Player.image('Liz', {
    // UTC-7, Day 3
    emoji: '🦭',
    image: '/images/liz.webp',
    color: rgb('00637b'),
    path: ['London', 'Paris', 'Nice'],
  }),
  Player.emoji('Natalie', {
    // UTC-7, Day 4
    emoji: '🌿',
    color: Cesium.Color.BLUE,
    path: ['Paris', 'Nice', 'Rome'],
  }),
  Player.emoji('RAT', {
    // UTC-5, Day 3
    emoji: '🐀',
    color: rgb('70ff61'),
    path: ['London', 'Paris', 'Amsterdam'],
  }),
  Player.emoji('wing', {
    // UTC-7, Day 3
    emoji: '🥑',
    color: rgb('008080'),
    path: ['London', 'Paris'],
  }),
  Player.emoji('bcj', {
    // UTC-5, Day 4
    emoji: '👻',
    color: rgb('6600aa'),
    path: ['London', 'Paris', 'Munich', 'Vienna', 'Budapest'],
  }),
  Player.emoji('Zandra', {
    // UTC-5, Day 4
    emoji: '🐭',
    color: rgb('33ccff'),
    progress: 0.4,
    path: ['London', 'Paris', 'Nice', 'Rome'],
  }),
];

export const playersByCity: Record<string, Player[]> = {};
for (const player of players) {
  if (player.progress) continue;
  (playersByCity[player.city.name] ??= []).push(player);
}
