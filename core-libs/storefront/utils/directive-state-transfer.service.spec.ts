import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { DirectiveStateTransferService } from './directive-state-transfer.service';

const key = 'key';
const attributeName = `data-cx-state-transfer-${key}`;
const value = 'value';

class MockWindowRef implements Partial<WindowRef> {
  isBrowser(): boolean {
    return true;
  }
}

describe('DirectiveStateTransferService', () => {
  let service: DirectiveStateTransferService;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [{ provide: WindowRef, useClass: MockWindowRef }],
    }).compileComponents();
    windowRef = TestBed.inject(WindowRef);

    service = TestBed.inject(DirectiveStateTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should apply data attribute to input element', () => {
      const element = document.createElement('div');
      element.setAttribute(attributeName, value);

      const actual = service.get(element, key);

      expect(actual).toEqual(value);
    });
  });

  describe('set()', () => {
    describe('when in a browser', () => {
      it('should not change the input element', () => {
        const element = document.createElement('div');

        service.set(element, key, value);

        expect(element.hasAttribute(attributeName)).toEqual(false);
      });
    });

    describe('when in SSR', () => {
      beforeEach(() => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
      });

      it('should apply data attribute to input element', () => {
        const element = document.createElement('div');

        service.set(element, key, value);

        expect(element.getAttribute(attributeName)).toEqual(value);
      });

      it('should throw an error on invalid keys', () => {
        const element = document.createElement('div');
        const invalidKey = 'spaces not valid';

        expect(() => service.set(element, invalidKey, value)).toThrow();
      });
    });
  });

  describe('clear()', () => {
    describe('when in a browser', () => {
      it('should not remove the data attribute from input element', () => {
        const element = document.createElement('div');
        element.setAttribute(attributeName, value);

        service.clear(element, key);

        expect(element.hasAttribute(attributeName)).toBe(true);
      });
    });

    describe('when in SSR', () => {
      beforeEach(() => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
      });

      it('should remove the data attribute from input element', () => {
        const element = document.createElement('div');
        element.setAttribute(attributeName, value);

        service.clear(element, key);

        expect(element.hasAttribute(attributeName)).toBe(false);
      });
    });
  });
});
