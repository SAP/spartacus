import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE } from './icon.model';

@Component({
  selector: 'cx-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnInit {
  /**
   * The type of the icon which maps to the icon link
   * in the svg icon sprite.
   */
  @Input() type: ICON_TYPE;

  /**
   * Keeps the given style classes so that we can
   * clean them up when the icon changes
   */
  @HostBinding('class') styleClasses = '';

  private staticStyleClasses: string;

  constructor(
    protected iconLoader: IconLoaderService,
    protected elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.staticStyleClasses = this.elementRef.nativeElement.classList.value;
    this.addStyleClasses();
  }

  /**
   * Indicates whether the icon is configured to use SVG or not.
   */
  get useSvg(): boolean {
    return this.iconLoader.useSvg(this.type);
  }

  /**
   * Returns the path to the svg symbol. The path could include an
   * external URL to an svg (sprite) file, but can also reference
   * an existing SVG symbol in the DOM.
   */
  get svgPath(): string {
    return this.iconLoader.getSvgPath(this.type);
  }

  /**
   * Adds the style classes and the link resource (if availabe).
   */
  private addStyleClasses() {
    if (this.staticStyleClasses) {
      this.styleClasses = this.staticStyleClasses + ' ';
    }

    if (this.useSvg) {
      return;
    }

    this.styleClasses += this.iconLoader.getStyleClasses(this.type);
    this.iconLoader.addLinkResource(this.type);
  }
}
