export const focusableSelectors = [
  `a[href]:not([tabindex='-1']):not([hidden])`,
  `area[href]:not([tabindex='-1']):not([hidden])`,
  `input:not([disabled]):not([tabindex='-1']):not([hidden])`,
  `select:not([disabled]):not([tabindex='-1']):not([hidden])`,
  `textarea:not([disabled]):not([tabindex='-1']):not([hidden])`,
  `button:not([disabled]):not([tabindex='-1']):not([hidden])`,
  `iframe:not([tabindex='-1']):not([hidden])`,
  `[tabindex]:not([tabindex='-1']):not([hidden])`,
  `[contentEditable=true]:not([tabindex='-1']):not([hidden])`,
];

export function getNextFocusableElement(
  elements: HTMLElement[],
  activeElementIndex: number
): HTMLElement {
  return activeElementIndex + 1 <= elements.length
    ? elements[activeElementIndex + 1]
    : elements[0];
}

export function getPreviousFocusableElement(
  elements: HTMLElement[],
  activeElementIndex: number
): HTMLElement {
  return activeElementIndex - 1 >= 0
    ? elements[activeElementIndex - 1]
    : elements[elements.length - 1];
}
