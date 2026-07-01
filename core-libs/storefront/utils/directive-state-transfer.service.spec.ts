import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DirectiveStateTransferService } from './directive-state-transfer.service';

const key = 'key';
const attributeName = `data-${key}`;
const value = 'value';

describe('DirectiveStateTransferService', () => {
  let service: DirectiveStateTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();

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

  describe('clear()', () => {
    it('should remove the data attribute from input element', () => {
      const element = document.createElement('div');
      element.setAttribute(attributeName, value);

      service.clear(element, key);

      expect(element.hasAttribute(attributeName)).toBe(false);
    });
  });
});
