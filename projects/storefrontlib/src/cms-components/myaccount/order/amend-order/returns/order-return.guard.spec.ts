import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderReturnGuard } from './order-return.guard';
import { OrderReturnService } from './order-return.service';

const STATE_TEN = 10;
const VALUE_HUNDRED = 100;

const mockControl = new FormControl(STATE_TEN, {
  validators: [Validators.min(VALUE_HUNDRED)],
});
const mockForm = new FormGroup({
  any: mockControl,
});

class MockRoutingService {
  go() {}
}

class MockOrderReturnService {
  getForm(): Observable<FormGroup> {
    return of(new FormGroup({}));
  }
}

describe(`OrderReturnGuard`, () => {
  let guard: OrderReturnGuard;
  let service: OrderReturnService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: OrderReturnService,
          useClass: MockOrderReturnService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(OrderReturnGuard);
    service = TestBed.inject(OrderReturnService);
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
    mockControl.setValue(VALUE_HUNDRED);
    let result;
    guard
      .canActivate()
      .subscribe((r) => (result = r))
      .unsubscribe();
    expect(result).toBeTruthy();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
