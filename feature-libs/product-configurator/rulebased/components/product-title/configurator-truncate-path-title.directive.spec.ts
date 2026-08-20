import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import {
  ConfiguratorTruncatePathTitleDirective,
  truncatePathTitle,
} from './configurator-truncate-path-title.directive';

const FULL_TITLE =
  'Configurable Train / Configurable Wagon / Configurable Wagon Cabin';
const LAST_SEGMENT = 'Configurable Wagon Cabin';
const TRUNCATED_LAST = '... / ' + LAST_SEGMENT;
const TRUNCATED_LAST_TWO =
  '... / Configurable Wagon / Configurable Wagon Cabin';

describe('truncatePathTitle', () => {
  const measureByLength = (text: string): number => text.length * 10;

  it('should return the full title when it fits', () => {
    expect(truncatePathTitle(FULL_TITLE, 1000, measureByLength)).toBe(
      FULL_TITLE
    );
  });

  it('should return the full title when max width is not positive', () => {
    expect(truncatePathTitle(FULL_TITLE, 0, measureByLength)).toBe(FULL_TITLE);
  });

  it('should return an empty title unchanged', () => {
    expect(truncatePathTitle('', 50, measureByLength)).toBe('');
  });

  it('should keep a single-segment title even when it does not fit', () => {
    expect(truncatePathTitle(LAST_SEGMENT, 20, measureByLength)).toBe(
      LAST_SEGMENT
    );
  });

  it('should drop leading segments down to the last product name', () => {
    expect(truncatePathTitle(FULL_TITLE, 350, measureByLength)).toBe(
      TRUNCATED_LAST
    );
  });

  it('should keep as many trailing segments as fit', () => {
    expect(truncatePathTitle(FULL_TITLE, 520, measureByLength)).toBe(
      TRUNCATED_LAST_TWO
    );
  });

  it('should return the last-segment form when even that is too wide', () => {
    expect(truncatePathTitle(FULL_TITLE, 10, measureByLength)).toBe(
      TRUNCATED_LAST
    );
  });
});

@Component({
  template: `<span [cxConfiguratorTruncatePathTitle]="title"></span>`,
  imports: [ConfiguratorTruncatePathTitleDirective],
})
class TestComponent {
  title: string | undefined = FULL_TITLE;
}

describe('ConfiguratorTruncatePathTitleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: ConfiguratorTruncatePathTitleDirective;
  let span: HTMLElement;
  let windowRef: WindowRef;

  function instantiate(): void {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    const debugEl = fixture.debugElement.query(
      By.directive(ConfiguratorTruncatePathTitleDirective)
    );
    directive = debugEl.injector.get(ConfiguratorTruncatePathTitleDirective);
    span = debugEl.nativeElement;
    span.style.display = 'block';
    span.style.overflow = 'hidden';
    span.style.whiteSpace = 'nowrap';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorTruncatePathTitleDirective, TestComponent],
    });
    windowRef = TestBed.inject(WindowRef);
  });

  describe('in the browser', () => {
    beforeEach(() => {
      instantiate();
      fixture.detectChanges();
    });

    it('should truncate leading path segments when the host is too narrow', () => {
      span.style.width = '80px';
      directive['updateTitle']();

      expect(span.textContent).toBe(TRUNCATED_LAST);
    });

    it('should show the full title when it fits', () => {
      span.style.width = '2000px';
      directive['updateTitle']();

      expect(span.textContent).toBe(FULL_TITLE);
    });

    it('should update the displayed title when the input changes', () => {
      span.style.width = '2000px';
      component.title = LAST_SEGMENT;
      fixture.detectChanges();
      directive['updateTitle']();

      expect(span.textContent).toBe(LAST_SEGMENT);
    });

    it('should treat a missing title as empty', () => {
      component.title = undefined;
      fixture.detectChanges();

      expect(span.textContent).toBe('');
    });

    it('should disconnect the resize observer on destroy', () => {
      const observer = directive['resizeObserver'];
      expect(observer).toBeDefined();
      const disconnectSpy = spyOn(observer as ResizeObserver, 'disconnect');

      fixture.destroy();

      expect(disconnectSpy).toHaveBeenCalled();
      expect(directive['resizeObserver']).toBeUndefined();
    });
  });

  describe('when not in the browser', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      instantiate();
      fixture.detectChanges();
    });

    it('should render the full title without a resize observer', () => {
      expect(span.textContent).toBe(FULL_TITLE);
      expect(directive['resizeObserver']).toBeUndefined();
    });

    it('should not throw when destroyed without a resize observer', () => {
      expect(() => fixture.destroy()).not.toThrow();
      expect(directive['resizeObserver']).toBeUndefined();
    });
  });

  describe('when ResizeObserver is unavailable', () => {
    let originalResizeObserver: typeof globalThis.ResizeObserver;

    beforeEach(() => {
      originalResizeObserver = globalThis.ResizeObserver;
      (
        globalThis as { ResizeObserver?: typeof globalThis.ResizeObserver }
      ).ResizeObserver = undefined;
      instantiate();
      fixture.detectChanges();
    });

    afterEach(() => {
      globalThis.ResizeObserver = originalResizeObserver;
    });

    it('should not start a resize observer', () => {
      expect(directive['resizeObserver']).toBeUndefined();
    });
  });
});
