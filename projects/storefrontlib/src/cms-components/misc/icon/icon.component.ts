import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPES } from './icon.config';

@Component({
  selector: 'cx-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnChanges {
  /**
   * Keeps the given style classes so that we can
   * clean them up when the icon changes
   */
  private iconStyleClasses = [];

  /**
   * The type of the icon which maps to the icon link
   * in the svg icon sprite.
   */
  @Input() type: ICON_TYPES | string;

  constructor(
    private iconLoader: IconLoaderService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef
  ) {}

  ngOnChanges() {
    this.addStyleClasses();
  }

  get useSvg(): boolean {
    return this.iconLoader.useSvg();
  }

  get path(): string {
    return this.iconLoader.getSvgPath(this.type);
  }

  private addStyleClasses() {
    if (this.useSvg) {
      return;
    }
    this.clearStyleClasses();
    this.iconStyleClasses = this.iconLoader.getStyleClasses(this.type);
    this.iconStyleClasses.forEach(cls => {
      this.renderer.addClass(this.hostElement.nativeElement, cls);
    });
  }

  private clearStyleClasses() {
    this.iconStyleClasses.forEach(cls => {
      this.renderer.removeClass(this.hostElement.nativeElement, cls);
    });
  }
}
