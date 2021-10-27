import { Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';

@Pipe({ name: 'cxAnchor' })
export class AnchorPipe implements PipeTransform {
  constructor(
    protected renderer: Renderer2,
    protected sanitizer: DomSanitizer,
    protected routingService: RoutingService
  ) {}

  public transform(html: string): SafeHtml {
    const template = this.renderer.createElement('template');
    template.innerHTML = html.trim();
    const linkNodes: NodeList = template.content.querySelectorAll('a');

    Array.from(linkNodes).forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href?.indexOf('#') === 0) {
        this.renderer.setProperty(
          link,
          'href',
          `${this.routingService.getUrl({})}${href}`
        );
      }
    });
    return this.sanitizer.bypassSecurityTrustHtml(template.innerHTML);
  }
}
