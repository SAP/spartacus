import { Injectable } from '@angular/core';
import { IconConfig, ICON_TYPES } from './icon.config';

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  constructor(private config: IconConfig) {}

  useSvg(): boolean {
    return this.config.icon && this.config.icon.useSvg;
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config has been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  getSvgPath(iconType: ICON_TYPES | string): string {
    if (!this.useSvg()) {
      return null;
    }
    let path = '';

    if (this.config.icon && this.config.icon.svgPath) {
      path = this.config.icon.svgPath;
    }
    // if there's no mapping configured, we use the default value
    path += '#';
    if (this.config.icon && this.config.icon.prefix) {
      path += this.config.icon.prefix;
    }
    path += this.getMappedType(iconType);
    return path;
  }

  /**
   *
   * returns an array of css classes that can be used to
   * render the icon by CSS / font. This is driven by the `iconType`
   * and the icon configuration, so that multiple icon fonts are
   * supported, such as font awesome, glypicons, Octicons, etc.
   */
  getStyleClasses(iconType: ICON_TYPES | string): string[] {
    const styleClasses = [];

    if (this.config.icon && this.config.icon.iconClass) {
      styleClasses.push(this.config.icon.iconClass);
    }
    let type = this.getMappedType(iconType);
    if (this.config.icon && this.config.icon.prefix) {
      type = this.config.icon.prefix + type;
    }
    styleClasses.push(type);
    return styleClasses;
  }

  private getMappedType(iconType: ICON_TYPES | string) {
    return this.config.icon &&
      this.config.icon.icons &&
      this.config.icon.icons[iconType]
      ? this.config.icon.icons[iconType]
      : iconType;
  }
}
