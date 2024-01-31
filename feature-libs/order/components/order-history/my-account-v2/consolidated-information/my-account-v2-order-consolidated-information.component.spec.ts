import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Images, TranslationService } from '@spartacus/core';
import { MyAccountV2OrderConsignmentsService } from '@spartacus/order/components';
import { OrderHistoryView } from '@spartacus/order/root';
import { MediaContainer } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { MyAccountV2OrderConsolidatedInformationComponent } from './my-account-v2-order-consolidated-information.component';
import createSpy = jasmine.createSpy;

const mock_order1: OrderHistoryView = {
  code: 'order1',
  statusDisplay: 'cancelled',
  entries: [
    { product: { images: { PRIMARY: { thumbnail: {} } } } },
    { product: { images: { PRIMARY: { thumbnail: {} } } } },
    { product: { images: { PRIMARY: { thumbnail: {} } } } },
    { product: { images: { PRIMARY: { thumbnail: {} } } } },
    { product: { images: { PRIMARY: { thumbnail: {} } } } },
  ],
  unconsignedEntries: [{}, {}],
  consignments: [
    { code: 'cons1', entries: [{}, {}, {}] },
    { code: 'cons2', entries: [{}, {}] },
  ],
  returnRequests: [],
};
const mock_images: Images[] = [
  { PRIMARY: { thumbnail: {} } },
  { PRIMARY: { thumbnail: {} } },
  { PRIMARY: { thumbnail: {} } },
  { PRIMARY: { thumbnail: {} } },
];

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: MediaContainer;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockMyAccountV2OrderConsignmentsService
  implements Partial<MyAccountV2OrderConsignmentsService>
{
  getGroupedConsignments = createSpy();
  getUnconsignedEntries = createSpy();
}

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

describe('MyAccountV2OrderConsolidatedInformationComponent', () => {
  let component: MyAccountV2OrderConsolidatedInformationComponent;
  let fixture: ComponentFixture<MyAccountV2OrderConsolidatedInformationComponent>;
  let service: MyAccountV2OrderConsignmentsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          MyAccountV2OrderConsolidatedInformationComponent,
          MockUrlPipe,
          MockMediaComponent,
        ],
        providers: [
          {
            provide: MyAccountV2OrderConsignmentsService,
            useClass: MockMyAccountV2OrderConsignmentsService,
          },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
      service = TestBed.inject(MyAccountV2OrderConsignmentsService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      MyAccountV2OrderConsolidatedInformationComponent
    );
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should return no.of consignments', () => {
    let result = component.getConsignmentsCount(mock_order1.consignments ?? []);
    expect(result).toEqual(5);
  });
  it('should return no.of order entries', () => {
    let result = component.getOrderEntriesCount(mock_order1.unconsignedEntries);
    expect(result).toEqual(2);
  });
  it('should return if order status is critical or not', () => {
    let result1 = component.isStatusCritical('pending');
    expect(result1).toEqual(false);
    let result2 = component.isStatusCritical('cancelled');
    expect(result2).toEqual(true);
  });
  it('should return pickup consignments', () => {
    service.getGroupedConsignments = createSpy().and.stub();
    component.getPickupConsignments(mock_order1.consignments ?? []);
    expect(service.getGroupedConsignments).toHaveBeenCalled();
  });
  it('should return delivery consignments', () => {
    service.getGroupedConsignments = createSpy().and.stub();
    component.getDeliveryConsignments(mock_order1.consignments ?? []);
    expect(service.getGroupedConsignments).toHaveBeenCalled();
  });
  it('should return delivery unconsigned consignments', () => {
    service.getUnconsignedEntries = createSpy().and.stub();
    component.getDeliveryUnconsignedEntries(
      mock_order1.unconsignedEntries ?? []
    );
    expect(service.getUnconsignedEntries).toHaveBeenCalled();
  });
  it('should return pickup unconsigned consignments', () => {
    service.getUnconsignedEntries = createSpy().and.stub();
    component.getPickupUnconsignedEntries(mock_order1.unconsignedEntries ?? []);
    expect(service.getUnconsignedEntries).toHaveBeenCalled();
  });
  it('should return product images', () => {
    let result = component.getProductImages(mock_order1.entries ?? []);
    expect(result).toEqual(mock_images);
  });
  it('should load template tags', () => {
    component.order = mock_order1;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-consolidated-order-info'))
    ).toBeTruthy();
  });
});
