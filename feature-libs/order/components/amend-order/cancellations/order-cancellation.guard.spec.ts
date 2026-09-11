import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RedirectCommand, UrlTree } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderCancellationGuard } from './order-cancellation.guard';
import { OrderCancellationService } from './order-cancellation.service';
import { firstValueFrom } from 'rxjs';

const mockControl = new UntypedFormControl(10, {
  validators: [Validators.min(100)],
});
const mockForm = new UntypedFormGroup({
  any: mockControl,
});

class MockOrderCancellationService
  implements Partial<OrderCancellationService>
{
  getForm(): Observable<UntypedFormGroup> {
    return of(new UntypedFormGroup({}));
  }
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe(`OrderCancellationGuard`, () => {
  let guard: OrderCancellationGuard;
  let service: OrderCancellationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
        {
          provide: OrderCancellationService,
          useClass: MockOrderCancellationService,
        },
      ],
    });

    guard = TestBed.inject(OrderCancellationGuard);
    service = TestBed.inject(OrderCancellationService);

    vi.spyOn(service, 'getForm').mockReturnValue(of(mockForm));

    //prevent test leakages by resetting common values in beforeEach
    mockControl.setValue(10);
  });

  it(`should redirect to the order detail page`, async () => {
    let result: boolean | UrlTree | RedirectCommand | undefined =
      await firstValueFrom(guard.canActivate());
    expect(result?.toString()).toEqual('/orders');
  });

  it(`should return true when the form data is valid`, async () => {
    mockControl.setValue(100);
    let result: boolean | UrlTree | RedirectCommand | undefined =
      await firstValueFrom(guard.canActivate());
    expect(result).toBeTruthy();
  });
});
