import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  Cart,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { CartItemContext } from '../cart-shared/cart-item/model/cart-item-context.model';
import { SaveForLaterActionComponent } from './save-for-later-action.component';

class MockActiveCartService {
  removeEntry(): void {}
  loadDetails(): void {}
  updateEntry(): void {}
  getActive(): Observable<Cart> {
    return of<Cart>({ code: '123', totalItems: 1 });
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([{}]);
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
}

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
}

describe('SaveForLaterActionComponent', () => {
  let component: SaveForLaterActionComponent;
  let fixture: ComponentFixture<SaveForLaterActionComponent>;
  let activeCartService: ActiveCartService;
  let mockCartItemContext: MockCartItemContext;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    [
      'getCart',
      'getLoaded',
      'removeEntry',
      'getEntries',
      'addEntry',
      'isEnabled',
      'isStable',
    ]
  );

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, FeaturesConfigModule],
        declarations: [SaveForLaterActionComponent],
        providers: [
          { provide: SelectiveCartService, useValue: mockSelectiveCartService },
          { provide: AuthService, useValue: mockAuthService },
          { provide: RoutingService, useValue: mockRoutingService },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          { provide: CartItemContext, useClass: MockCartItemContext },
        ],
      }).compileComponents();

      mockSelectiveCartService.isEnabled.and.returnValue(true);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterActionComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartService);
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
  });

  it('should create save for later action component', () => {
    expect(component).toBeTruthy();
  });

  it('should move to save for later for login user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(true));
    mockSelectiveCartService.addEntry.and.callThrough();
    spyOn(activeCartService, 'removeEntry').and.callThrough();
    fixture.detectChanges();
    component.saveForLater(of(mockItem));
    expect(activeCartService.removeEntry).toHaveBeenCalledWith(mockItem);
    expect(mockSelectiveCartService.addEntry).toHaveBeenCalledWith(
      mockItem.product.code,
      mockItem.quantity
    );
  });

  it('should go to login page for anonymous user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(false));
    component.saveForLater(of(mockItem));
    fixture.detectChanges();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should not show save for later when selective cart is disabled', () => {
    mockSelectiveCartService.isEnabled.and.returnValue(false);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBe(null);
  });

  it('should show save for later when selective cart is enabled', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBeDefined();
  });

  it('should not enable save for later when qty control is disabled', () => {
    const quantityControl = new FormControl();
    quantityControl.disable();
    mockCartItemContext.quantityControl$.next(quantityControl);

    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBeDefined();
  });
});
