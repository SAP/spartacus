export const focusableSelectors = [
  `a[href]:not([tabindex='-1'])`,
  `area[href]:not([tabindex='-1'])`,
  `input:not([disabled]):not([tabindex='-1'])`,
  `select:not([disabled]):not([tabindex='-1'])`,
  `textarea:not([disabled]):not([tabindex='-1'])`,
  `button:not([disabled]):not([tabindex='-1'])`,
  `iframe:not([tabindex='-1'])`,
  `[tabindex]:not([tabindex='-1'])`,
  `[contentEditable=true]:not([tabindex='-1'])`,
];

export function getNextFocusableElement(
  elements: HTMLElement[],
  activeElementIndex: number
): HTMLElement {
  return activeElementIndex + 1 <= elements.length
    ? elements[activeElementIndex + 1]
    : elements[0];
}
