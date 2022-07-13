import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PointOfService, ProcessModule } from '@spartacus/core';
import { IntendedPickupLocationFacade } from 'feature-libs/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { PickupLocationActions } from '../store';
import { IntendedPickupLocationService } from './intended-pickup-location.service';

describe('IntendedPickupLocationService', () => {
  let service: IntendedPickupLocationService;
  let store: Store<{}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ProcessModule.forRoot()],
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
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.AddLocation({
        payload: {
          productCode: 'P0001',
          location: {
            name: 'Test',
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
});

export class MockIntendedPickupLocationService
  implements IntendedPickupLocationFacade
{
  getIntendedLocation(
    _productCode: string
  ): Observable<PointOfService | undefined> {
    return of(undefined);
  }
  setIntendedLocation(_productCode: string, _location: PointOfService): void {}
  removeIntendedLocation(_productCode: string): void {}
}
