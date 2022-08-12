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
  Player.emoji('ferns', {
    emoji: '🦊️',
    color: rgb('2C9510'),
    path: ['London'],
  }),
  Player.emoji('two', {
    emoji: '2️⃣',
    color: rgb('139DFE'),
    path: ['London'],
  }),
  Player.emoji('Brian P', {
    emoji: ':/',
    color: rgb('7C8383'),
    path: ['London'],
  }),
  Player.emoji('BibliovoreOrc', {
    emoji: '📚',
    color: rgb('33FF33'),
    path: ['London'],
  }),
  Player.emoji('Tomato', {emoji: '🍅', color: rgb('f1948a'), path: ['London']}),
  Player.emoji('Gwentacles', {
    emoji: '🐙️',
    color: rgb('32fff4'),
    path: ['London'],
  }),
  Player.emoji('Les', {emoji: '🐸️', color: rgb('b00b69'), path: ['London']}),
  Player.emoji('Rain Doggerel', {
    emoji: '☣️',
    color: rgb('14bccc'),
    path: ['London'],
  }),
  Player.emoji('Mallumet', {
    emoji: '🤖',
    color: rgb('44ad9c'),
    path: ['London'],
  }),
  Player.emoji('Tekgo', {emoji: '💖', color: rgb('e60283'), path: ['London']}),
  Player.emoji('fellatiomatic', {
    emoji: '🤠',
    color: rgb('e8b4ff'),
    path: ['London'],
  }),
  Player.emoji('jebwrench', {
    emoji: '🐧',
    color: rgb('ff5cd6'),
    path: ['London'],
  }),
  Player.emoji('WulfOrc', {
    emoji: '🦀',
    color: rgb('e23b59'),
    path: ['London'],
  }),
  Player.emoji('Athene', {emoji: '😼', color: rgb('fa46f4'), path: ['London']}),
  Player.emoji('Ronja', {emoji: '🐢', color: rgb('009d9d'), path: ['London']}),
  Player.emoji('wayward', {
    emoji: '🎻',
    color: rgb('9a86a3'),
    path: ['London'],
  }),
  await Player.image('jae', {
    image: '/images/eggbug.png',
    color: rgb('48d1cc'),
    path: ['London'],
  }),
  Player.emoji('@garak', {emoji: 'ꙮ', color: rgb('6bec58'), path: ['London']}),
  await Player.image('Liz', {
    emoji: '🦭',
    image: '/images/liz.webp',
    color: rgb('00637b'),
    path: ['London'],
  }),
  Player.emoji('Natalie', {
    emoji: '🌿',
    color: Cesium.Color.BLUE,
    path: ['London'],
  }),
  Player.emoji('RAT', {emoji: '🐀', color: rgb('70ff61'), path: ['London']}),
  Player.emoji('wing', {emoji: '🥑', color: rgb('008080'), path: ['London']}),
  Player.emoji('bcj', {emoji: '👻', color: rgb('6600aa'), path: ['London']}),
  Player.emoji('Zandra', {emoji: '🐭', color: rgb('33ccff'), path: ['London']}),
];

export const playersByCity: Record<string, Player[]> = {};
for (const player of players) {
  (playersByCity[player.city.name] ??= []).push(player);
}
