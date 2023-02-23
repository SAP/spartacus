import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { PickupLocationActions } from '../store';
import { IntendedPickupLocationService } from './intended-pickup-location.service';

describe('IntendedPickupLocationService', () => {
  let service: IntendedPickupLocationService;
  let store: Store<{}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [IntendedPickupLocationService, Store],
    });

    service = TestBed.inject(IntendedPickupLocationService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    spyOn(store, 'pipe');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getIntendedLocation', () => {
    service.getIntendedLocation('P0001');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('setIntendedLocation', () => {
    service.setIntendedLocation('P0001', {
      name: 'Test',
      pickupOption: 'delivery',
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.AddLocation({
        payload: {
          productCode: 'P0001',
          location: {
            name: 'Test',
            pickupOption: 'delivery',
          },
        },
      })
    );
  });

  it('removeIntendedLocation', () => {
    service.removeIntendedLocation('P0001');
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.RemoveLocation({
        payload: 'P0001',
      })
    );
  });

  it('getPickupOption', () => {
    service.getPickupOption('productCode');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('setPickupOption', () => {
    service.setPickupOption('productCode', 'delivery');
    const action = PickupLocationActions.SetPickupOption({
      payload: { productCode: 'productCode', pickupOption: 'delivery' },
    });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});

export class MockIntendedPickupLocationService
  implements IntendedPickupLocationFacade
{
  getIntendedLocation(
    _productCode: string
  ): Observable<AugmentedPointOfService | undefined> {
    const result: AugmentedPointOfService = {
      pickupOption: 'pickup',
      displayName: 'London School',
    };
    return of(result);
  }
  setIntendedLocation(
    _productCode: string,
    _location: AugmentedPointOfService
  ): void {}
  removeIntendedLocation(_productCode: string): void {}

  getPickupOption(_productCode: string): Observable<PickupOption> {
    return of('delivery');
  }
  setPickupOption(_productCode: string, _pickupOption: PickupOption): void {}
}
