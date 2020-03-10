import { Injectable } from '@angular/core';
import { AutoFocusConfig } from '../keyboard-focus.model';

@Injectable({
  providedIn: 'root',
})
export abstract class SelectFocusUtility {
  /**
   * Query selectors used to query focusable child elements of the host element.
   * The selectors are supplemented with `:not([disabled])` and `:not([hidden])`.
   */
  protected focusableSelectors: string[] = [
    'a[href]',
    'button',
    '[tabindex]',
    'input',
    'select',
    `textarea`,
  ];
  // like to leave out the following as we don't use it, and make this list exensible.
  //   `[contentEditable=true]`, // very unlikely to suport as we're not a business tool
  //   `iframe`, // we really don't like iframes...
  //   `area[href]`, // very debatable!

  query(host: HTMLElement, selector: string): HTMLElement[] {
    if (!selector || selector === '') {
      return [];
    }
    return Array.from(
      host.querySelectorAll(selector) as NodeListOf<HTMLElement>
    );
  }

  findFirstFocusable(
    host: HTMLElement,
    config: AutoFocusConfig = { autofocus: true }
  ): HTMLElement {
    const selector =
      typeof config?.autofocus === 'string' ? config.autofocus : '[autofocus]';

    // fallback to first focusable
    return (
      this.query(host, selector).find(Boolean) ||
      this.findFocusable(host).find(Boolean)
    );
  }

  /**
   * returns all focusable child elements of the host element. The element selectors
   * are build from the `focusableSelectors`.
   *
   * @param host the `HTMLElement` used to query focusable elements
   * @param locked indicates whether inactive (`tabindex="-1"`) focusable elements should be returend as well
   */
  findFocusable(host: HTMLElement, locked = false): HTMLElement[] {
    // TODO: consider dopping the not-hidden
    let suffix = ':not([disabled]):not([hidden])';
    if (!locked) {
      suffix += `:not([tabindex='-1'])`;
    }
    const selector = this.focusableSelectors.map(s => (s += suffix)).join(',');
    return this.query(host, selector);
  }
}
