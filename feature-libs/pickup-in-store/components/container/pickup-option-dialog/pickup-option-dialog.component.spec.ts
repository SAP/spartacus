import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOptionFacade,
} from '@spartacus/pickup-in-store/root';
import {
  IconTestingModule,
  KeyboardFocusModule,
  LaunchDialogService,
  LAUNCH_CALLER,
  SpinnerModule,
} from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from '../../../core/facade/pickup-locations-search.service.spec';
import { MockPickupOptionFacade } from '../../../core/facade/pickup-option.service.spec';
import { MockPreferredStoreService } from '../../../core/services/preferred-store.service.spec';
import { StoreListStubComponent } from '../store-list/store-list.component.spec';
import { StoreSearchStubComponent } from '../store-search/store-search.component.spec';
import { PickupOptionDialogComponent } from './pickup-option-dialog.component';

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
    return EMPTY;
  }

  get dialogClose(): Observable<string | undefined> {
    return of(undefined);
  }
  closeDialog(_reason: string): void {}
}

export class MockActiveCartService {
  addEntry(_productCode: string, _quantity: number): void {}
  getEntry(_productCode: string): Observable<OrderEntry> {
    return EMPTY;
  }
  isStable(): Observable<boolean> {
    return EMPTY;
  }
  getActive(): Observable<Cart> {
    return of({
      guid: 'test',
      user: { uid: 'test' },
      entries: [{ product: { code: 'test' }, quantity: 1, entryNumber: 1 }],
    });
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
  getLastEntry(_productCode: string): Observable<OrderEntry> {
    return EMPTY;
  }
  updateEntry(
    _entryNumber: number,
    _quantity: number,
    _pickupInStore: string,
    _pickupLocation?: boolean
  ): void {}
}

describe('PickupOptionDialogComponent', () => {
  let component: PickupOptionDialogComponent;
  let fixture: ComponentFixture<PickupOptionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let intendedPickupLocationFacade: IntendedPickupLocationFacade;
  let pickupOptionFacade: PickupOptionFacade;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PickupOptionDialogComponent,
        StoreSearchStubComponent,
        StoreListStubComponent,
      ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        I18nTestingModule,
        IconTestingModule,
        KeyboardFocusModule,
        SpinnerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
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
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: PickupOptionFacade,
          useClass: MockPickupOptionFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PickupOptionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    intendedPickupLocationFacade = TestBed.inject(IntendedPickupLocationFacade);
    pickupOptionFacade = TestBed.inject(PickupOptionFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    fixture.detectChanges();
  });

  it('should create dialog', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit should call appropriate methods', () => {
    spyOn(pickupLocationsSearchService, 'getHideOutOfStock');
    spyOn(pickupOptionFacade, 'getPageContext').and.returnValue(of('PDP'));
    component.ngOnInit();

    expect(component.isPDP).toEqual(true);
    expect(pickupLocationsSearchService.getHideOutOfStock).toHaveBeenCalled();
  });

  it('ngOnInit should set the cartId and userId for an anonymous user', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(
      of({
        guid: 'test',
        user: { uid: 'anonymous' },
        code: 'code',
      })
    );
    component.ngOnInit();
    expect(component.cartId).toEqual('test');
    expect(component.userId).toEqual('anonymous');
  });

  it('ngOnInit should set the cartId and userId for a logged in user', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(
      of({
        guid: 'test',
        user: { uid: 'test@sap.com' },
        code: 'code',
      })
    );
    component.ngOnInit();
    expect(component.cartId).toEqual('code');
    expect(component.userId).toEqual('test@sap.com');
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

  it('should close the dialog when user clicks outside', () => {
    const element = fixture.debugElement.nativeElement;
    spyOn(component, 'close');

    element.click();
    expect(component.close).toHaveBeenCalledWith(
      component.CLOSE_WITHOUT_SELECTION
    );
  });

  it('should close the dialog when user presses escape key', () => {
    const element = (
      fixture.debugElement.nativeElement as HTMLElement
    ).querySelector('.cx-pickup-option-dialog');
    spyOn(component, 'close');

    element?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.close).toHaveBeenCalledWith(
      component.CLOSE_WITHOUT_SELECTION
    );
  });
});
