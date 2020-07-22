import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderCancellationGuard } from './order-cancellation.guard';
import { OrderCancellationService } from './order-cancellation.service';

const FORM_STATE_VALUE = 10;
const VALUE = 100;
const mockControl = new FormControl(FORM_STATE_VALUE, {
  validators: [Validators.min(VALUE)],
});
const mockForm = new FormGroup({
  any: mockControl,
});

class MockRoutingService {
  go() {}
}

class MockOrderCancellationService {
  getForm(): Observable<FormGroup> {
    return of(new FormGroup({}));
  }
}

describe(`OrderCancellationGuard`, () => {
  let guard: OrderCancellationGuard;
  let service: OrderCancellationService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: OrderCancellationService,
          useClass: MockOrderCancellationService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(OrderCancellationGuard);
    service = TestBed.inject(OrderCancellationService);
    routing = TestBed.inject(RoutingService);

    spyOn(service, 'getForm').and.returnValue(of(mockForm));
    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the order detail page`, () => {
    let result;
    guard
      .canActivate()
      .subscribe((r) => (result = r))
      .unsubscribe();
    expect(result).toBeFalsy();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the order detail page`, () => {
    mockControl.setValue(VALUE);
    let result;
    guard
      .canActivate()
      .subscribe((r) => (result = r))
      .unsubscribe();
    expect(result).toBeTruthy();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
