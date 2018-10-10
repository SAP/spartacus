import { TestBed, inject } from '@angular/core/testing';
import { CmsService } from './cms.service';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import * as fromStore from '../store';
import * as NgrxStore from '@ngrx/store';
import { of } from 'rxjs';

describe('CmsService', () => {
  let store;
  const mockSelect = createSpy('select').and.returnValue(() => of(undefined));

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [CmsService]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', inject([CmsService], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));

  it('getComponentData should call the store and trigger component load', inject(
    [CmsService],
    (service: CmsService) => {
      const testUid = 'test_uid';

      service.getComponentData(testUid).subscribe(() => {});

      expect(mockSelect).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadComponent(testUid)
      );
    }
  ));
});
