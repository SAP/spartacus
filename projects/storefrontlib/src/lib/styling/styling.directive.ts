import {
  Directive,
  // TemplateRef,
  // ViewContainerRef,
  OnInit,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';
import { ProductModuleConfig } from '../product/product-config';

@Directive({
  selector: '[cxStylingDirective]'
})
export class StylingDirective implements OnInit {
  @Input() cxStylingDirective: any;

  constructor(
    // private vcr: ViewContainerRef,
    // private templateRef: TemplateRef<any>,
    private renderer: Renderer2,
    private el: ElementRef,
    private config: ProductModuleConfig
  ) {}

  ngOnInit() {
    if (this.config.product.styles) {
      this.insjectStyle();
    }
  }

  private insjectStyle(): void {
    // this.vcr.createEmbeddedView(this.templateRef, {
    //   $implicit: 'red'
    // });
    if (this.config.product.styles.blue) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        `<style>@import url(styles/blue-color.css);</style>`
      );
    }
  }
}
