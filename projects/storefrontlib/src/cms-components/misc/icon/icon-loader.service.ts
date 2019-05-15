import { Injectable } from '@angular/core';
import { IconConfig, ICON_TYPE } from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  constructor(private config: IconConfig) {}

  /**
   * Indicates whether the given icon type is configured to use SVG.
   */
  useSvg(iconType: ICON_TYPE): boolean {
    return !!this.config.icon.resources.find(res =>
      res.types.includes(iconType)
    );
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config has been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  getSvgPath(iconType: ICON_TYPE): string {
    const svgResource = this.config.icon.resources.find(res =>
      res.types.includes(iconType)
    );
    if (svgResource) {
      return svgResource.url
        ? `${svgResource.url}#${this.getSymbol(iconType)}`
        : `#${this.getSymbol(iconType)}`;
    }
  }

  /**
   *
   * Returns the symbol class(es) for the icon type.
   */
  getStyleClasses(iconType: ICON_TYPE | string): string[] {
    return this.getSymbol(iconType).split(' ');
  }

  private getSymbol(iconType: ICON_TYPE | string) {
    return this.config.icon &&
      this.config.icon.symbols &&
      this.config.icon.symbols[iconType]
      ? this.config.icon.symbols[iconType]
      : iconType;
  }
}
