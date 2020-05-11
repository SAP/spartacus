import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ConfiguratorTextfieldService,
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const OWNER: GenericConfigurator.Owner = {
  type: GenericConfigurator.OwnerType.PRODUCT,
  id: PRODUCT_CODE,
};
const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
  go(): void {}
}

class MockConfiguratorTextfieldService {
  addToCart(): void {}
  updateCartEntry(): void {}
}

describe('ConfigTextfieldAddToCartButtonComponent', () => {
  let classUnderTest: ConfigTextfieldAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfigTextfieldAddToCartButtonComponent>;
  let textfieldService: ConfiguratorTextfieldService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigTextfieldAddToCartButtonComponent],
      providers: [
        {
          provide: ConfiguratorTextfieldService,
          useClass: MockConfiguratorTextfieldService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    })
      .overrideComponent(ConfigTextfieldAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldAddToCartButtonComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should navigate to cart and call addToCart on core service when onAddToCart was triggered ', () => {
    spyOn(textfieldService, 'addToCart').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();

    classUnderTest.onAddToCart(OWNER);

    expect(textfieldService.addToCart).toHaveBeenCalledWith(OWNER.id);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
  });

  it('should navigate to cart when onAddToCart was triggered and owner points to cart entry ', () => {
    OWNER.type = GenericConfigurator.OwnerType.CART_ENTRY;
    spyOn(routingService, 'go').and.callThrough();
    spyOn(textfieldService, 'updateCartEntry').and.callThrough();

    classUnderTest.onAddToCart(OWNER);
    expect(textfieldService.updateCartEntry).toHaveBeenCalledWith(OWNER.id);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
  });
});
