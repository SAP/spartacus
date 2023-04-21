import {
  DebugElement,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Cart } from '@spartacus/cart/base/root';
import {
  SavedCartFacade,
  SavedCartFormType,
} from '@spartacus/cart/saved-cart/root';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { SavedCartListComponent } from './saved-cart-list.component';

const mockCart1: Cart = {
  code: '00001',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$165.00',
  },
};
const mockCart2: Cart = {
  code: '00002',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$167.00',
  },
};
const mockCarts: Cart[] = [mockCart1, mockCart2];

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
  loadSavedCarts(): void {}
  clearSaveCart(): void {}
  clearSavedCarts(): void {}
  getList(): Observable<Cart[]> {
    return of(mockCarts);
  }
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return EMPTY;
  }
  getSavedCartListProcessLoading(): Observable<boolean> {
    return of(false);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

describe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;
  let savedCartFacade: SavedCartFacade | MockSavedCartFacade;
  let routingService: RoutingService | MockRoutingService;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, FeaturesConfigModule],
      declarations: [SavedCartListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '5.1' },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    savedCartFacade = TestBed.inject(SavedCartFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialog').and.stub();

    fixture = TestBed.createComponent(SavedCartListComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header', () => {
    fixture.detectChanges();
    expect(el.query(By.css('h2')).nativeElement.innerText).toContain(
      'savedCartList.savedCarts'
    );
  });

  it('should render proper number of carts when user contains saved carts', () => {
    component.savedCarts$ = savedCartFacade.getList();
    fixture.detectChanges();
    expect(el.query(By.css('.cx-saved-cart-list-table'))).not.toBeNull();
    expect(el.queryAll(By.css('.cx-saved-cart-list-cart-id')).length).toEqual(
      mockCarts.length
    );
  });

  it('should render empty message if no saved carts exist', () => {
    const el = fixture.debugElement;
    component.savedCarts$ = of([]);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-saved-cart-list-no-saved-carts'))
    ).not.toBeNull();
  });

  it('should trigger loadSavedCarts OnInit', () => {
    spyOn(savedCartFacade, 'loadSavedCarts').and.callThrough();
    component.savedCarts$ = savedCartFacade.getList();
    fixture.detectChanges();
    expect(savedCartFacade.loadSavedCarts).toHaveBeenCalledWith();
  });

  it('should trigger goToSavedCartDetails with proper route', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.goToSavedCartDetails(mockCart1);
    fixture.detectChanges();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: mockCart1.code },
    });
  });

  it('should trigger an open dialog to restore a saved cart', () => {
    component.openDialog(new Event('abc'), mockCart1);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.restoreButton,
      component['vcr'],
      {
        cart: mockCart1,
        layoutOption: SavedCartFormType.RESTORE,
      }
    );
  });
});
