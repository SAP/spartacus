import { Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';

/* Enriches anchor links with the current location (path and query params).
 * Useful for cms-provided content injected via innerHTML.
 */
@Pipe({ name: 'cxSupplementHashAnchors' })
export class SupplementHashAnchorsPipe implements PipeTransform {
  constructor(protected renderer: Renderer2, protected winRef: WindowRef) {}

  protected getPath(anchorId: string): string {
    const { pathname, search } = this.winRef.location;
    return `${pathname}${search}${anchorId}`;
  }

  public transform(html: string): string {
    const template = this.renderer.createElement('template');
    template.innerHTML = html.trim();
    const linkNodes: NodeList = template.content.querySelectorAll('a');

    Array.from(linkNodes).forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href?.indexOf('#') === 0) {
        this.renderer.setProperty(link, 'href', this.getPath(href));
      }
    });
    return template.innerHTML;
  }
}
