import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveForLaterComponent } from './save-for-later.component';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  SelectiveCartService,
  FeaturesConfig,
  PromotionResult,
  Cart,
  ActiveCartService,
  AuthService,
  AuthRedirectService,
  RoutingService,
  OrderEntry,
} from '@spartacus/core';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Item,
  CartItemComponentOptions,
} from '../cart-shared/cart-item/cart-item.component';
import { By } from '@angular/platform-browser';

@Component({
  template: '<cx-cart-item> </cx-cart-item>',
  selector: 'cx-cart-item-list',
})
class MockCartItemListComponent {
  @Input()
  items: Item[];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading: Observable<boolean>;
  @Input()
  options: CartItemComponentOptions = {
    isReadOnly: false,
  };
}

describe('SaveForLaterComponent', () => {
  let component: SaveForLaterComponent;
  let fixture: ComponentFixture<SaveForLaterComponent>;

  const mockCartService = jasmine.createSpyObj('ActiveCartService', [
    'addEntry',
    'getLoaded',
  ]);

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['getCart', 'getLoaded', 'removeEntry', 'getEntries']
  );

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockAuthRedirectService = jasmine.createSpyObj('AuthRedirectService', [
    'reportAuthGuard',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveForLaterComponent, MockCartItemListComponent],
      imports: [FeaturesConfigModule, I18nTestingModule],
      providers: [
        { provide: ActiveCartService, useValue: mockCartService },
        { provide: SelectiveCartService, useValue: mockSelectiveCartService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AuthRedirectService, useValue: mockAuthRedirectService },
        { provide: RoutingService, useValue: mockRoutingService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.1', selectiveCart: '1.2' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterComponent);
    component = fixture.componentInstance;

    mockCartService.getLoaded.and.returnValue(of(true));

    mockSelectiveCartService.getLoaded.and.returnValue(of(true));
    mockSelectiveCartService.getCart.and.returnValue(of<Cart>({ code: '123' }));
    mockSelectiveCartService.getEntries.and.returnValue(of<OrderEntry[]>([{}]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display save for later text with items', () => {
    mockSelectiveCartService.getCart.and.returnValue(
      of<Cart>({
        code: '123',
        totalItems: 5,
      })
    );
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartName = el.nativeElement.innerText;
    expect(cartName).toEqual('saveForLaterItems.itemTotal count:5');
  });
});
