import {
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfiguratorTextfieldAddToCartButtonComponent } from './configurator-textfield-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const URL_CONFIGURATION = 'host:port/electronics-spa/en/USD/configureTEXTFIELD';
const OWNER = ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.PRODUCT,
  PRODUCT_CODE
);

const configurationTextField: ConfiguratorTextfield.Configuration = {
  configurationInfos: [],
  owner: OWNER,
};
const mockRouterState: any = {
  state: {
    url: URL_CONFIGURATION,
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
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
    const seenText = buttonElements[0].textContent
      ? buttonElements[0].textContent.trim()
      : undefined;
    expect(seenText).toBe(buttonText);
  }

  beforeEach(
    waitForAsync(() => {
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
    })
  );

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

    OWNER.type = CommonConfigurator.OwnerType.PRODUCT;
    mockRouterState.state.params.ownerType =
      CommonConfigurator.OwnerType.PRODUCT;
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
      CommonConfigurator.OwnerType.CART_ENTRY;
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
    OWNER.type = CommonConfigurator.OwnerType.CART_ENTRY;

    spyOn(textfieldService, 'updateCartEntry').and.callThrough();

    classUnderTest.onAddToCart();
    expect(textfieldService.updateCartEntry).toHaveBeenCalledWith(
      OWNER.id,
      configurationTextField
    );
  });
});
