import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import {
  IconConfig,
  IconConfigResource,
  IconOptions,
  IconResourceType,
  ICON_TYPE_STRING,
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
  public getHtml(type: ICON_TYPE_STRING): SafeHtml | undefined {
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
  public getFlipDirection(type: ICON_TYPE_STRING): DirectionMode | null {
    return this.config?.flipDirection?.[type] || null;
  }

  /**
   *
   * Returns the symbol class(es) for the icon type.
   */
  public getStyleClasses(iconType: ICON_TYPE_STRING): string {
    return this.getSymbol(iconType) || '';
  }

  /**
   * Indicates whether the given `ICON_TYPE` is configured for
   * the given `IconResourceType`.
   */
  public isResourceType(iconType: ICON_TYPE_STRING, resourceType: IconResourceType): boolean {
    return !!this.config?.resources
        ?.find(res => res.type === resourceType && res.types?.includes(iconType));
  }

  /**
   * Returns the path to the svg link. The link supports path names
   * as well, if the config has been setup to support a svg file path.
   * Additionally, the icon prefix will be taken into account to prefix the
   * icon IDs in the SVG.
   */
  public getSvgPath(iconType: ICON_TYPE_STRING): string | null {
    const svgResource = this.config?.resources
        ?.find(res => res.type === IconResourceType.SVG && res.types?.includes(iconType));
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
  public addLinkResource(iconType: ICON_TYPE_STRING): void {
    const resource = this.findResource(iconType, IconResourceType.LINK);
    if (
      resource?.url &&
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

  /**
   * Find the IconConfigResource configured for given iconType and resourceType.
   * Try to find a resource, specific to both the iconType and the resourceType.
   * Otherwise, try to find a one-size-fits-all resource for the resourceType, if any.
   */
  public findResource(iconType: ICON_TYPE_STRING, resourceType: IconResourceType): IconConfigResource | null {
    return this.config?.resources?.find(res => res.type === resourceType && res.types?.includes(iconType))
        || this.config?.resources?.find(res => res.type === resourceType && !res.types)
        || null;
  }

  /**
   * Get the symbol configured for given iconType, if any.
   */
  public getSymbol(iconType: ICON_TYPE_STRING): string | null {
      return this.config?.symbols?.[iconType] || null;
  }

  private get config(): IconOptions | null {
    return this.iconConfig.icon || null;
  }
}
