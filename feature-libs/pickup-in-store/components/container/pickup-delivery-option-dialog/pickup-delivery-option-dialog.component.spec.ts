import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  IconTestingModule,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of } from 'rxjs';
import { StoreListModule } from '../store-list/index';
import { StoreSearchModule } from '../store-search/index';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';
import { MockCurrentProductService } from '../pdp-pickup-options-container/pdp-pickup-options-container.spec';
export class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({ productCode: 'testProductCode' });
  }

  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }

  get dialogClose(): Observable<string | undefined> {
    return of(undefined);
  }
  closeDialog(_reason: string): void {}
}

describe('PickupDeliveryOptionDialogComponent', () => {
  let component: PickupDeliveryOptionDialogComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let intendedPickupLocationFacade: IntendedPickupLocationFacade;
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
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PickupDeliveryOptionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    intendedPickupLocationFacade = TestBed.inject(IntendedPickupLocationFacade);

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

  it('should close dialog on close method no selection', () => {
    const mockCloseReason = 'CLOSE_WITHOUT_SELECTION';
    component.productCode = 'productCode';
    spyOn(launchDialogService, 'closeDialog');
    spyOn(
      intendedPickupLocationFacade,
      'getIntendedLocation'
    ).and.callThrough();
    spyOn(intendedPickupLocationFacade, 'setPickupOption').and.callThrough();
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );

    expect(
      intendedPickupLocationFacade.getIntendedLocation
    ).toHaveBeenCalledWith('productCode');
  });

  it('should set loading when showSpinner is called', () => {
    component.showSpinner(true);
    expect(component.loading).toEqual(true);
    component.showSpinner(false);
    expect(component.loading).toEqual(false);
  });

  it('should filter if store name is defined', () => {
    const mockCloseReason = 'CLOSE_WITHOUT_SELECTION';
    spyOn(intendedPickupLocationFacade, 'getIntendedLocation').and.returnValue(
      of({ name: 'testStoreName', pickupOption: 'pickup' })
    );
    spyOn(launchDialogService, 'closeDialog');

    component.close(mockCloseReason);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
