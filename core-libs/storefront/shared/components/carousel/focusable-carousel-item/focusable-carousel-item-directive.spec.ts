import { FocusableCarouselItemDirective } from './focusable-carousel-item.directive';
import { LoggerService } from '@spartacus/core';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
const createSpy = vi.fn;

describe('FocusableCarouselItemDirective', () => {
  let directive: FocusableCarouselItemDirective;
  let mockLogger: LoggerService;
  let mockElementRef: ElementRef;

  function createDirective(): FocusableCarouselItemDirective {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        FocusableCarouselItemDirective,
        { provide: LoggerService, useValue: mockLogger },
        { provide: ElementRef, useValue: mockElementRef },
      ],
    });
    return TestBed.inject(FocusableCarouselItemDirective);
  }

  beforeEach(() => {
    mockLogger = {
      warn: createSpy(),
    } as unknown as LoggerService;

    mockElementRef = {
      nativeElement: document.createElement('div'),
    };

    directive = createDirective();
  });

  it('should warn if element cannot receive focus in dev mode', () => {
    const element = document.createElement('div');
    mockElementRef.nativeElement = element;

    directive = createDirective();

    expect(mockLogger.warn).toHaveBeenCalled();
  });

  it('should detect if element is focusable', () => {
    mockElementRef.nativeElement = document.createElement('input');
    directive = createDirective();

    expect(directive['canElementReceiveFocus']()).toBeTruthy();
  });

  it('should detect if non-focusable element with non-negative tabindex is focusable', () => {
    const element = document.createElement('div');
    element.setAttribute('tabindex', '0');
    mockElementRef.nativeElement = element;

    directive = createDirective();

    expect(directive['canElementReceiveFocus']()).toBeTruthy();
  });

  it('should detect disabled element as not focusable', () => {
    const element = document.createElement('input');
    element.setAttribute('disabled', '');
    mockElementRef.nativeElement = element;

    directive = createDirective();

    expect(directive['canElementReceiveFocus']()).toBeFalsy();
  });
});
