import { TestBed } from '@angular/core/testing';

import { PendingTasks } from '@angular/core';
import { Priority } from '@spartacus/core';
import { DefaultComponentHandler } from '@spartacus/storefront';
import { lastValueFrom, of } from 'rxjs';
import { LazyComponentHandler } from './lazy-component.handler';

class MockDefaultComponentHandler {
  launcher = vi.fn().mockReturnValue(of({}));
}

describe('LazyComponentHandler', () => {
  let service: LazyComponentHandler;
  let mockRemoveTask: ReturnType<typeof vi.fn>;
  let mockPendingTasks: { add: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRemoveTask = vi.fn();
    mockPendingTasks = { add: vi.fn().mockReturnValue(mockRemoveTask) };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DefaultComponentHandler,
          useClass: MockDefaultComponentHandler,
        },
        { provide: PendingTasks, useValue: mockPendingTasks },
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
      await lastValueFrom(
        service.launcher({ component: mapping }, undefined, undefined)
      );

      const defaultHandler = TestBed.inject(DefaultComponentHandler);

      expect(defaultHandler.launcher).toHaveBeenCalledWith(
        { component: resolvedComponent },
        undefined,
        undefined,
        undefined
      );
    });

    it('should not add a pending task before subscribe', () => {
      const mapping = () => Promise.resolve('component');
      service.launcher({ component: mapping }, undefined, undefined);
      expect(mockPendingTasks.add).not.toHaveBeenCalled();
    });

    it('should add a pending task on subscribe', async () => {
      const mapping = () => Promise.resolve('component');
      await lastValueFrom(
        service.launcher({ component: mapping }, undefined, undefined)
      );
      expect(mockPendingTasks.add).toHaveBeenCalled();
    });

    it('should remove the pending task after import resolves', async () => {
      const mapping = () => Promise.resolve('component');
      await lastValueFrom(
        service.launcher({ component: mapping }, undefined, undefined)
      );
      expect(mockRemoveTask).toHaveBeenCalled();
    });

    it('should remove the pending task on import error', async () => {
      const mapping = () => Promise.reject(new Error('load failed'));
      await lastValueFrom(
        service.launcher({ component: mapping }, undefined, undefined)
      ).catch(() => {});
      expect(mockRemoveTask).toHaveBeenCalled();
    });

    it('should remove the pending task on unsubscribe', () => {
      let resolveImport!: (v: any) => void;
      const mapping = () => new Promise((res) => { resolveImport = res; });
      const sub = service
        .launcher({ component: mapping }, undefined, undefined)
        .subscribe();
      expect(mockRemoveTask).not.toHaveBeenCalled();
      sub.unsubscribe();
      expect(mockRemoveTask).toHaveBeenCalled();
    });
  });
});
