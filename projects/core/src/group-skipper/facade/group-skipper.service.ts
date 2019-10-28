import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class GroupSkipperService {
  constructor() {}

  renderAnchor(renderer: Renderer2, element: HTMLElement, title: string): void {
    renderer.setAttribute(element, 'tabindex', '-1');

    const anchor: Element = renderer.createElement(`a`);
    anchor.setAttribute('tabindex', '0');
    anchor.textContent = `Skip to ${title}`;
    this.addListeners(anchor, element);

    setTimeout(() => {
      const groupSkipperEl: Element = element.ownerDocument
        .getElementsByTagName('cx-group-skipper')
        .item(0);
      renderer.appendChild(groupSkipperEl, anchor);
    }, 1000);
  }

  private addListeners(anchor: Element, skipToEl: HTMLElement) {
    anchor.addEventListener('click', (e: MouseEvent) => {
      this.skipToElementEvent(e, skipToEl);
    });
    anchor.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.skipToElementEvent(e, skipToEl);
      }
    });
  }

  private skipToElementEvent(event: Event, element: HTMLElement) {
    event.preventDefault();
    element.focus();
  }
}
