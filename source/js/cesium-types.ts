// Types that are missing from Cesium's typings.
/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as Cesium from 'cesium';

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

declare module 'cesium' {
  interface MaterialProperty {
    get color(): Cesium.Property;
  }

  // Everything that Cesium types as a property is actually a
  // ConstantProperty, at least as far as we're concerned.
  interface Property {
    getValue(): any;
    setValue(value: any): void;
  }
}
