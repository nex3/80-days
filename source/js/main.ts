import './cesium-types';

window.CESIUM_BASE_URL = '/Cesium';

import * as Cesium from 'cesium';
import {upperCase} from 'upper-case';

import {City, cities, citiesByName} from './cities';
import {playersByCity, players} from './players';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTQzNWEwNi01YzM0LTRmZjItYjZmMy1jOTExNTllNTY4MzYiLCJpZCI6MTAzNDI4LCJpYXQiOjE2NTk0OTU4OTN9.-GZMqtr9hUYcNVSPYgGwK5eFNhr4-QN6p7gWB5hAPpw';

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
    citiesByName['London'].lat + startingZoom - offset
  ),
  orientation: {
    heading: 0,
    pitch: Cesium.Math.toRadians(-60), // default value (looking down)
    roll: 0.0, // default value
  },
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
for (const player of players) {
  const count = player.city.name!.length;
  const r = count === 1 ? 0 : Math.random() * (6 + count);
  const theta = Math.random() * 2 * Math.PI;
  const playerEntity = viewer.entities.add({
    name: player.name,
    position: Cesium.Cartesian3.fromDegrees(player.city.long, player.city.lat),
    billboard: {
      image: player.pin,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(
        r * Math.cos(theta),
        r * Math.sin(theta)
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

  for (const [cityName, entity] of Object.entries(entitiesByCity)) {
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

let highlightedPath: Cesium.Entity | undefined;
viewer.selectedEntityChanged.addEventListener(entity => {
  if (highlightedPath) {
    const color = highlightedPath.polyline!.material.color;
    color.setValue(color.getValue().withAlpha(0.5));
  }

  highlightedPath = pathsByPlayerEntity.get(entity);
  if (!highlightedPath) return;

  const color = highlightedPath.polyline!.material.color;
  color.setValue(color.getValue().withAlpha(1));
});
