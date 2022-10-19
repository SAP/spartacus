import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderReturnGuard } from './order-return.guard';
import { OrderReturnService } from './order-return.service';

const mockControl = new UntypedFormControl(10, {
  validators: [Validators.min(100)],
});
const mockForm = new UntypedFormGroup({
  any: mockControl,
});

class MockOrderReturnService implements Partial<OrderReturnService> {
  getForm(): Observable<UntypedFormGroup> {
    return of(new UntypedFormGroup({}));
  }
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe(`OrderReturnGuard`, () => {
  let guard: OrderReturnGuard;
  let service: OrderReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
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

    spyOn(service, 'getForm').and.returnValue(of(mockForm));
  });

  it(`should redirect to the order detail page`, () => {
    let result: boolean | UrlTree;
    guard
      .canActivate()
      .subscribe((r) => (result = r))
      .unsubscribe();
    expect(result.toString()).toEqual('/orders');
  });

  it(`should return true when the form data is valid`, () => {
    mockControl.setValue(100);
    let result: boolean | UrlTree;
    guard
      .canActivate()
      .subscribe((r) => (result = r))
      .unsubscribe();
    expect(result).toBeTrue();
  });
});
