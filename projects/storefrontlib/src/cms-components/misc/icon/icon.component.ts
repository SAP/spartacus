import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE } from './icon.model';

@Component({
  selector: 'cx-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  /**
   * The type of the icon which maps to the icon link
   * in the svg icon sprite.
   */
  _type: ICON_TYPE;
  @Input('type')
  set type(type: ICON_TYPE) {
    this._type = type;
    this.addStyleClasses(type);
  }

  /**
   * Keeps the given style classes so that we can
   * clean them up when the icon changes
   */
  @HostBinding('class') styleClasses = '';

  /**
   * Style class names from the host element are taken into account
   * when classes are set dynamically.
   */
  private staticStyleClasses: string;

  constructor(
    protected iconLoader: IconLoaderService,
    protected elementRef: ElementRef<HTMLElement>
  ) {}

  /**
   * Indicates whether the icon is configured to use SVG or not.
   */
  get useSvg(): boolean {
    return this.iconLoader.useSvg(this._type);
  }

  /**
   * Returns the path to the svg symbol. The path could include an
   * external URL to an svg (sprite) file, but can also reference
   * an existing SVG symbol in the DOM.
   */
  get svgPath(): string {
    return this.iconLoader.getSvgPath(this._type);
  }

  /**
   * Adds the style classes and the link resource (if availabe).
   */
  private addStyleClasses(type: ICON_TYPE) {
    if (this.useSvg) {
      return;
    }

    if (this.staticStyleClasses === undefined) {
      this.staticStyleClasses = this.elementRef.nativeElement.classList.value
        ? this.elementRef.nativeElement.classList.value + ' '
        : '';
    }

    this.styleClasses =
      this.staticStyleClasses + this.iconLoader.getStyleClasses(type);

    this.iconLoader.addLinkResource(type);
  }
}
