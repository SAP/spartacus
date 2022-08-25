import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { SpinnerModule } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { StoreListComponent } from './store-list.component';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;

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
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
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
});
