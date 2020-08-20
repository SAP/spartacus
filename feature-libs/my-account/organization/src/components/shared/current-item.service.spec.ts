import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { RouterState, RoutingService } from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { CurrentItemService } from './current-item.service';

const mockCode = 'b1';
const PARAM = 'myParam';

const mockParams = new Subject();
const mockState = new Subject();

class MockRoutingService {
  getRouterState() {
    return mockState;
  }

  getParams() {
    return mockParams;
  }

  go() {}
}

export interface Mock {
  code?: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
class MockCurrentService extends CurrentItemService<Mock> {
  getParam(): string {
    return PARAM;
  }

  // we make these public for easy testing
  getModel(..._params: any[]): Observable<Mock> {
    return of({});
  }
}

describe('CurrentItemService', () => {
  let service: MockCurrentService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockCurrentService,
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(MockCurrentService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parentUnit$', () => {
    it('should resolve parentUnit from  query parameters', () => {
      let result;
      service.parentUnit$.subscribe((unit) => (result = unit));
      mockState.next({
        state: {
          queryParams: {
            parentUnit: 'ppp',
          } as Params,
        },
      } as RouterState);
      expect(result).toEqual('ppp');
    });

    it('should not resolve parentUnit from query parameters', () => {
      mockState.next({
        state: {
          queryParams: {
            foo: 'bar',
          } as Params,
        },
      } as RouterState);
      let result;
      service.parentUnit$.subscribe((unit) => (result = unit));
      expect(result).toBeFalsy();
    });
  });

  describe('code$', () => {
    it('should emit code for route parameter', async () => {
      let result;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from route parameters', async () => {
      let result;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      mockParams.next({ bar: 'foo' });
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from route parameters', async () => {
      let result;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar', [PARAM]: 'code1', bar: 'foo' });
      expect(result).toEqual('code1');
    });

    it('should not emit code from route parameters', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(result).toBeFalsy();
    });

    it('should no longer emit code from route parameters', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      mockParams.next({});
      expect(result).toBeFalsy();
    });

    it('should emit next code from route parameters', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({});
      mockParams.next({ [PARAM]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit code from next route parameters', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: 'code1' });
      mockParams.next({ [PARAM]: 'code2' });
      expect(result).toEqual('code2');
    });

    it('should not emit code when route parameter did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', [PARAM]: 'code' });
      mockParams.next({ name: 'name2', [PARAM]: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should call getModel() with route parameter', () => {
      const mockBudget = { name: 'test cost center' };
      spyOn(service, 'getModel').and.returnValue(of(mockBudget));

      let result;
      service.model$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      expect(service.getModel).toHaveBeenCalledWith('123');
      expect(result).toBe(mockBudget);
    });

    it('should not call getModel() with route parameter', () => {
      spyOn(service, 'getModel');

      let result;
      service.model$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(service.getModel).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });

    it('should resolve model', () => {
      spyOn(service, 'getModel').and.returnValue(
        of({
          code: mockCode,
          name: 'I am a mock',
        })
      );

      let result: Mock;
      service.model$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      expect(result.code).toBe(mockCode);
      expect(result.name).toBe('I am a mock');
    });

    it('should no longer resolve model', () => {
      spyOn(service, 'getModel').and.returnValue(
        of({
          code: mockCode,
          name: 'I am a mock',
        })
      );

      let result: Mock;
      service.model$.subscribe((value) => (result = value));
      mockParams.next({ [PARAM]: '123' });
      mockParams.next({ foo: 'bar' });
      expect(result).toBe(null);
    });
  });

  describe('launch', () => {
    it('should launch route with route params', () => {
      spyOn(routingService, 'go');
      service.launch('budgetDetails', { code: '123' });
      expect(routingService.go).toHaveBeenCalled();
    });
  });
});
