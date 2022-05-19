import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ProcessModule } from '@spartacus/core';
import { PickupInStoreService } from './pickup-in-store.service';

describe('PickupInStoreService', () => {
  let service: PickupInStoreService;
  let store: Store<{}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ProcessModule.forRoot()],
      providers: [PickupInStoreService],
    });

    service = TestBed.inject(PickupInStoreService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStore', () => {
    spyOn(service, 'getStore').and.callThrough();
    service.getStore();
    expect(service.getStore).toHaveBeenCalled();
  });
});
