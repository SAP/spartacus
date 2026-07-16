import { disableTabbingForTick } from './keyboard-focus.utils';


describe('disableTabbingForTick', () => {
  let elements: HTMLElement[];

  beforeEach(() => {
    elements = [document.createElement('div'), document.createElement('div')];
    elements.forEach((el) => document.body.appendChild(el));
  });

  afterEach(() => {
    elements.forEach((el) => document.body.removeChild(el));
  });

  it('should set tabIndex to -1 for each element', () => {
    disableTabbingForTick(elements);
    elements.forEach((el) => {
      expect(el.tabIndex).toBe(-1);
    });
  });

  it('should reset tabIndex to 0 after a tick', () => {
    vi.useFakeTimers();
    disableTabbingForTick(elements);
    vi.advanceTimersByTime(100);
    elements.forEach((el) => {
      expect(el.tabIndex).toBe(0);
    });
    vi.useRealTimers();
  });
});
