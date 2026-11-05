import { disableTabbingForTick } from './keyboard-focus.utils';

describe('disableTabbingForTick', () => {
  let elements: HTMLElement[];

  beforeEach(() => {
    vi.useFakeTimers();
    elements = [document.createElement('div'), document.createElement('div')];
    elements.forEach((el) => document.body.appendChild(el));
  });

  afterEach(async () => {
    await vi.runAllTimersAsync();
    vi.useRealTimers();
    elements.forEach((el) => document.body.removeChild(el));
  });

  it('should set tabIndex to -1 for each element', () => {
    disableTabbingForTick(elements);
    elements.forEach((el) => {
      expect(el.tabIndex).toBe(-1);
    });
  });

  it('should reset tabIndex to 0 after a tick', async () => {
    disableTabbingForTick(elements);
    await vi.runAllTimersAsync();
    elements.forEach((el) => {
      expect(el.tabIndex).toBe(0);
    });
  });
});
