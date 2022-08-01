import { Injectable } from '@angular/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import {
  IconConfig,
  IconConfigResource,
  IconOptions,
  IconResourceType,
  ICON_TYPE,
} from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  constructor(
    protected iconConfig: IconConfig
  ) {}

  /**
   * Return the direction for which the icon should mirror (ltr vs rtl). The icon direction
   * is configurable, but optional, as only a few icons should be flipped for rtl direction.
   */
  getFlipDirection(type: ICON_TYPE | string): DirectionMode | undefined {
    return this.config?.flipDirection?.[type];
  }

  /**
   *
   * Returns the symbol class(es) for the icon type.
   */
  getStyleClasses(iconType: ICON_TYPE | string): string {
    return this.getSymbol(iconType) || '';
  }

  /**
   * Indicates whether the given `ICON_TYPE` is configured for
   * the given `IconResourceType`.
   */
  isResourceType(
    iconType: ICON_TYPE | string,
    resourceType: IconResourceType
  ): boolean {
    return (
      this.config?.resources !== undefined &&
      !!this.config.resources.find(
        (res) =>
          res.types && res.type === resourceType && res.types.includes(iconType)
      )
    );
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config has been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  getSvgPath(iconType: ICON_TYPE | string): string | null {
    const svgResource = this.config?.resources?.find(
      (res) =>
        res.type === IconResourceType.SVG &&
        res.types &&
        res.types.includes(iconType)
    );
    if (svgResource) {
      return svgResource.url
        ? `${svgResource.url}#${this.getSymbol(iconType)}`
        : `#${this.getSymbol(iconType)}`;
    }
    return null;
  }

  findResource(
    iconType: ICON_TYPE | string,
    resourceType: IconResourceType
  ): IconConfigResource | undefined {
    if (!this.config?.resources) {
      return;
    }

    let resource = this.config.resources.find(
      (res) =>
        res.type === resourceType && res.types && res.types.includes(iconType)
    );
    // no specific resource found, let's try to find a one-size-fits-all resource
    if (!resource) {
      resource = this.config.resources.find(
        (res) => (res.type === resourceType && !res.types) || res.types === []
      );
    }
    return resource;
  }

  public getSymbol(iconType: ICON_TYPE | string) {
    if (this.config && this.config.symbols && this.config.symbols[iconType]) {
      return this.config.symbols[iconType];
    }
    return null;
  }

  private get config(): IconOptions | undefined {
    return this.iconConfig.icon;
  }
}
