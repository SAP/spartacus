import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE } from './icon.model';

@Component({
  selector: 'cx-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnChanges {
  /**
   * The type of the icon which maps to the icon link
   * in the svg icon sprite.
   */
  @Input() type: ICON_TYPE;

  /**
   * Keeps the given style classes so that we can
   * clean them up when the icon changes
   */
  private styleClasses = [];

  constructor(
    protected iconLoader: IconLoaderService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef
  ) {}

  ngOnChanges() {
    this.addStyleClasses();
  }

  get useSvg(): boolean {
    return this.iconLoader.useSvg(this.type);
  }

  get path(): string {
    return this.iconLoader.getSvgPath(this.type);
  }

  private addStyleClasses() {
    if (this.useSvg) {
      return;
    }
    this.clearStyleClasses();
    this.styleClasses = this.iconLoader.getStyleClasses(this.type);
    this.styleClasses.forEach(cls => {
      this.renderer.addClass(this.hostElement.nativeElement, cls);
    });
  }

  private clearStyleClasses() {
    this.styleClasses.forEach(cls => {
      this.renderer.removeClass(this.hostElement.nativeElement, cls);
    });
  }
}
