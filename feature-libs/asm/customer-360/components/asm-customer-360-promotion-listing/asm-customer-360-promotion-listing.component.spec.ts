import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmCustomer360PromotionListingComponent } from './asm-customer-360-promotion-listing.component';
import { GlobalMessageType, I18nTestingModule } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { PromotionListEntry } from './asm-customer-360-promotion-listing.model';
import { ICON_TYPE } from '@spartacus/storefront';

describe('AsmCustomer360PromotionListingComponent', () => {
  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  @Component({
    selector: 'cx-message',
    template: '',
  })
  class MockCxMessageComponent {
    @Input() text: string;
    @Input() type: GlobalMessageType;
    @Output() closeMessage = new EventEmitter();
  }

  const mockEntries: Array<PromotionListEntry> = [
    {
      code: 'COUPON_1',
      name: 'NAME OF COUPON_1',
      applied: true,
    },
    {
      code: 'COUPON_2',
      name: 'NAME OF COUPON_2',
      applied: false,
    },
    {
      code: 'COUPON_3',
      name: 'NAME OF COUPON_3',
      applied: false,
    },
  ];

  const mockEmptyText = 'empty list';
  const mockHeaderText = 'Header Text';

  @Component({
    selector: 'cx-test-host',
    template: `
      <cx-asm-customer-360-promotion-listing
        [emptyStateText]="emptyStateText"
        [headerText]="headerText"
        [entries]="entries"
        [showAlert]="showAlert"
        [showAlertForApplyAction]="showAlertForApplyAction"
        (apply)="applyCouponToCustomer($event)"
        (remove)="removeCouponToCustomer($event)"
        (removeAlert)="closeErrorAlert()"
        (removeAlertForApplyAction)="closeErrorAlertForApplyAction()"
        [applyButtonText]="applyButtonText"
        [applied]="applied"
        [removeButtonText]="removeButtonText"
        [showRemoveButton]="true"
        [showApplyButton]="true"
      >
      </cx-asm-customer-360-promotion-listing>
    `,
  })
  class TestHostComponent {
    @Input() headerText: string;
    @Input() emptyStateText: string;
    @Input() applyButtonText: string;
    @Input() applied: string;
    @Input() removeButtonText: string;
    @Input() entries: Array<PromotionListEntry> | null;
    @Input() showAlert: boolean | null;
    @Input() showAlertForApplyAction: boolean | null;
    @Input() showRemoveButton: boolean;
    @Input() showApplyButton: boolean;
    apply = void {};
    remove = void {};
    removeAlert = void {};
    removeAlertForApplyAction = void {};
  }

  let component: AsmCustomer360PromotionListingComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        TestHostComponent,
        AsmCustomer360PromotionListingComponent,
        MockCxIconComponent,
        MockCxMessageComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(AsmCustomer360PromotionListingComponent)
    ).componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    testHost.headerText = mockHeaderText;
    fixture.detectChanges();

    const header = el.query(
      By.css('.cx-asm-customer-360-promotion-listing-heading-text')
    );
    expect(header.nativeElement.innerText).toBe(mockHeaderText);
  });

  it('should display entries list', () => {
    testHost.entries = mockEntries;
    fixture.detectChanges();

    const entriesList = el.query(
      By.css('.cx-asm-customer-360-promotion-listing')
    );
    expect(entriesList).toBeTruthy();

    const listTableBody = el.query(By.css('table'));

    const rows = listTableBody.queryAll(
      By.css('.cx-asm-customer-360-promotion-listing-row')
    );
    expect(rows.length).toBe(mockEntries.length);
  });

  it('should display empty message when entries is empty', () => {
    testHost.emptyStateText = mockEmptyText;
    testHost.entries = [];
    fixture.detectChanges();

    const emptyMessage = el.query(
      By.css('.cx-asm-customer-360-promotion-listing-empty')
    );

    expect(emptyMessage).toBeTruthy();
  });

  it('should show meaasge when entries loaded failed', () => {
    testHost.showAlert = true;
    fixture.detectChanges();
    expect(el.query(By.css('cx-message'))).not.toBeNull();
  });

  it('should show meaasge when action perform failed', () => {
    testHost.showAlertForApplyAction = true;
    fixture.detectChanges();
    expect(el.query(By.css('cx-message'))).not.toBeNull();
  });

  it('should be able to display promotion applied correctly', () => {
    testHost.applied = 'Promotion Applied';
    testHost.entries = mockEntries;
    fixture.detectChanges();
    const ngContainer = el.query(
      By.css('table .cx-asm-customer-360-promotion-listing-applied')
    );
    expect(ngContainer.nativeElement.textContent).toContain(
      'Promotion Applied'
    );
  });
});
