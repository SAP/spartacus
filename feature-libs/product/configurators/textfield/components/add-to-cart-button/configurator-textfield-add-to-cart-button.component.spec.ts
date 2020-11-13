import {
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { GenericConfigurator } from '@spartacus/product/configurators/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfiguratorTextfieldAddToCartButtonComponent } from './configurator-textfield-add-to-cart-button.component';

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

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('ConfigTextfieldAddToCartButtonComponent', () => {
  let classUnderTest: ConfiguratorTextfieldAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfiguratorTextfieldAddToCartButtonComponent>;
  let textfieldService: ConfiguratorTextfieldService;

  let htmlElem: HTMLElement;

  function checkButtonText(buttonText: string): void {
    fixture.detectChanges();
    const buttonElements = htmlElem.getElementsByClassName(
      'cx-btn btn btn-block btn-primary cx-add-to-cart-btn'
    );
    expect(buttonElements).toBeDefined();
    expect(buttonElements.length).toBe(1);
    expect(buttonElements[0].textContent.trim()).toBe(buttonText);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ConfiguratorTextfieldAddToCartButtonComponent,
        MockUrlPipe,
      ],
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
      .overrideComponent(ConfiguratorTextfieldAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorTextfieldAddToCartButtonComponent
    );
    classUnderTest = fixture.componentInstance;
    classUnderTest.configuration = configurationTextField;
    htmlElem = fixture.nativeElement;
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );

    OWNER.type = GenericConfigurator.OwnerType.PRODUCT;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.PRODUCT;
  });

  it('should create component', () => {
    expect(classUnderTest).toBeTruthy();
    expect(classUnderTest.configuration).toBe(configurationTextField);
  });

  it('should display addToCart text because router points to owner product initially', () => {
    checkButtonText('configurator.addToCart.button');
  });

  it('should display "done" text in case router points to cart entry', () => {
    classUnderTest.configuration.owner.type =
      GenericConfigurator.OwnerType.CART_ENTRY;
    checkButtonText('configurator.addToCart.buttonUpdateCart');
  });

  it('should navigate to cart and call addToCart on core service when onAddToCart was triggered ', () => {
    spyOn(textfieldService, 'addToCart').and.callThrough();

    classUnderTest.onAddToCart();

    expect(textfieldService.addToCart).toHaveBeenCalledWith(
      OWNER.id,
      configurationTextField
    );
  });

  it('should navigate to cart when onAddToCart was triggered and owner points to cart entry ', () => {
    OWNER.type = GenericConfigurator.OwnerType.CART_ENTRY;

    spyOn(textfieldService, 'updateCartEntry').and.callThrough();

    classUnderTest.onAddToCart();
    expect(textfieldService.updateCartEntry).toHaveBeenCalledWith(
      OWNER.id,
      configurationTextField
    );
  });
});
