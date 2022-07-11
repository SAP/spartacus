import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupInStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { SpinnerModule } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupInStoreService } from 'feature-libs/pickup-in-store/core/facade/pickup-in-store.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { StoreListComponent } from './store-list.component';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupInStoreService: PickupInStoreFacade;
  let preferredStoreService: PreferredStoreService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SpinnerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [StoreListComponent],
      providers: [
        { provide: PickupInStoreFacade, useClass: MockPickupInStoreService },
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupInStoreService = TestBed.inject(PickupInStoreFacade);
    preferredStoreService = TestBed.inject(PreferredStoreService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );

    fixture.detectChanges();
  });

  it('should create store list', () => {
    expect(component).toBeDefined();
  });

  it('should get local stores on init', () => {
    spyOn(pickupInStoreService, 'getStores');
    spyOn(pickupInStoreService, 'getStockLoading');
    spyOn(pickupInStoreService, 'getSearchHasBeenPerformed');
    component.ngOnInit();
    expect(pickupInStoreService.getStores).toHaveBeenCalled();
    expect(pickupInStoreService.getStockLoading).toHaveBeenCalled();
    expect(pickupInStoreService.getSearchHasBeenPerformed).toHaveBeenCalled();
  });

  it('should set the preferred store when a store is selected', () => {
    spyOn(preferredStoreService, 'setPreferredStore');
    spyOn(intendedPickupLocationService, 'setIntendedLocation');
    spyOn(component.storeSelected, 'emit');

    component.productCode = 'productCode';
    fixture.detectChanges();

    component.onSelectStore({ name: 'storeName' });
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith(
      'storeName'
    );
    expect(
      intendedPickupLocationService.setIntendedLocation
    ).toHaveBeenCalledWith('productCode', { name: 'storeName' });
    expect(component.storeSelected.emit).toHaveBeenCalledWith();
  });

  it('should set blank preferred store when store has no name', () => {
    spyOn(preferredStoreService, 'setPreferredStore');

    component.onSelectStore({ storeContent: 'storeContent' });
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith('');
  });
});
