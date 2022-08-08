import {
  Component,
  HostBinding,
  Input,
  SecurityContext
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import { IconLoaderService } from './icon-loader.service';
import { IconResourceType, IconConfigResource, ICON_TYPE as DEFAULT_ICON_TYPE } from './icon.model';

type ICON_TYPE = DEFAULT_ICON_TYPE | string;

/**
 *
 * The icon component can be added in different ways:
 *
 * With the component selector:
 * `<cx-icon type="SEARCH"></cx-icon>`
 *
 * With the attribute selector:
 * `<span cxIcon="STAR"></span>`
 *
 * Additionally, content can be projected to the icon:
 *
 * `<button cxIcon="HAPPY">happy label</button>`
 *
 * The above button would become (based on a TEXT resource type):
 * `<button>😊happy label</button>`
 *
 * While the content is projected, the icon itself doesn't require an
 * additional DOM node which is an advantage over the component selector.
 */
@Component({
  selector: 'cx-icon,[cxIcon]',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  /**
   * The cxIcon directive is bound to the icon type. You can feed the `ICON_TYPE` to
   * accomplish a configurable button in the UI.
   */
  @Input() set cxIcon(type: ICON_TYPE) {
    this.setIcon(type);
  }

  /**
   * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
   * accomplish a configurable button in the UI.
   */
  @Input() set type(type: ICON_TYPE) {
    this.setIcon(type);
  }

  /**
   * Maintains the applied style classes so we can remove them when the
   * icon type changes at run time.
   */
  @HostBinding('class') styleClasses: string[] = [];

  /**
   * The `flip-at-rtl` class is added to the DOM for the style layer to flip the icon in RTL direction.
   */
  @HostBinding('class.flip-at-rtl') flipAtRtl: boolean;

  /**
   * The `flip-at-ltr` class is added to the DOM for the style layer to flip the icon in LTR direction.
   */
  @HostBinding('class.flip-at-ltr') flipAtLtr: boolean;

  /**
   * A text for text based icons or a (relative) SVG URL (fragment) for SVG icons.
   */
  private iconValue: string | null;

  private iconResourceType: IconResourceType;

  private loadedResources: string[] = [];

  constructor(
    protected iconLoader: IconLoaderService,
    protected winRef: WindowRef,
    protected sanitizer: DomSanitizer
  ) {}

  protected setIcon(type: ICON_TYPE): void {
    if (!type || <string>type === '') {
      return;
    }
    if (this.iconLoader.isResourceType(type, IconResourceType.SVG)) {
        this.iconResourceType = IconResourceType.SVG;
        this.iconValue = this.sanitizer.sanitize(SecurityContext.URL, this.iconLoader.getSvgPath(type));
    } else if (this.iconLoader.isResourceType(type, IconResourceType.TEXT)) {
        this.iconResourceType = IconResourceType.TEXT;
        this.iconValue = this.iconLoader.getSymbol(type);
    } else if (this.iconLoader.isResourceType(type, IconResourceType.LINK)) {
        this.iconResourceType = IconResourceType.LINK;
        this.iconValue = null;
    } else {
        // TODO seems to be same as for LINK, consolidate?
        this.iconResourceType = IconResourceType.LINK;
        this.iconValue = null;
    }
    this.addLinkResource(type);
    this.addStyleClasses(type);
    this.flipIcon(type);
  }

  public get icon(): string | null {
    return this.iconValue;
}

  public isSvgIcon(): boolean {
    return this.iconResourceType == IconResourceType.SVG;
  }

  public isTextIcon(): boolean {
    return this.iconResourceType == IconResourceType.TEXT;
  }

  /**
   * Loads the resource url (if any) for the given icon.
   * The icon will only be loaded once.
   *
   * NOTE: this is not working when the shadow is used as there's
   * no head element available and the link must be loaded for every
   * web component.
   */
  protected addLinkResource(iconType: ICON_TYPE | string): void {
    const resource: IconConfigResource | undefined = this.iconLoader.findResource(
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
      link.href = resource.url; // XXX bypasses angular url sanitization
      head.appendChild(link);
    }
  }

  /**
   * The icons supports flipping for some icons to support rtl and ltr directions.
   */
  protected flipIcon(type: ICON_TYPE) {
    // TODO: this can be dropped with the next major release.
    if (!this.iconLoader.getFlipDirection) {
      return;
    }
    const iconDirection = this.iconLoader.getFlipDirection(type);
    this.flipAtLtr = iconDirection === DirectionMode.LTR;
    this.flipAtRtl = iconDirection === DirectionMode.RTL;
  }

  /**
   * Adds the style classes and the link resource (if available).
   */
  protected addStyleClasses(type: ICON_TYPE): void {
    // TODO keep classes that have nothing to do with the icon?
    this.styleClasses = [];
    this.styleClasses.push('cx-icon');

    const iconClasses = this.iconLoader.getStyleClasses(type)?.split(/\s+/);
    iconClasses?.forEach((iconClass) => {
      const trimmedIconClass = iconClass.trim();
      if (trimmedIconClass !== '') {
        this.styleClasses.push(trimmedIconClass);
      }
    });
  }
}
