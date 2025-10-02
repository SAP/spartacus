import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationService } from '@spartacus/core';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { OutletContextData } from '@spartacus/storefront';
import { ServiceDetailsCardComponent } from './service-details-card.component';
import { of } from 'rxjs';

class MockTranslationService {
  translate() {}
}
class MockCheckoutServiceSchedulePickerService {
  convertDateTimeToReadableString() {}
}

describe('ServiceDetailsCardComponent', () => {
  let component: ServiceDetailsCardComponent;
  let fixture: ComponentFixture<ServiceDetailsCardComponent>;
  let translateService: TranslationService;
  let pickerService: CheckoutServiceSchedulePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ServiceDetailsCardComponent],
    providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: CheckoutServiceSchedulePickerService, useValue: {} },
        { provide: OutletContextData, useValue: {} },
        {
            provide: CheckoutServiceSchedulePickerService,
            useClass: MockCheckoutServiceSchedulePickerService,
        },
    ],
}).compileComponents();
    fixture = TestBed.createComponent(ServiceDetailsCardComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslationService);
    pickerService = TestBed.inject(CheckoutServiceSchedulePickerService);
    spyOn(translateService, 'translate')
      .withArgs('serviceOrderCheckout.serviceDetails')
      .and.returnValue(of('card title'))
      .withArgs('serviceOrderCheckout.cardLabel')
      .and.returnValue(of('card bold text'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return card with details', () => {
    spyOn(pickerService, 'convertDateTimeToReadableString').and.returnValue(
      '2023/12/12, 12:00'
    );
    component.getServiceDetailsCard('2023/12/12TY12:00').subscribe((card) => {
      expect(card).toEqual({
        title: 'card title',
        textBold: '2023/12/12',
        text: ['12:00'],
      });
    });
  });
  it('should return empty card', () => {
    component.getServiceDetailsCard(undefined).subscribe((card) => {
      expect(card).toEqual({
        title: 'card title',
        textBold: undefined,
        text: [''],
      });
    });
  });

  it('should call ngOnDestroy', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should set order property when context changes', () => {
    const order = { code: '123', servicedAt: '2023/12/12TY12:00' } as any;
    component['orderOutlet'] = {
      context$: of({ item: order }),
    } as OutletContextData<any>;
    component.ngOnInit();
    expect(component.order).toEqual(order);
  });

  it('should show service details card in order summary only if order contains service products', () => {
    component.order = {
      entries: [
        { product: { productTypes: 'SERVICE' } },
        { product: { productTypes: 'PHYSICAL' } },
      ],
    } as any;
    expect(component.showServiceDetails()).toEqual(true);
  });
  it('should not show service details card in order summary if order doesnot contains service products', () => {
    component.order = {
      entries: [
        { product: { productTypes: 'PHYSICAL' } },
        { product: { productTypes: 'PHYSICAL' } },
      ],
    } as any;
    expect(component.showServiceDetails()).toEqual(false);
  });
  it('should not show service details card in order summary if order doesnot contains any entries', () => {
    component.order = {} as any;
    expect(component.showServiceDetails()).toEqual(false);
  });
});
