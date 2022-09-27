import { TestBed } from '@angular/core/testing';
import { BindCartParams } from '@spartacus/asm/root';
import { UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmBindCartService } from './asm-bind-cart.service';

class MockAsmConnector implements Partial<AsmConnector> {
  bindCart(_: BindCartParams): Observable<unknown> {
    return of(undefined);
  }
}
class MockUserIdService implements Partial<UserIdService> {
  public takeUserId(): Observable<string> {
    return of('mock-user-id');
  }
}

describe('AsmBindCartService', () => {
  let service: AsmBindCartService;
  let asmConnector: AsmConnector;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AsmBindCartService,
        { provide: AsmConnector, useClass: MockAsmConnector },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    service = TestBed.inject(AsmBindCartService);
    asmConnector = TestBed.inject(AsmConnector);
    userIdService = TestBed.inject(UserIdService);

    spyOn(asmConnector, 'bindCart').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should bind the cart using the connector', () => {
    const inputCartId = '0123456789';
    const inputCustomerId = 'mock-customer-id';
    const expected: BindCartParams = {
      cartId: inputCartId,
      customerId: inputCustomerId,
    };

    service.bindCart(inputCartId, inputCustomerId).subscribe();

    expect(asmConnector.bindCart).toHaveBeenCalledWith(expected);
  });

  it('should bind the cart with the current user', () => {
    const inputCartId = '0123456789';
    const expected: BindCartParams = {
      cartId: inputCartId,
      customerId: 'mock-user-id',
    };
    spyOn(userIdService, 'takeUserId').and.callThrough();

    service.bindCart(inputCartId).subscribe();

    expect(userIdService.takeUserId).toHaveBeenCalled();
    expect(asmConnector.bindCart).toHaveBeenCalledWith(expected);
  });
});
