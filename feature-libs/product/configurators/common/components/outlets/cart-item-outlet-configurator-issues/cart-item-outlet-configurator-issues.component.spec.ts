import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigurationInfo,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntryStatus,
  StatusSummary,
} from '@spartacus/core';
import {
  CartItemContext,
  CartItemContextModel,
  GenericConfiguratorModule,
} from '@spartacus/storefront';
import { CartItemOutletConfiguratorIssuesComponent } from './cart-item-outlet-configurator-issues.component';

function setContext(
  cartItemOutletConfiguratorComponent: CartItemOutletConfiguratorIssuesComponent,
  statusSummary: StatusSummary[],
  configurationInfos: ConfigurationInfo[],
  readOnly: boolean
) {
  const newChunk: any = {
    item: {
      statusSummaryList: statusSummary,
      configurationInfos: configurationInfos,
    },
    readonly: readOnly,
    quantityControl: {},
  };
  let oldChunk: CartItemContextModel;
  cartItemOutletConfiguratorComponent.cartItem.context$
    .subscribe((val) => (oldChunk = val ?? {}))
    .unsubscribe();

  cartItemOutletConfiguratorComponent.cartItem['context$$'].next({
    ...oldChunk,
    ...newChunk,
  });
}

describe('CartItemOutletConfiguratorIssuesComponent', () => {
  let cartItemOutletConfiguratorIssuesComponent: CartItemOutletConfiguratorIssuesComponent;

  let fixture: ComponentFixture<CartItemOutletConfiguratorIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GenericConfiguratorModule,
        RouterTestingModule,
        ReactiveFormsModule,
        I18nTestingModule,

        FeaturesConfigModule,
      ],
      declarations: [CartItemOutletConfiguratorIssuesComponent],
      providers: [
        CartItemContext,
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CartItemOutletConfiguratorIssuesComponent
    );

    cartItemOutletConfiguratorIssuesComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create CartItemOutletConfiguratorComponent', () => {
    expect(cartItemOutletConfiguratorIssuesComponent).toBeTruthy();
  });

  it('should know cart item context', () => {
    expect(cartItemOutletConfiguratorIssuesComponent.cartItem).toBeTruthy();
  });

  it('should render issues notification component', () => {
    setContext(
      cartItemOutletConfiguratorIssuesComponent,
      [{ numberOfIssues: 1, status: OrderEntryStatus.Error }],
      null,
      false
    );
    fixture.detectChanges();
    const htmlElem = fixture.nativeElement;
    expect(
      htmlElem.querySelectorAll('cx-configurator-issues-notification').length
    ).toBeGreaterThan(
      0,
      'expected issues notification to be present, but it is not; innerHtml: ' +
        htmlElem.innerHTML
    );
  });
});
