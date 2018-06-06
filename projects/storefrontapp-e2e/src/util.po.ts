import {
  browser,
  element,
  by,
  ElementArrayFinder,
  ElementFinder
} from 'protractor';
import { print } from 'util';

export class E2EUtil {
  /**
   * Get a cms component given the component selector name.
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   */
  static getComponent(componentSelector: string) {
    return element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component selector name.
   * @param slotPosition position for the slot that holds the component
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the component found
   */
  static getComponentWithinDynamicSlot(
    slotPosition: string,
    componentSelector: string
  ): ElementFinder {
    const parent = element(by.css(`y-dynamic-slot[position=${slotPosition}]`));
    return parent.element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component selector name.
   * @param parentSelector An id to be used to search the parent
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the component found
   */
  static getComponentWithinParent(
    parent: ElementFinder,
    componentSelector: string
  ): ElementFinder {
    return parent.element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component css identifier.
   * @param parentSelector An id to be used to search the parent
   * @param componentCss The css declared on the component (used to identify the element)
   * @returns the component found
   */
  static getComponentWithinParentByCss(
    parent: ElementFinder,
    componentCss: string
  ): ElementFinder {
    return parent.element(by.css(componentCss));
  }

  /**
   * Get all matching cms components with a given selector inside a parent element.
   * @param parentSelector An id to be used to search the parent
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the array of elements that matches the search
   */
  static getComponentsWithinParent(
    parentSelector: string,
    componentSelector: string
  ): ElementArrayFinder {
    const parent = element(by.css(parentSelector));

    const components = parent.all(by.tagName(componentSelector));
    return components;
  }
}
