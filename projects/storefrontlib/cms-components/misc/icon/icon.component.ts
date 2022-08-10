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
import { IconResourceType, ICON_TYPE_STRING } from './icon.model';


/**
 * Enum with contstants for CSS classes used by the icon component.
 */
enum CSS_CLASSES  {
  CX_ICON = 'cx-icon',
  LTR = 'flip-at-ltr',
  RTL = 'flip-at-rtl',
}

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
  @Input() set cxIcon(type: ICON_TYPE_STRING) {
    this.setIcon(type);
  }

  /**
   * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
   * accomplish a configurable button in the UI.
   */
  @Input() set type(type: ICON_TYPE_STRING) {
    // XXX this clashes with the type attribute of some html form elements, e.g. input or button
    this.setIcon(type);
  }

  /**
   * Maintains the applied style classes so we can remove them when the
   * icon type changes at run time.
   */
  @HostBinding('class') styleClasses: string[] = [];

  private iconValue: string | null;
  private iconResourceType: IconResourceType;
  private loadedResources: string[] = [];

  constructor(
    protected iconLoader: IconLoaderService,
    protected winRef: WindowRef,
    protected sanitizer: DomSanitizer
  ) {}

  protected setIcon(type: ICON_TYPE_STRING): void {
    if (!type || <string>type === '') {
      return;
    }
    if (this.iconLoader.isResourceType(type, IconResourceType.SVG)) {
        this.iconResourceType = IconResourceType.SVG;
        // looks like angular does not sanitize URLs when binding to the xlink:href attribute of svg elements
        // so we need to sanitze the URL manually
        this.iconValue = this.sanitizer.sanitize(SecurityContext.URL, this.iconLoader.getSvgPath(type));
    } else if (this.iconLoader.isResourceType(type, IconResourceType.TEXT)) {
        this.iconResourceType = IconResourceType.TEXT;
        this.iconValue = this.iconLoader.getSymbol(type);
    } else {
        // assume IconResourceType.LINK by default
        this.iconResourceType = IconResourceType.LINK;
        this.iconValue = null;
    }
    this.addLinkResource(type);
    this.addStyleClasses(type);
  }

  public get icon(): string | null {
    return this.iconValue;
}

  public isSvgIcon(): boolean {
    return this.iconResourceType === IconResourceType.SVG;
  }

  public isTextIcon(): boolean {
    return this.iconResourceType === IconResourceType.TEXT;
  }

  /**
   * Loads the resource url (if any) for the given icon.
   * The icon will only be loaded once.
   *
   * NOTE: this is not working when the shadow is used as there is
   * no head element available and the link must be loaded for every
   * web component.
   */
  protected addLinkResource(type: ICON_TYPE_STRING): void {
    const resource = this.iconLoader.findResource(type, IconResourceType.LINK);

    if (resource?.url && !this.loadedResources.includes(resource.url)) {
      this.loadedResources.push(resource.url);
      // using DOM APIs, so need to sanitize our URLs manually
      const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, resource.url);
      if (sanitizedUrl) {
        const head = this.winRef.document.getElementsByTagName('head')[0];
        const link = this.winRef.document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = sanitizedUrl;
        head.appendChild(link);
      }
    }
  }

  /**
   * If necessary, adds CSS classes for flipping for some icons to support rtl and ltr directions.
   */
  protected flipIcon(type: ICON_TYPE_STRING) {
    // TODO: this check can be dropped with the next major release.
    if (!this.iconLoader.getFlipDirection) {
      return;
    }
    const iconDirection = this.iconLoader.getFlipDirection(type);
    if (iconDirection === DirectionMode.LTR) {
        this.styleClasses.push(CSS_CLASSES.LTR);
    } else if (iconDirection === DirectionMode.RTL) {
        this.styleClasses.push(CSS_CLASSES.RTL);
    }
  }

  /**
   * Adds the style classes for the icon.
   */
  protected addStyleClasses(type: ICON_TYPE_STRING): void {
    this.styleClasses = [CSS_CLASSES.CX_ICON];
    this.flipIcon(type);

    const iconClasses = this.iconLoader.getStyleClasses(type)?.split(/\s+/);
    iconClasses?.forEach((iconClass) => {
      const trimmedIconClass = iconClass.trim();
      if (trimmedIconClass !== '') {
        this.styleClasses.push(trimmedIconClass);
      }
    });
  }
}
