import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { LanguageService } from '@spartacus/core';
import { I18nTestingModule, TranslationService } from 'projects/core/src/i18n';
import { Observable, ReplaySubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { EstimatedDeliveryDateComponent } from './estimated-delivery-date.component';
import { ArrivalSlots } from '../../model';
import { Consignment, Order, OrderHistoryFacade } from '@spartacus/order/root';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}
class MockOrderHistoryFacade {
  private mockOrderWithConsignments: Order = {
    consignments: [
      { ArrivalSlot: { at: new Date('2024-05-03T10:00:00Z') } } as Consignment,
    ],
  };

  getOrderDetails(): Observable<Order> {
    return of(this.mockOrderWithConsignments);
  }
}

class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return of('');
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

@Component({
  selector: 'cx-estimated-delivery-date',
  template: '',
})
class MockConfigureEstimatedDeliveryDateComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<ArrivalSlots>>;
}

describe('EstimatedDeliveryDateCartEntryComponent', () => {
  let component: EstimatedDeliveryDateComponent;
  let fixture: ComponentFixture<EstimatedDeliveryDateComponent>;
  let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;
  let mockOrderHistoryFacade: MockOrderHistoryFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
        declarations: [
          EstimatedDeliveryDateComponent,
          MockConfigureEstimatedDeliveryDateComponent,
        ],
        providers: [
          { provide: CartItemContext, useClass: MockCartItemContext },
          { provide: OrderHistoryFacade, useClass: MockOrderHistoryFacade },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedDeliveryDateComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
    mockOrderHistoryFacade = TestBed.inject(OrderHistoryFacade) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: Partial<OrderEntry & Array<ArrivalSlots>> = {
      orderCode: '123',
      arrivalSlots: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should expose consignments$', (done) => {
    component.consignments$.pipe(take(1)).subscribe((value) => {
      expect(value).toBeTruthy;
      done();
    });

    mockOrderHistoryFacade.getOrderDetails().pipe();
  });

  it('should return empty string when no date is provided', () => {
    const date = component.getLongDate();

    expect(date).toEqual('');
  });

  describe('estimated delivery date', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        arrivalSlots: undefined,
      });

      const htmlElem = fixture.nativeElement;
      expect(
        htmlElem.querySelectorAll('.cx-estimated-delivery-date-info').length
      ).toBe(0);
    });

    it('should return true if Consignment ArrivalSlot exists', () => {
      const consignmentWithSlot: Consignment = {
        arrivalSlot: { at: new Date() },
      };
      const result =
        component.hasConsignmentEntryArrivalSlot(consignmentWithSlot);
      expect(result).toBeTruthy();
    });

    it('should return false if Consignment ArrivalSlot does not exist', () => {
      const consignmentWithoutSlot: Consignment = {
        arrivalSlot: undefined,
      };
      const result = component.hasConsignmentEntryArrivalSlot(
        consignmentWithoutSlot
      );
      expect(result).toBeFalsy();
    });

    it('should be displayed if model provides data', () => {
      mockCartItemContext.item$.next({
        arrivalSlots: [
          {
            at: new Date('2022-05-22T00:00:00+0000'),
            quantity: 1,
          },
          {
            at: new Date('2022-05-10T00:00:00+0000'),
            quantity: 3,
          },
        ],
      });

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(
        htmlElem.querySelectorAll('.cx-estimated-delivery-date-info').length
      ).toBe(2);
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          arrivalSlots: [
            {
              at: new Date('2022-05-22T00:00:00+0000'),
              quantity: 1,
            },
          ],
        });

        fixture.detectChanges();
      });

      it("should contain div element with class name 'cx-visually-hidden' that contains a hidden estimated delivery date info", function () {
        const divElementWithVisuallyHiddenClass = htmlElem.querySelector(
          '.cx-visually-hidden'
        );

        expect(divElementWithVisuallyHiddenClass?.innerHTML).toContain(
          'estimatedDeliveryDate.estimatedDeliveryDateEntryInfo'
        );
      });

      it("should contain div element with 'cx-estimated-delivery-date-info' and aria-describedby attribute that refers to a corresponding attribute-value pair", () => {
        const divElementWithEstimatedDeliveryDateInfoClass =
          htmlElem.querySelector('.cx-estimated-delivery-date-info');

        expect(
          divElementWithEstimatedDeliveryDateInfoClass?.attributes?.hasOwnProperty(
            'aria-describedby'
          )
        );
        expect(
          divElementWithEstimatedDeliveryDateInfoClass?.getAttribute(
            'aria-describedby'
          )
        ).toEqual('cx-estimated-delivery-date-info-0');
      });

      it('should contain div elements for label and value with corresponding content', () => {
        const divElementWithCxLabelClass = htmlElem.querySelector('.cx-label');

        expect(
          divElementWithCxLabelClass?.attributes?.hasOwnProperty('aria-hidden')
        );
        expect(divElementWithCxLabelClass?.ariaHidden).toEqual('true');

        const divElementWithCxValueClasses =
          htmlElem.querySelectorAll('.cx-value');

        expect(
          divElementWithCxValueClasses[0]?.attributes?.hasOwnProperty(
            'aria-hidden'
          )
        );

        expect(
          divElementWithCxValueClasses[1]?.attributes?.hasOwnProperty(
            'aria-hidden'
          )
        );
      });
    });
  });
});
