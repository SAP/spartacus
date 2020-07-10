import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  OrderApproval,
  OrderApprovalDecisionValue,
  OrderApprovalService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderApprovalDetailService } from '../order-approval-detail.service';
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form.component';

const REJECT = OrderApprovalDecisionValue.REJECT;
const APPROVE = OrderApprovalDecisionValue.APPROVE;

const mockOrderApproval = {
  approvalDecisionRequired: true,
  code: '00000005',
  order: {
    code: '00000001',
    totalPriceWithTax: {
      formattedValue: '$9,609.99',
    },
  },
} as OrderApproval;

class MockOrderApprovalDetailService {
  getOrderApproval(): Observable<OrderApproval> {
    return of(mockOrderApproval);
  }
}

@Component({
  selector: 'cx-form-errors',
  template: '',
})
class MockFormErrorsComponent {
  @Input()
  controll: FormControl;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrderApprovalService {
  makeDecision() {}
}

describe('OrderApprovalDetailFormComponent', () => {
  let component: OrderApprovalDetailFormComponent;
  let fixture: ComponentFixture<OrderApprovalDetailFormComponent>;
  let orderApprovalService: OrderApprovalService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderApprovalDetailFormComponent,
        MockFormErrorsComponent,
        MockUrlPipe,
      ],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        {
          provide: OrderApprovalDetailService,
          useClass: MockOrderApprovalDetailService,
        },
        { provide: OrderApprovalService, useClass: MockOrderApprovalService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    orderApprovalService = TestBed.inject(OrderApprovalService);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display approval form when approve order button clicked, and then hide form on cancel.', () => {
    displayAndCancelDecisionForm(APPROVE);
  });

  it('should display rejection form when reject order button clicked, and then hide form on cancel.', () => {
    displayAndCancelDecisionForm(REJECT);
  });

  it('should submit approval form with comment.', () => {
    displayDecisionForm(APPROVE);
    submitDecisionForm(APPROVE);
  });

  it('should submit rejection form with comment.', () => {
    displayDecisionForm(REJECT);
    submitDecisionForm(REJECT);
  });

  it('should have comment as optional for approval.', () => {
    displayDecisionForm(APPROVE);
    expect(component.approvalForm.valid).toBeTrue();
  });

  it('should have comment as optional for rejection.', () => {
    displayDecisionForm(REJECT);
    expect(component.approvalForm.valid).toBeFalse();
  });

  it('should not submit rejection without comment.', () => {
    spyOn(orderApprovalService, 'makeDecision').and.stub();
    displayDecisionForm(REJECT);
    clickButton('orderApproval.form.submit_' + REJECT);
    expect(orderApprovalService.makeDecision).not.toHaveBeenCalled();
  });

  function displayAndCancelDecisionForm(decision: OrderApprovalDecisionValue) {
    assertComponentInitialState();

    displayDecisionForm(decision);

    // Cancel the decision form
    clickButton('orderApproval.form.cancel');
    assertComponentInitialState();
  }

  function displayDecisionForm(decision: OrderApprovalDecisionValue) {
    clickButton('orderApproval.showForm_' + decision);
    expect(component.approvalFormVisible).toBeTruthy();
    expect(el.query(By.css('form'))).toBeTruthy();
    assertButtonPresent('orderApproval.form.cancel');
    assertButtonPresent('orderApproval.form.submit_' + decision);
  }

  function submitDecisionForm(decision: OrderApprovalDecisionValue) {
    spyOn(orderApprovalService, 'makeDecision').and.stub();
    const testComment = 'Decision comment ' + decision;
    component.approvalForm.controls.comment.setValue(testComment);
    clickButton('orderApproval.form.submit_' + decision);
    expect(orderApprovalService.makeDecision).toHaveBeenCalledWith(
      mockOrderApproval.code,
      {
        decision,
        comment: testComment,
      }
    );
  }

  function assertComponentInitialState() {
    // assert initial state
    expect(el.query(By.css('form'))).toBeFalsy();
    expect(component.approvalFormVisible).toBeFalsy();
    assertButtonAbsent('orderApproval.form.cancel');
    assertButtonAbsent('orderApproval.form.submit_APPROVE');
    assertButtonAbsent('orderApproval.form.submit_REJECT');
    assertButtonPresent('orderApproval.showForm_APPROVE');
    assertButtonPresent('orderApproval.showForm_REJECT');
  }

  function getButtonWithLabel(labelKey: string): DebugElement {
    return el
      .queryAll(By.css('button'))
      .find((button) =>
        (button.nativeElement as HTMLElement).textContent.includes(labelKey)
      );
  }

  function clickButton(labelKey: string) {
    getButtonWithLabel(labelKey).nativeElement.click();
    fixture.detectChanges();
  }

  function assertButtonPresent(labelKey: string) {
    expect(getButtonWithLabel(labelKey)).toBeTruthy(
      `Button with label key "${labelKey}" should be present`
    );
  }
  function assertButtonAbsent(labelKey: string) {
    expect(getButtonWithLabel(labelKey)).toBeFalsy(
      `Button with label key "${labelKey}" should NOT be present`
    );
  }
});
