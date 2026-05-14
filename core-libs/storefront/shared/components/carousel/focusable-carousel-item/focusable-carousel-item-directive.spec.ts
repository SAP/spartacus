import { FocusableCarouselItemDirective } from './focusable-carousel-item.directive';
import { LoggerService } from '@spartacus/core';
import { ElementRef } from '@angular/core';
const createSpy = jasmine.createSpy;

describe('FocusableCarouselItemDirective', () => {
  let directive: FocusableCarouselItemDirective;
  let mockLogger: LoggerService;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockLogger = {
      warn: createSpy(),
    } as unknown as LoggerService;

    mockElementRef = {
      nativeElement: document.createElement('div'),
    };

    directive = new FocusableCarouselItemDirective(mockLogger, mockElementRef);
  });

  it('should warn if element cannot receive focus in dev mode', () => {
    const element = document.createElement('div');
    mockElementRef.nativeElement = element;

    directive = new FocusableCarouselItemDirective(mockLogger, mockElementRef);

    expect(mockLogger.warn).toHaveBeenCalled();
  });

  it('should detect if element is focusable', () => {
    mockElementRef.nativeElement = document.createElement('input');
    directive = new FocusableCarouselItemDirective(mockLogger, mockElementRef);

    expect(directive['canElementReceiveFocus']()).toBeTruthy();
  });

  it('should detect if non-focusable element with non-negative tabindex is focusable', () => {
    const element = document.createElement('div');
    element.setAttribute('tabindex', '0');
    mockElementRef.nativeElement = element;

    directive = new FocusableCarouselItemDirective(mockLogger, mockElementRef);

    expect(directive['canElementReceiveFocus']()).toBeTruthy();
  });

  it('should detect disabled element as not focusable', () => {
    const element = document.createElement('input');
    element.setAttribute('disabled', '');
    mockElementRef.nativeElement = element;

    directive = new FocusableCarouselItemDirective(mockLogger, mockElementRef);

    expect(directive['canElementReceiveFocus']()).toBeFalsy();
  });
});
