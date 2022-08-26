import './cesium-types';

window.CESIUM_BASE_URL = '/Cesium';

import * as Cesium from 'cesium';
import {upperCase} from 'upper-case';

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

const viewCity = citiesByName['Tehran'];
const viewAdjust = {lat: 0, long: 0};

const startingZoom = 8;
const offset = 15;
viewer.camera.setView({
  destination: Cesium.Rectangle.fromDegrees(
    viewCity.long + viewAdjust.long - startingZoom,
    viewCity.lat + viewAdjust.lat - startingZoom - offset,
    viewCity.long + viewAdjust.long + startingZoom,
    viewCity.lat + viewAdjust.lat + startingZoom - offset
  ),
  orientation: {
    heading: 0,
    pitch: Cesium.Math.toRadians(-60), // default value (looking down)
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
