import { Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';

/*
 * Supplements the anchor links that contain only the hash fragment in the `href` attribute,
 * (e.g. `<a href="#someId">`), by prepending the current location (path and query params),
 * so it becomes a link to a full url
 * e.g. `<a href="https://domain.com/current/path?and=query-params#someId">`.
 *
 * This helps to avoid the undesirable navigation to the homepage URL (`/#someId`)
 * when clicking the original link.
 *
 * It's useful for example for cms-provided content passed to the [innerHTML] directive.
 */
@Pipe({ name: 'cxSupplementHashAnchors' })
export class SupplementHashAnchorsPipe implements PipeTransform {
  constructor(protected renderer: Renderer2, protected winRef: WindowRef) {}

  protected getPath(anchorId: string): string {
    const currentUrlWithoutFragment = this.winRef.location.href.replace(
      /#.*$/,
      ''
    );
    return `${currentUrlWithoutFragment}${anchorId}`;
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
