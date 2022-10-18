import { TestBed } from '@angular/core/testing';
import { BindCartParams } from '@spartacus/asm/root';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmBindCartService } from './asm-bind-cart.service';

class MockAsmConnector implements Partial<AsmConnector> {
  bindCart(_: BindCartParams): Observable<unknown> {
    return of(undefined);
  }
}
class MockUserAccountFacade implements Partial<UserAccountFacade> {
  public get(): Observable<User> {
    return of({
      customerId: 'mock-customer-id',
      uid: 'mock-customer-uid',
    });
  }
}

describe('AsmBindCartService', () => {
  let service: AsmBindCartService;
  let asmConnector: AsmConnector;
  let userAccountFacade: UserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AsmBindCartService,
        { provide: AsmConnector, useClass: MockAsmConnector },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    service = TestBed.inject(AsmBindCartService);
    asmConnector = TestBed.inject(AsmConnector);
    userAccountFacade = TestBed.inject(UserAccountFacade);

    spyOn(asmConnector, 'bindCart').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should bind the cart with the current user', () => {
    spyOn(userAccountFacade, 'get').and.callThrough();
    const inputCartId = '0123456789';
    const expected: BindCartParams = {
      cartId: inputCartId,
      customerId: 'mock-customer-uid',
    };

    service.bindCart(inputCartId).subscribe();

    expect(userAccountFacade.get).toHaveBeenCalled();
    expect(asmConnector.bindCart).toHaveBeenCalledWith(expected);
  });
});
