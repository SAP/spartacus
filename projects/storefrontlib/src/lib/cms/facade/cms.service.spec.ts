import { TestBed, inject } from '@angular/core/testing';
import { CmsService } from './cms.service';
import { Store } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import * as fromStore from '../store';

describe('CmsService', () => {
  const MockStore = {
    select: createSpy('select').and.returnValue(of(undefined)),
    dispatch: createSpy('dispatch')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsService, { provide: Store, useValue: MockStore }]
    });
  });

  it('should be created', inject([CmsService], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));

  it('getComponentData should call the store and trigger component load', inject(
    [CmsService],
    (service: CmsService) => {
      const testUid = 'test_uid';

      const data$ = service.getComponentData(testUid);
      expect(MockStore.select).toHaveBeenCalled();

      data$.subscribe(() => {});
      expect(MockStore.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadComponent(testUid)
      );
    }
  ));
});
