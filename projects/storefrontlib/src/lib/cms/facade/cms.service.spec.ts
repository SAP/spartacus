import { TestBed, inject } from '@angular/core/testing';
import { CmsService } from './cms.service';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import * as fromStore from '../store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';

const mockPageSlot: any[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' }
];

describe('CmsService', () => {
  let store;

  beforeEach(() => {
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
      const mockSelect = createSpy('select').and.returnValue(() =>
        of(undefined)
      );
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      service.getComponentData(testUid).subscribe(() => {});

      expect(mockSelect).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadComponent(testUid)
      );
    }
  ));

  describe('getSlot(position)', () => {
    it('should be able to get content slot by position', inject(
      [CmsService],
      (service: CmsService) => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of(mockPageSlot)
        );
        service.getSlot('Section1').subscribe(pageSlotReturned => {
          expect(pageSlotReturned).toBe(mockPageSlot);
        });
      }
    ));
  });
});
