import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderCancellationService } from '../order-cancellation.service';
import { OrderCancellationGuard } from './order-cancellation.guard';

const mockControl = new FormControl(10, { validators: [Validators.min(100)] });
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

    guard = TestBed.get(OrderCancellationGuard as Type<OrderCancellationGuard>);
    service = TestBed.get(OrderCancellationService as Type<
      OrderCancellationService
    >);
    routing = TestBed.get(RoutingService as Type<RoutingService>);

    spyOn(service, 'getForm').and.returnValue(of(mockForm));
    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the order detail page`, () => {
    let result;
    guard
      .canActivate()
      .subscribe(r => (result = r))
      .unsubscribe();
    expect(result).toBeFalsy();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the order detail page`, () => {
    mockControl.setValue(100);
    let result;
    guard
      .canActivate()
      .subscribe(r => (result = r))
      .unsubscribe();
    expect(result).toBeTruthy();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
