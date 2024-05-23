import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { Card, OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderOverviewDeliveryDateComponent } from './order-overview-delivery-date.component';

describe('OrderOverviewDeliveryDateComponent', () => {
  let component: OrderOverviewDeliveryDateComponent;
  let fixture: ComponentFixture<OrderOverviewDeliveryDateComponent>;

  const translationServiceMock = {
    translate: jasmine
      .createSpy('translate')
      .and.returnValue(of('Translated Text')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderOverviewDeliveryDateComponent],
      imports: [I18nTestingModule],
      providers: [
        { provide: TranslationService, useValue: translationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewDeliveryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set order property when context changes', () => {
    const order = { code: '123' } as any;
    component['orderOutlet'] = {
      context$: of({ item: order }),
    } as OutletContextData<any>;
    component.ngOnInit();
    expect(component.order).toEqual(order);
  });

  it('should return card content with translated text and isoDate', () => {
    const isoDate = '2022-01-01';
    const expectedCard: Card = {
      title: 'Translated Text',
      text: [isoDate],
    };

    const result$ = component.getRequestedDeliveryDateCardContent(isoDate);

    result$.subscribe((card) => {
      expect(card).toEqual(expectedCard);
    });
  });

  it('should unsubscribe from subscription on component destruction', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
