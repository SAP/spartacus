import { Directive, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[cxStylingDirective]'
})
export class StylingDirective implements OnInit {
  @Input() cxStylingDirective: string[];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    if (this.cxStylingDirective) {
      for (const style of this.cxStylingDirective) {
        this.insjectStyle(style);
      }
    }
  }

  private insjectStyle(path: string): void {
    const styleElement = this.renderer.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.type = 'text/css';
    styleElement.href = `assets/css/${path}.css`;

    this.renderer.appendChild(this.el.nativeElement.parentNode, styleElement);
  }
}
