import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { afterNextRender } from '@angular/core';

@Directive({
  selector: '[cxSafeInnerHtml]',
  standalone: false
})
export class SafeInnerHtmlDirective {
  @Input('cxSafeInnerHtml') htmlContent: string | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
      afterNextRender(() => {
        // Remove all child nodes to avoid hydration mismatch
        while (this.el.nativeElement.firstChild) {
          this.el.nativeElement.removeChild(this.el.nativeElement.firstChild);
        }
        // Create a temporary container to parse the HTML
        if (this.htmlContent) {
          const temp = document.createElement('div');
          temp.innerHTML = this.htmlContent;
          // Move parsed nodes into the element
          Array.from(temp.childNodes).forEach(node => {
            this.renderer.appendChild(this.el.nativeElement, node);
          });
        }
      });
  }
}
