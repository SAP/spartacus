// import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService, UserToken } from '../../auth/index';
// import { CartService } from './cart.service';
import { ActiveCartService } from './active-cart.service';
import { MultiCartService } from './multi-cart.service';

const userToken$ = new ReplaySubject<UserToken>();

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

class MultiCartServiceStub {}

xdescribe('ActiveCartService', () => {
  // let service: ActiveCartService;
  // let multiCartService: MultiCartService;
  // let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActiveCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });
    // service = TestBed.get(CartService as Type<ActiveCartService>);
    // multiCartService = TestBed.get(ActiveCartService as Type<MultiCartService>);
    // authService = TestBed.get(AuthService as Type<AuthService>)
  });
});
