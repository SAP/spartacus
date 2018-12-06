import { Directive, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[cxStylingDirective]'
})
export class StylingDirective implements OnInit {
  @Input() cxStylingDirective: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.insjectStyle();
  }

  private insjectStyle(): void {
    const styleElement = this.renderer.createElement('style');
    const styleValue = this.renderer.createText(
      `@import url(styles/${this.cxStylingDirective}.css);`
    );

    this.renderer.appendChild(styleElement, styleValue);
    this.renderer.appendChild(this.el.nativeElement.parentNode, styleElement);
  }
}
