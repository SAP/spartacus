import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { CurrentItemService } from './current-item.service';

const mockCode = 'code1';
const PARAM = 'myParam';

const mockParams = new Subject();

class MockRoutingService {
  getParams() {
    return mockParams;
  }

  go() {}
}

interface Mock {
  code?: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
class MockCurrentService extends CurrentItemService<Mock> {
  getParamKey(): string {
    return PARAM;
  }

  // we make these public for easy testing
  getItem(..._params: any[]): Observable<Mock> {
    return of({});
  }

  getError(): Observable<boolean> {
    return of(false);
  }
}

describe('CurrentItemService', () => {
  let service: MockCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockCurrentService,
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(MockCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('b2bUnit$', () => {
    it('should resolve b2bUnit from route parameter', () => {
      let result;
      service.b2bUnit$.subscribe((value) => (result = value));
      mockParams.next({ unitCode: 'unit1' });
      expect(result).toEqual('unit1');
    });

    it('should resolve b2bUnit among other route parameters', () => {
      let result;
      service.b2bUnit$.subscribe((value) => (result = value));
      mockParams.next({ unitCode: 'unit2', foo: 'bar' });
      expect(result).toEqual('unit2');
    });

    it('should resolve b2bUnit from route parameter', () => {
      let result;
      service.b2bUnit$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(result).toBeFalsy();
    });
  });

  describe('code$', () => {
    it('should emit code for route parameter', async () => {
      let result;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from route parameters', async () => {
      let result;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      mockParams.next({ bar: 'foo' });
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from route parameters', async () => {
      let result;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar', [PARAM]: 'code1', bar: 'foo' });
      expect(result).toEqual('code1');
    });

    it('should not emit code from route parameters', async () => {
      let result: string;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(result).toBeFalsy();
    });

    it('should no longer emit code from route parameters', async () => {
      let result: string;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      mockParams.next({});
      expect(result).toBeFalsy();
    });

    it('should emit next code from route parameters', async () => {
      let result: string;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({});
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from next route parameters', async () => {
      let result: string;
      service.key$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      mockParams.next({ [PARAM]: 'code2' });
      expect(result).toEqual('code2');
    });

    it('should not emit code when route parameter did not change', () => {
      const results = [];
      service.key$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', [PARAM]: 'code' });
      mockParams.next({ name: 'name2', [PARAM]: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should call getModel() with route parameter', () => {
      const mockBudget = { name: 'test cost center' };
      spyOn(service, 'getItem').and.returnValue(of(mockBudget));

      let result;
      service.item$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      expect(service.getItem).toHaveBeenCalledWith('123');
      expect(result).toBe(mockBudget);
    });

    it('should not call getModel() with route parameter', () => {
      spyOn(service, 'getItem');

      let result;
      service.item$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(service.getItem).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });

    it('should resolve model', () => {
      spyOn(service, 'getItem').and.returnValue(
        of({
          code: mockCode,
          name: 'I am a mock',
        })
      );

      let result: Mock;
      service.item$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      expect(result.code).toBe(mockCode);
      expect(result.name).toBe('I am a mock');
    });

    it('should no longer resolve model', () => {
      spyOn(service, 'getItem').and.returnValue(
        of({
          code: mockCode,
          name: 'I am a mock',
        })
      );

      let result: Mock;
      service.item$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      mockParams.next({ foo: 'bar' });
      expect(result).toBe(null);
    });
  });
});
