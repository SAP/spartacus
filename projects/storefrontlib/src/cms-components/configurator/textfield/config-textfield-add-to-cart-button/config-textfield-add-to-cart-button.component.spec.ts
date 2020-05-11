import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const URL_CONFIGURATION = 'host:port/electronics-spa/en/USD/configureTEXTFIELD';
const OWNER: GenericConfigurator.Owner = {
  type: GenericConfigurator.OwnerType.PRODUCT,
  id: PRODUCT_CODE,
};
const configurationTextField: ConfiguratorTextfield.Configuration = {
  configurationInfos: [],
  owner: OWNER,
};
const mockRouterState: any = {
  state: {
    url: URL_CONFIGURATION,
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
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
  let htmlElem: HTMLElement;

  function checkButtonText(buttonText: string): void {
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    const buttonElements = htmlElem.getElementsByClassName(
      'cx-btn btn btn-block btn-primary'
    );
    expect(buttonElements).toBeDefined();
    expect(buttonElements.length).toBe(1);
    expect(buttonElements[0].textContent).toBe(buttonText);
  }

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
    classUnderTest.configuration$ = of(configurationTextField);
    htmlElem = fixture.nativeElement;
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
  });

  it('should create component', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should get router data properly after executing onInit', () => {
    classUnderTest.ngOnInit();
    classUnderTest.routerData$.subscribe((data) =>
      expect(data.owner.type).toBe(GenericConfigurator.OwnerType.PRODUCT)
    );
  });

  it('should display addToCart text because router points to owner product initially', () => {
    checkButtonText(' configuratorTextfield.addToCart.button');
  });

  it('should display "done" text in case router points to cart entry', () => {
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.CART_ENTRY;
    checkButtonText(' configuratorTextfield.addToCart.buttonUpdateCart');
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
