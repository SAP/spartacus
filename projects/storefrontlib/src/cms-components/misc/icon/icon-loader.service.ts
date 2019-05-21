import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  IconConfig,
  IconConfigResource,
  IconResourceType,
  ICON_TYPE,
} from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  private loadedResources = [];
  constructor(protected winRef: WindowRef, protected config: IconConfig) {}

  /**
   * Indicates whether the given icon type is configured to use SVG.
   */
  useSvg(iconType: ICON_TYPE): boolean {
    return (
      this.config.icon.resources &&
      !!this.config.icon.resources.find(
        res =>
          res.types &&
          res.type === IconResourceType.SVG &&
          res.types.includes(iconType)
      )
    );
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config has been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  getSvgPath(iconType: ICON_TYPE): string {
    const svgResource = this.config.icon.resources.find(
      res =>
        res.type === IconResourceType.SVG &&
        res.types &&
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
  getStyleClasses(iconType: ICON_TYPE | string): string {
    return this.getSymbol(iconType) || '';
  }

  /**
   * Loads the resource url (if any) for the given icon.
   * The icon will only be loaded once.
   *
   * NOTE: this is not working when the shadow is used as there's
   * no head element available and the link must be loaded for every
   * web component.
   */
  addLinkResource(iconType: ICON_TYPE): void {
    const resource: IconConfigResource = this.findResource(
      iconType,
      IconResourceType.LINK
    );
    if (resource && resource.url) {
      if (!this.loadedResources.includes(resource.url)) {
        this.loadedResources.push(resource.url);
        const head = this.winRef.document.getElementsByTagName('head')[0];
        const link = this.winRef.document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = resource.url;
        head.appendChild(link);
      }
    }
  }

  private findResource(
    iconType: ICON_TYPE,
    resourceType: IconResourceType
  ): IconConfigResource {
    if (!this.config.icon.resources) {
      return;
    }

    let resource = this.config.icon.resources.find(
      res =>
        res.type === resourceType && res.types && res.types.includes(iconType)
    );
    // no specific resource found, let's try to find a one-size-fits-all resource
    if (!resource) {
      resource = this.config.icon.resources.find(
        res => (res.type === resourceType && !res.types) || res.types === []
      );
    }
    return resource;
  }

  private getSymbol(iconType: ICON_TYPE | string) {
    if (
      this.config.icon &&
      this.config.icon.symbols &&
      this.config.icon.symbols[iconType]
    ) {
      return this.config.icon.symbols[iconType];
    }
  }
}
