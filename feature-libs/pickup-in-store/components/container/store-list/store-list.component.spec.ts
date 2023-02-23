import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, PointOfServiceStock } from '@spartacus/core';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { SpinnerModule } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from '../../../core/facade/pickup-locations-search.service.spec';
import { StoreListComponent } from './store-list.component';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreListComponent],
      imports: [
        HttpClientTestingModule,
        I18nTestingModule,
        RouterTestingModule,
        SpinnerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );
    component.productCode = 'productCode';
    fixture.detectChanges();
  });

  it('should create store list', () => {
    expect(component).toBeDefined();
  });

  it('should get local stores on init', () => {
    spyOn(pickupLocationsSearchService, 'getSearchResults');
    spyOn(pickupLocationsSearchService, 'isSearchRunning');
    spyOn(pickupLocationsSearchService, 'hasSearchStarted');

    component.ngOnInit();
    expect(pickupLocationsSearchService.getSearchResults).toHaveBeenCalledWith(
      'productCode'
    );
    expect(pickupLocationsSearchService.isSearchRunning).toHaveBeenCalled();
    expect(pickupLocationsSearchService.hasSearchStarted).toHaveBeenCalled();
  });

  it('should call getSearchResults with productCode', () => {
    component.productCode = 'productCode';
    spyOn(pickupLocationsSearchService, 'getSearchResults');
    component.ngOnInit();
    expect(pickupLocationsSearchService.getSearchResults).toHaveBeenCalledWith(
      'productCode'
    );
  });

  it('should emit storeSelected', () => {
    spyOn(component.storeSelected, 'emit');
    const pointOfService = {
      name: 'Store Name',
      displayName: 'Store Name',
    };
    component.onSelectStore(pointOfService);
    expect(component.storeSelected.emit).toHaveBeenCalled();
  });

  it('should call setIntendedLocation on IntendedPickupLocationService', () => {
    spyOn(intendedPickupLocationService, 'setIntendedLocation');
    const store: PointOfServiceStock = { stockInfo: {} };
    const location: AugmentedPointOfService = { pickupOption: 'pickup' };
    component.onSelectStore(store);
    component.productCode = 'productCode';
    expect(
      intendedPickupLocationService.setIntendedLocation
    ).toHaveBeenCalledWith('productCode', location);
  });
});

/**
 * This is a stub of the StoreListComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-store-list',
  template: '',
})
export class StoreListStubComponent {
  @Input() productCode: string;
}
