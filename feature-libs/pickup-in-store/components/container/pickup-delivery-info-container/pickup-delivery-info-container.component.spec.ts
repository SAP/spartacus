import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from 'feature-libs/pickup-in-store/root';
import { Observable, of } from 'rxjs';

import { PickupDeliveryInfoContainerComponent } from './pickup-delivery-info-container.component';
class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    const entries: OrderEntry[] = [
      {},
      { deliveryPointOfService: { name: 'London School' } },
    ];
    return of({ entries });
  }
}
class MockPickupLocationsSearchFacade
  implements Partial<PickupLocationsSearchFacade>
{
  getStoreDetails(name: string): Observable<PointOfService> {
    return of({ name });
  }

  loadStoreDetails(_name: string): void {}
}

describe('PickupDeliveryInfoContainerComponent', () => {
  let component: PickupDeliveryInfoContainerComponent;
  let fixture: ComponentFixture<PickupDeliveryInfoContainerComponent>;
  let activeCartService: ActiveCartFacade;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickupDeliveryInfoContainerComponent],
      providers: [
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryInfoContainerComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartFacade);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call on init', () => {
    spyOn(activeCartService, 'getActive').and.callThrough();
    spyOn(pickupLocationsSearchService, 'loadStoreDetails').and.callThrough();
    spyOn(pickupLocationsSearchService, 'getStoreDetails').and.callThrough();
    component.ngOnInit();
    expect(activeCartService.getActive).toHaveBeenCalled();
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'London School'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'London School'
    );
  });
});
