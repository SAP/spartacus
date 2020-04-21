import { TestBed } from '@angular/core/testing';

import { LazyComponentHandler } from './lazy-component.handler';
import { Priority } from '@spartacus/core';

describe('LazyComponentHandler', () => {
  let service: LazyComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyComponentHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMatch', () => {
    it('should match function', () => {
      expect(service.hasMatch({ component: () => {} })).toBeTruthy();
    });

    it('should not match class', () => {
      class TestClass {}
      expect(service.hasMatch({ component: TestClass })).toBeFalsy();
    });
  });

  describe('getPriority', () => {
    it('should return Priority.LOW', () => {
      expect(service.getPriority()).toBe(Priority.LOW);
    });
  });
});
