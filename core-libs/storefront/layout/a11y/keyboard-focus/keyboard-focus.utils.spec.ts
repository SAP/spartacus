import {
  disableTabbingForTick,
  handleLinearKeydown,
} from './keyboard-focus.utils';

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

describe('handleLinearKeydown', () => {
  let items: HTMLElement[];
  let options: {
    onNext: ReturnType<typeof vi.fn>;
    onPrevious: ReturnType<typeof vi.fn>;
    onFirst: ReturnType<typeof vi.fn>;
    onLast: ReturnType<typeof vi.fn>;
    onActivate: ReturnType<typeof vi.fn>;
  };

  const fire = (key: string, index: number) => {
    const event = new KeyboardEvent('keydown', { key, cancelable: true });
    handleLinearKeydown(event, index, items, options);
    return event;
  };

  beforeEach(() => {
    items = Array.from({ length: 3 }, () => document.createElement('div'));
    options = {
      onNext: vi.fn(),
      onPrevious: vi.fn(),
      onFirst: vi.fn(),
      onLast: vi.fn(),
      onActivate: vi.fn(),
    };
  });

  describe('ArrowDown', () => {
    it('calls onNext with next index and prevents default', () => {
      const event = fire('ArrowDown', 0);
      expect(options.onNext).toHaveBeenCalledWith(1);
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not call onNext at the last item but still prevents default', () => {
      const event = fire('ArrowDown', 2);
      expect(options.onNext).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('ArrowUp', () => {
    it('calls onPrevious with previous index and prevents default', () => {
      const event = fire('ArrowUp', 2);
      expect(options.onPrevious).toHaveBeenCalledWith(1);
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not call onPrevious at the first item but still prevents default', () => {
      const event = fire('ArrowUp', 0);
      expect(options.onPrevious).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('Home', () => {
    it('calls onFirst and prevents default', () => {
      const event = fire('Home', 2);
      expect(options.onFirst).toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('End', () => {
    it('calls onLast and prevents default', () => {
      const event = fire('End', 0);
      expect(options.onLast).toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('Enter / Space', () => {
    it('calls onActivate on Enter and prevents default', () => {
      const event = fire('Enter', 1);
      expect(options.onActivate).toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it('calls onActivate on Space and prevents default', () => {
      const event = fire(' ', 1);
      expect(options.onActivate).toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not prevent default when onActivate is not provided', () => {
      const { onActivate: _omit, ...noActivate } = options;
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        cancelable: true,
      });
      handleLinearKeydown(event, 1, items, noActivate);
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe('unhandled keys', () => {
    it('does not prevent default for unrelated keys', () => {
      const event = fire('Tab', 1);
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
