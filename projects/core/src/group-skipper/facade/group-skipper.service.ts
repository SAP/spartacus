import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class GroupSkipperService {
  constructor() {}

  renderAnchor(
    element: Element,
    renderer: Renderer2,
    uid: string,
    title: string
  ): void {
    const anchor: Element = renderer.createElement('a');
    anchor.setAttribute('tabindex', '0');
    anchor.setAttribute('href', `#${uid}`);
    anchor.textContent = `Skip to ${title}`;
    const groupSkipperEl: Element = element.ownerDocument
      .getElementsByTagName('cx-group-skipper')
      .item(0);
    renderer.appendChild(groupSkipperEl, anchor);
  }
}
