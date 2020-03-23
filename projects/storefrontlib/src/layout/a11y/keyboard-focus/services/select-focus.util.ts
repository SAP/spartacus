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

  /**
   * Returns the first visible focusable element of the host element. The focusable
   * element is queried based on the given `AutoFocusConfig`:
   * - a specific autofocus _selector_ is given (i.e. `{autofocus: 'button[submit]'}`)
   * - a focusable element that uses the native _autofocus_ attribute
   * - the first focusuable child element
   *
   * The visibility of the focusable child elements is only restricted by `display:none` of
   * the element or an of it's parents.
   */
  findFirstFocusable(
    host: HTMLElement,
    config: AutoFocusConfig = { autofocus: true }
  ): HTMLElement {
    const selector =
      typeof config?.autofocus === 'string' ? config.autofocus : '[autofocus]';
    return (
      this.query(host, selector).find(el => !this.isHidden(el)) ||
      this.findFocusable(host).find(el => Boolean(el))
    );
  }

  /**
   * Returns all visible focusable child elements of the host element. The element selectors
   * are build from the `focusableSelectors`.
   *
   * The visibility of the focusable child elements is only restricted by `display:none` of
   * the element or an of it's parents.
   *
   * @param host the `HTMLElement` used to query focusable elements
   * @param locked indicates whether inactive (`tabindex="-1"`) focusable elements should be returend as well
   */
  findFocusable(host: HTMLElement, locked = false): HTMLElement[] {
    let suffix = this.focusableSelectorSuffix;
    if (!locked) {
      suffix += `:not([tabindex='-1'])`;
    }
    const selector = this.focusableSelectors.map(s => (s += suffix)).join(',');
    return this.query(host, selector).filter(el => !this.isHidden(el));
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
