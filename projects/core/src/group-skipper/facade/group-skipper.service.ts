import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class GroupSkipperService {
  constructor() {}

  renderAnchor(element: Element, renderer: Renderer2): void {
    const anchor: Element = renderer.createElement('a');
    anchor.setAttribute('tabindex', '0');
    anchor.textContent = `Skip to Component ${Math.round(
      Math.random() * 1000
    )}`;
    const groupSkipperEl: Element = element.ownerDocument
      .getElementsByTagName('cx-group-skipper')
      .item(0);
    renderer.appendChild(groupSkipperEl, anchor);
  }
}
