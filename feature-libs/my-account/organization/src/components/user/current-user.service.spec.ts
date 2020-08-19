import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { B2BUser } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { B2BUserService } from '../../core/services/b2b-user.service';
import { CurrentUserService } from './current-user.service';

export class MockB2BUserService implements Partial<B2BUserService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentUserService', () => {
  let service: CurrentUserService;
  let b2bUserService: B2BUserService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentUserService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    });

    b2bUserService = TestBed.inject(B2BUserService);
    service = TestBed.inject(CurrentUserService);
  });

  describe('code$', () => {
    it('should return undefined when route param `code` is undefined', async () => {
      const results = [];
      service.code$.pipe(take(2)).subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should expose route param `code` from activated route', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should not emit when param `code` did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', code: 'code' });
      mockParams.next({ name: 'name2', code: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockUser: B2BUser = { name: 'test cost center' };
      spyOn(b2bUserService, 'get').and.returnValue(of(mockUser));

      let result;
      service.user$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
      expect(b2bUserService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockUser);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(b2bUserService, 'get');

      let result;
      service.user$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(b2bUserService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
