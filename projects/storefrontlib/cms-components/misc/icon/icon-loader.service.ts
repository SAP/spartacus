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

  private loadedResources: string[] = [];

  constructor(
    protected winRef: WindowRef,
    protected iconConfig: IconConfig,
    protected sanitizer: DomSanitizer
  ) {}

  /**
   * Returns an html fragment which can be added to the DOM in a safe way.
   *
   * @deprecated only exists for backwards compatibility, html generation has been moved to icon component
   */
  public getHtml(type: ICON_TYPE | string): SafeHtml | undefined {
    if (this.isResourceType(type, IconResourceType.SVG)) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<svg><use xlink:href="${this.getSvgPath(type)}"></use></svg>`
      );
    }
    if (this.isResourceType(type, IconResourceType.TEXT)) {
      const symbol = this.getSymbol(type);
      if (symbol) {
        return this.sanitizer.bypassSecurityTrustHtml(symbol);
      }
    }
  }

  /**
   * Return the direction for which the icon should mirror (ltr vs rtl). The icon direction
   * is configurable, but optional, as only a few icons should be flipped for rtl direction.
   */
  public getFlipDirection(type: ICON_TYPE | string): DirectionMode | undefined {
    return this.config?.flipDirection?.[type];
  }

  /**
   *
   * Returns the symbol class(es) for the icon type.
   */
  public getStyleClasses(iconType: ICON_TYPE | string): string {
    return this.getSymbol(iconType) || '';
  }

  /**
   * Indicates whether the given `ICON_TYPE` is configured for
   * the given `IconResourceType`.
   */
  public isResourceType(
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
  public getSvgPath(iconType: ICON_TYPE | string): string | null {
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

  /**
   * Loads the resource url (if any) for the given icon.
   * The icon will only be loaded once.
   *
   * NOTE: this is not working when the shadow is used as there's
   * no head element available and the link must be loaded for every
   * web component.
   * 
   * @deprecated only exists for backwards compatibility, resource loading has been moved to icon component
   */
  public addLinkResource(iconType: ICON_TYPE | string): void {
    const resource: IconConfigResource | undefined = this.findResource(
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

  public findResource(iconType: ICON_TYPE | string, resourceType: IconResourceType): IconConfigResource | undefined {
    // first try to find a specific resource, otherwise find a one-size-fits-all resource
    return this.config?.resources?.find(res => res.type === resourceType && res.types?.includes(iconType))
        || this.config?.resources?.find(res => res.type === resourceType && !res.types);
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
