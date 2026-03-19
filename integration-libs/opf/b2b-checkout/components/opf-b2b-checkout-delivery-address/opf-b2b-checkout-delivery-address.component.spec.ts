import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutModule } from '@spartacus/checkout/base';
import {
  CheckoutFlowOrchestratorService,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  FeatureConfigService,
  FeaturesConfig,
  GlobalMessageService,
  I18nTestingModule,
  MockTranslatePipe,
  TranslatePipe,
  UserAddressService,
} from '@spartacus/core';
import { FormComponent } from '@spartacus/organization/administration/components';
import { Card, SpinnerComponent } from '@spartacus/storefront';
import { AddressFormComponent } from '@spartacus/user/profile/components';
import { EMPTY, of } from 'rxjs';
import { OpfB2bCheckoutCostCenterComponent } from '../opf-b2b-checkout-cost-center';
import { OpfB2bCheckoutDeliveryAddressComponent } from './opf-b2b-checkout-delivery-address.component';
import createSpy = jasmine.createSpy;

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses = createSpy().and.returnValue(of(mockAddresses));
  getAddressesLoading = createSpy().and.returnValue(of(false));
  loadAddresses = createSpy();
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  createAndSetAddress = createSpy().and.returnValue(of({}));
  setDeliveryAddress = createSpy().and.returnValue(EMPTY);
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = createSpy();
  back = createSpy();
  getBackBntText = createSpy().and.returnValue('common.back');
}

class MockCheckoutFlowOrchestratorService
  implements Partial<CheckoutFlowOrchestratorService>
{
  getCheckoutFlow = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  clearCheckoutDeliveryMode = createSpy().and.returnValue(EMPTY);
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string) {
    return true;
  }
}

class MockStore implements Partial<Store> {
  // Placeholder for the Store interface
}

const mockAddress1: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'first line',
  line2: 'second line',
  town: 'town',
  id: 'id',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};
const mockAddress2: Address = {
  firstName: 'Alice',
  lastName: 'Smith',
  titleCode: 'mrs',
  line1: 'other first line',
  line2: 'other second line',
  town: 'other town',
  id: 'id2',
  region: { isocode: 'JP-27' },
  postalCode: 'other zip',
  country: { isocode: 'JP' },
  defaultAddress: true,
};
const mockAddresses: Address[] = [mockAddress1, mockAddress2];

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'shipping-address'],
  },
};

@Component({
  selector: 'cx-address-form',
  template: '',
  imports: [I18nTestingModule, CheckoutModule],
})
class MockAddressFormComponent {
  @Input() cancelBtnLabel: string;
  @Input() showTitleCode: boolean;
  @Input() setAsDefaultField: boolean;
  @Input() addressData: Address;
}

@Component({
  selector: 'cx-spinner',
  template: '',
  imports: [I18nTestingModule, CheckoutModule],
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-card',
  template: '',
  imports: [I18nTestingModule, CheckoutModule],
})
class MockCardComponent {
  @Input()
  border: boolean;
  @Input()
  content: Card;
  @Input()
  fitToContainer: boolean;
  @Input()
  index: number;
}

@Component({
  selector: 'cx-opf-b2b-checkout-cost-center',
  template: '',
})
class MockOpfB2bCheckoutCostCenterComponent
  implements Partial<OpfB2bCheckoutCostCenterComponent> {}

describe('OpfB2bCheckoutDeliveryAddressComponent', () => {
  let component: OpfB2bCheckoutDeliveryAddressComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutDeliveryAddressComponent>;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutStepService: CheckoutStepService;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        CheckoutModule,
        OpfB2bCheckoutDeliveryAddressComponent,
      ],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },

        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '6.3' },
          },
        },
        {
          provide: CheckoutFlowOrchestratorService,
          useClass: MockCheckoutFlowOrchestratorService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        { provide: Store, useClass: MockStore },
      ],
    })
      .overrideComponent(OpfB2bCheckoutDeliveryAddressComponent, {
        remove: {
          imports: [
            FormComponent,
            TranslatePipe,
            SpinnerComponent,
            AddressFormComponent,
            OpfB2bCheckoutCostCenterComponent,
          ],
        },
        add: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [
            MockAddressFormComponent,
            MockCardComponent,
            MockSpinnerComponent,
            MockTranslatePipe,
            MockOpfB2bCheckoutCostCenterComponent,
          ],
          providers: [
            {
              provide: CheckoutDeliveryAddressFacade,
              useClass: MockCheckoutDeliveryAddressFacade,
            },
            {
              provide: CheckoutDeliveryModesFacade,
              useClass: MockCheckoutDeliveryModesFacade,
            },
          ],
        },
      })
      .compileComponents();

    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfB2bCheckoutDeliveryAddressComponent);
    component = fixture.componentInstance;

    spyOn(component, 'addAddress').and.callThrough();
    spyOn(component, 'selectAddress').and.callThrough();
    spyOn<any>(component, 'setAddress').and.callThrough();
    spyOn<any>(component, 'getCardRole').and.callThrough();

    checkoutDeliveryAddressFacade = fixture.componentRef.injector.get(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = fixture.componentRef.injector.get(
      CheckoutDeliveryModesFacade
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to select address', () => {
    component.selectAddress(mockAddress1);

    expect(
      checkoutDeliveryAddressFacade.setDeliveryAddress
    ).toHaveBeenCalledWith(mockAddress1);
    expect(component['setAddress']).toHaveBeenCalledWith(mockAddress1);
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should be able to add address', () => {
    component.addAddress({});
    expect(component.doneAutoSelect).toBeTruthy();
    expect(
      checkoutDeliveryAddressFacade.createAndSetAddress
    ).toHaveBeenCalledWith({});
    expect(
      checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
    ).toHaveBeenCalled();
  });

  it('should be able to go to next step', () => {
    component.next();
    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should be able to go to previous step', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });
});
