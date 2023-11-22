import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { Address, Country, I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import {
  ChangeDetectorRef,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  ActiveCartFacade,
  DeliveryMode,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Card, OutletModule } from '@spartacus/storefront';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';

const mockCheckoutStep: CheckoutStep = {
  id: 'step',
  name: 'name',
  routeName: '/route',
  type: [CheckoutStepType.DELIVERY_ADDRESS],
};

const mockCountry: Country = {
  isocode: 'JP',
  name: 'Japan',
};
const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: mockCountry,
};

const mockDeliveryMode: DeliveryMode = {
  name: 'standard-gross',
  description: 'Delivery mode test description',
};

const mockEntries: OrderEntry[] = [
  { entryNumber: 123, quantity: 2, totalPrice: { formattedValue: '$8.20' } },
  { entryNumber: 456 },
];

class MockCheckoutDeliveryAddressService
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: mockAddress })
  );
}

class MockCheckoutDeliveryModesService
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSupportedDeliveryModesState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: [] })
  );
  getSelectedDeliveryModeState = createSpy().and.returnValue(
    of({
      loading: false,
      error: false,
      data: mockDeliveryMode,
    })
  );
}

class MockCheckoutStepService {
  steps$ = of([
    {
      id: 'step1',
      name: 'step1',
      routeName: 'route1',
      type: [CheckoutStepType.DELIVERY_ADDRESS],
    },
    {
      id: 'step2',
      name: 'step2',
      routeName: 'route2',
      type: [CheckoutStepType.DELIVERY_MODE],
    },
  ]);
  getCheckoutStepRoute = createSpy().and.returnValue(
    mockCheckoutStep.routeName
  );
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getDeliveryEntries = createSpy().and.returnValue(of(mockEntries));
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-card',
  template: '',
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

describe('CheckoutReviewShippingComponent', () => {
  let component: CheckoutReviewShippingComponent;
  let fixture: ComponentFixture<CheckoutReviewShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        IconTestingModule,
        OutletModule,
      ],
      declarations: [
        CheckoutReviewShippingComponent,
        MockUrlPipe,
        MockCardComponent,
      ],
      providers: [
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressService,
        },
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: MockCheckoutDeliveryModesService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: createSpy('markForCheck') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get delivery entries', () => {
    let entries: OrderEntry[] | undefined;
    component.entries$.subscribe((data: OrderEntry[]) => {
      entries = data;
    });

    expect(entries).toEqual(mockEntries);
  });

  it('should be able to get deliveryAddress', () => {
    let deliveryAddress: Address | undefined;
    component.deliveryAddress$.subscribe((data) => {
      deliveryAddress = data;
    });

    expect(deliveryAddress).toEqual(mockAddress);
  });

  it('should be able to get deliveryMode if a mode is selected', () => {
    let deliveryMode: DeliveryMode | undefined;
    component.deliveryMode$.subscribe((data) => {
      deliveryMode = data;
    });

    expect(deliveryMode).toEqual(mockDeliveryMode);
  });

  it('should call getDeliveryAddressCard(deliveryAddress, countryName) to get address card data', () => {
    component
      .getDeliveryAddressCard(mockAddress, 'Canada')
      .subscribe((card) => {
        expect(card.title).toEqual('addressCard.shipTo');
        expect(card.textBold).toEqual('John Doe');
        expect(card.text).toEqual([
          'Toyosaki 2 create on cart',
          'line2',
          'town, JP-27, Canada',
          'zip',
          undefined,
        ]);
      });
  });

  it('should call getDeliveryModeCard(deliveryMode) to get delivery mode card data', () => {
    const selectedMode: DeliveryMode = {
      code: 'standard-gross',
      name: 'Standard gross',
      description: 'Standard Delivery description',
      deliveryCost: {
        formattedValue: '$9.99',
      },
    };
    component.getDeliveryModeCard(selectedMode).subscribe((card) => {
      expect(card.title).toEqual('checkoutMode.deliveryMethod');
      expect(card.textBold).toEqual('Standard gross');
      expect(card.text).toEqual(['Standard Delivery description', '$9.99']);
    });
  });

  it('should get checkout step route', () => {
    expect(component.deliveryAddressStepRoute).toEqual(
      mockCheckoutStep.routeName
    );
  });
});
