import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { IconTestingModule, LaunchDialogService } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of } from 'rxjs';
import { StoreListModule } from '../store-list/index';
import { StoreSearchModule } from '../store-search/store-search.module';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({ productCode: 'testProductCode' });
  }

  closeDialog(_reason: string): void {}
}

describe('PickupDeliveryOptionDialogComponent', () => {
  let component: PickupDeliveryOptionDialogComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        IconTestingModule,
        StoreListModule,
        StoreSearchModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      declarations: [PickupDeliveryOptionDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
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

    fixture = TestBed.createComponent(PickupDeliveryOptionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);

    fixture.detectChanges();
  });

  it('should create dialog', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit should call appropriate methods', () => {
    spyOn(pickupLocationsSearchService, 'getHideOutOfStock');
    component.ngOnInit();
    expect(pickupLocationsSearchService.getHideOutOfStock).toHaveBeenCalled();
  });

  it('onFindStores calls appropriate service method', () => {
    spyOn(pickupLocationsSearchService, 'startSearch');
    component.onFindStores({ location: '' });
    expect(pickupLocationsSearchService.startSearch).toHaveBeenCalledWith({
      productCode: 'testProductCode',
      location: '',
    });
  });

  it('onHideOutOfStock calls appropriate service method', () => {
    spyOn(pickupLocationsSearchService, 'toggleHideOutOfStock');
    component.onHideOutOfStock();
    expect(
      pickupLocationsSearchService.toggleHideOutOfStock
    ).toHaveBeenCalled();
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should set loading when showSpinner is called', () => {
    component.showSpinner(true);
    expect(component.loading).toEqual(true);
    component.showSpinner(false);
    expect(component.loading).toEqual(false);
  });
});
