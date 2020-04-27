import { Injectable } from '@angular/core';
import { AutoFocusConfig } from '../keyboard-focus.model';

@Injectable({
  providedIn: 'root',
})
export class SelectFocusUtility {
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
    'textarea',
  ];

  // like to leave out the following as we don't use it, and make this list exensible.
  //   `[contentEditable=true]`, // very unlikely to suport as we're not a business tool
  //   `iframe`, // we really don't like iframes...
  //   `area[href]`, // very debatable!

  protected focusableSelectorSuffix = ':not([disabled]):not([hidden])';

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
      this.query(host, selector).find((el) => !this.isHidden(el)) ||
      this.findFocusable(host).find((el) => Boolean(el))
    );
  }

  /**
   * returns all focusable child elements of the host element. The element selectors
   * are build from the `focusableSelectors`.
   *
   * @param host the `HTMLElement` used to query focusable elements
   * @param locked indicates whether inactive (`tabindex="-1"`) focusable elements should be returned
   * @param invisible indicates whether hidden focusable elements should be returned
   */
  findFocusable(
    host: HTMLElement,
    locked = false,
    invisible = false
  ): HTMLElement[] {
    let suffix = this.focusableSelectorSuffix;
    if (!locked) {
      suffix += `:not([tabindex='-1'])`;
    }
    const selector = this.focusableSelectors
      .map((s) => (s += suffix))
      .join(',');
    return this.query(host, selector).filter((el) =>
      !invisible ? !this.isHidden(el) : Boolean(el)
    );
  }

  /**
   * Indicates whether the element is hidden by CSS. There are various CSS rules and
   * HTML structures which can lead to an hidden or invisible element. An `offsetParent`
   * of null indicates that the element or any of it's decendants is hidden (`display:none`).
   *
   * Oother techniques use the visibility (`visibility: hidden`), opacity (`opacity`) or
   * phyisical location on the element itself or any of it's anchestor elements. Those
   * technique require to work with the _computed styles_, which will cause a performance
   * downgrade. We don't do this in the standard implementaton.
   */
  protected isHidden(el: HTMLElement): boolean {
    return el.offsetParent === null;
  }
}
