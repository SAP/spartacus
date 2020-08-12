import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
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
  private loadedResources = [];
  constructor(
    protected winRef: WindowRef,
    protected iconConfig: IconConfig,
    protected sanitizer: DomSanitizer
  ) {}

  /**
   * Returns an html fragment which can be added to the DOM in a safe way.
   */
  getHtml(type: ICON_TYPE | string): SafeHtml {
    if (this.isResourceType(type, IconResourceType.SVG)) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<svg><use xlink:href="${this.getSvgPath(type)}"></use></svg>`
      );
    }
    if (this.isResourceType(type, IconResourceType.TEXT)) {
      return this.sanitizer.bypassSecurityTrustHtml(this.getSymbol(type));
    }
  }

  /**
   * Return the direction for which the icon should mirror (ltr vs rtl). The icon direction
   * is configurable, but optional, as only a few icons should be flipped for rtl direction.
   */
  getFlipDirection(type: ICON_TYPE | string): DirectionMode {
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
  private isResourceType(
    iconType: ICON_TYPE | string,
    resourceType: IconResourceType
  ): boolean {
    return (
      this.config.resources &&
      !!this.config.resources.find(
        (res) =>
          res.types && res.type === resourceType && res.types.includes(iconType)
      )
    );
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config a[[s been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  private getSvgPath(iconType: ICON_TYPE | string): string {
    const svgResource = this.config.resources.find(
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
  }

  /**
   * Loads the resource url (if any) for the given icon.
   * The icon will only be loaded once.
   *
   * NOTE: this is not working when the shadow is used as there's
   * no head element available and the link must be loaded for every
   * web component.
   */
  addLinkResource(iconType: ICON_TYPE | string): void {
    const resource: IconConfigResource = this.findResource(
      iconType,
      IconResourceType.LINK
    );
    if (
      resource &&
      resource.url &&
      !this.loadedResources.includes(resource.url)
    ) {
      this.loadedResources.push(resource.url);
      const head = this.winRef.document.getElementsByTagName('head')[0];
      const link = this.winRef.document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = resource.url;
      head.appendChild(link);
    }
  }

  private findResource(
    iconType: ICON_TYPE | string,
    resourceType: IconResourceType
  ): IconConfigResource {
    if (!this.config.resources) {
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

  getSymbol(iconType: ICON_TYPE | string) {
    if (this.config && this.config.symbols && this.config.symbols[iconType]) {
      return this.config.symbols[iconType];
    }
  }

  private get config(): IconOptions {
    return this.iconConfig.icon;
  }
}
