import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { ReturnRequest } from '@spartacus/order/root';
import { MediaComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import { ReturnRequestItemsComponent } from './return-request-items.component';

const mockReturnRequest: ReturnRequest = {
  rma: 'test',
  returnEntries: [],
};
class MockCheckoutService {
  getReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

describe('ReturnRequestItemsComponent', () => {
  let component: ReturnRequestItemsComponent;
  let fixture: ComponentFixture<ReturnRequestItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReturnRequestItemsComponent],
      providers: [
        { provide: ReturnRequestService, useClass: MockCheckoutService },
      ],
    })
      .overrideComponent(ReturnRequestItemsComponent, {
        remove: { imports: [TranslatePipe, MediaComponent] },
        add: { imports: [MockTranslatePipe, MockMediaComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
