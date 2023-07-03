import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { PickupInStoreOrderConsignmentContainerComponent } from './pickup-in-store-order-consignment-container.component';

describe('PickupInStoreOrderConsignmentContainerComponent', () => {
  let component: PickupInStoreOrderConsignmentContainerComponent;
  let fixture: ComponentFixture<PickupInStoreOrderConsignmentContainerComponent>;

  const mockProduct = { product: { code: 'test' } };

  const mockOrder: Order = {
    code: '1',
    statusDisplay: 'Shipped',
    deliveryAddress: {
      firstName: 'John',
      lastName: 'Smith',
      line1: 'Buckingham Street 5',
      line2: '1A',
      phone: '(+11) 111 111 111',
      postalCode: 'MA8902',
      town: 'London',
      country: {
        isocode: 'UK',
      },
    },
    deliveryMode: {
      name: 'Standard order-detail-shipping',
      description: '3-5 days',
    },
    paymentInfo: {
      accountHolderName: 'John Smith',
      cardNumber: '************6206',
      expiryMonth: '12',
      expiryYear: '2026',
      cardType: {
        name: 'Visa',
      },
      billingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        line1: 'Buckingham Street 5',
        line2: '1A',
        phone: '(+11) 111 111 111',
        postalCode: 'MA8902',
        town: 'London',
        country: {
          isocode: 'UK',
        },
      },
    },
    created: new Date('2019-02-11T13:02:58+0000'),
    consignments: [
      {
        code: 'a00000341',
        status: 'SHIPPED',
        statusDate: new Date('2019-02-11T13:05:12+0000'),
        entries: [
          {
            orderEntry: mockProduct,
            quantity: 1,
            shippedQuantity: 1,
          },
        ],
      },
    ],
  };
  const mockOutletContext = {
    order: mockOrder,
    item: mockOrder.consignments[0],
  };

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      declarations: [PickupInStoreOrderConsignmentContainerComponent],
      imports: [CommonModule, I18nTestingModule],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(
      PickupInStoreOrderConsignmentContainerComponent
    );
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('with outlet context', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of({ mockOutletContext }),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('without outlet context', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
