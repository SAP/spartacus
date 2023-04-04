import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { EMPTY, Observable, of } from 'rxjs';
import { PickupOptionActions } from '../store';
import { PickupOptionService } from './pickup-option.service';

export class MockPickupOptionFacade {
  setPageContext(): void {
    return;
  }
  getPageContext(): Observable<string> {
    return EMPTY;
  }
  setPickupOption(): void {
    return;
  }
  getPickupOption(): Observable<PickupOption> {
    return of('pickup');
  }
}

describe('PickupOptionFacade', () => {
  let service: PickupOptionService;
  let store: Store<{}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [PickupOptionService, Store],
    });

    service = TestBed.inject(PickupOptionService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    spyOn(store, 'pipe');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('setPageContext', () => {
    service.setPageContext('CART');
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupOptionActions.SetPageContext({
        payload: { pageContext: 'CART' },
      })
    );
  });

  it('getPageContext', () => {
    service.getPageContext();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('setPickupOption', () => {
    service.setPickupOption(1, 'pickup');
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupOptionActions.SetPickupOption({
        payload: { entryNumber: 1, pickupOption: 'pickup' },
      })
    );
  });

  it('getStockLevelAtStore', () => {
    service.getPickupOption(1);
    expect(store.pipe).toHaveBeenCalled();
  });
});
