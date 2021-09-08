import { TestBed } from '@angular/core/testing';

import { LazyComponentHandler } from './lazy-component.handler';
import { Priority } from '@spartacus/core';
import { DefaultComponentHandler } from '@spartacus/storefront';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

class MockDefaultComponentHandler {
  launcher = createSpy().and.returnValue(of({}));
}

describe('LazyComponentHandler', () => {
  let service: LazyComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DefaultComponentHandler,
          useClass: MockDefaultComponentHandler,
        },
      ],
    });
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

  describe('launcher', () => {
    it('should resolve component and pass it to standard launcher', async () => {
      const resolvedComponent = 'testData';
      const mapping = () => new Promise((res) => res(resolvedComponent));
      await service
        .launcher({ component: mapping }, undefined, undefined)
        .toPromise();

      const defaultHandler = TestBed.inject(DefaultComponentHandler);

      expect(defaultHandler.launcher).toHaveBeenCalledWith(
        { component: resolvedComponent },
        undefined,
        undefined,
        undefined
      );
    });
  });
});
