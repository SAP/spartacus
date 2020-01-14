import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Consignment,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  PromotionResult,
} from '@spartacus/core';
import { CardModule } from '../../../../../../shared/components/card/card.module';
import { OrderConsignedEntriesComponent } from './order-consigned-entries.component';

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input()
  isReadOnly = false;
  @Input()
  hasHeader = true;
  @Input()
  items = [];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading = false;
}

@Component({
  selector: 'cx-consignment-tracking',
  template: '',
})
class MockConsignmentTrackingComponent {
  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
}

describe('OrderConsignedEntriesComponent', () => {
  let component: OrderConsignedEntriesComponent;
  let fixture: ComponentFixture<OrderConsignedEntriesComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardModule, I18nTestingModule, FeaturesConfigModule],
      providers: [
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.1', consignmentTracking: '1.2' },
          },
        },
      ],
      declarations: [
        OrderConsignedEntriesComponent,
        MockCartItemListComponent,
        MockConsignmentTrackingComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConsignedEntriesComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order consignment entries be rendered', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-list'))).toBeTruthy();
  });
});
