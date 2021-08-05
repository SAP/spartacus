import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderEntry } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import { CancelOrderComponent } from './cancel-order.component';

const mockForm = new FormGroup({
  orderCode: new FormControl('123'),
  entries: new FormControl([]),
});

class MockOrderAmendService {
  getForm() {
    return of(mockForm);
  }
  getEntries() {}
}

@Component({
  template: '',
  selector: 'cx-amend-order-items',
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
}

@Component({
  template: '',
  selector: 'cx-amend-order-actions',
})
class MockAmendOrderActionComponent {
  @Input() orderCode: string;
  @Input() amendOrderForm: FormGroup;
  @Input() backRoute: string;
  @Input() forwardRoute: string;
}

describe('CancelOrderComponent', () => {
  let component: CancelOrderComponent;
  let fixture: ComponentFixture<CancelOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, FormErrorsModule],
        providers: [
          { provide: OrderAmendService, useClass: MockOrderAmendService },
        ],
        declarations: [
          CancelOrderComponent,
          MockAmendOrderActionComponent,
          MockCancelOrReturnItemsComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an order code', () => {
    component.form$.subscribe().unsubscribe();
    expect(component.orderCode).toEqual('123');
  });

  it('should render two cx-amend-order-actions components', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('cx-amend-order-actions')).length
    ).toEqual(2);
  });

  it('should render cx-amend-order-items component', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('cx-amend-order-actions')).length
    ).toEqual(2);
  });
});
