import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/core';
import { IconTestingModule, LaunchDialogService } from '@spartacus/storefront';
import { MockPickupInStoreService } from 'feature-libs/pickup-in-store/core/facade/mock-pickup-in-store.service';
import { PickupInStoreFacade } from 'feature-libs/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { StoreListModule } from '../store-list/index';
import { StoreSearchModule } from '../store-search/store-search.module';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({});
  }

  closeDialog(_reason: string): void {}
}

describe('PickupDeliveryOptionDialogComponent', () => {
  let component: PickupDeliveryOptionDialogComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let pickupInStoreFacade: PickupInStoreFacade;
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
        { provide: PickupInStoreFacade, useClass: MockPickupInStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PickupDeliveryOptionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    pickupInStoreFacade = TestBed.inject(PickupInStoreFacade);

    fixture.detectChanges();
  });

  it('should create dialog', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit should call appropriate methods', () => {
    spyOn(pickupInStoreFacade, 'clearStockData');
    component.ngOnInit();
    expect(pickupInStoreFacade.clearStockData).toHaveBeenCalled();
  });

  it('onFindStores calls appropriate service method', () => {
    spyOn(pickupInStoreFacade, 'getStock');
    component.onFindStores({ productCode: 'P001' } as LocationSearchParams);
    expect(pickupInStoreFacade.getStock).toHaveBeenCalledWith({
      productCode: 'P001',
    });
  });

  it('onHideOutOfStock calls appropriate service method', () => {
    spyOn(pickupInStoreFacade, 'hideOutOfStock');
    component.onHideOutOfStock();
    expect(pickupInStoreFacade.hideOutOfStock).toHaveBeenCalled();
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
