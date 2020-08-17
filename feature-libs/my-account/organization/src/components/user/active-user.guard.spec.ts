import { B2BUser, RoutingService, B2BUserService } from "@spartacus/core";
import { of, Observable } from "rxjs";
import { ActiveUserGuard } from "./active-user.guard";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";


const B2B_USER_NOT_ACTIVE = Object.freeze({ active: false });
const B2B_USER_ACTIVE = Object.freeze({ active: true });
const B2B_USER_INVALID = Object.freeze({});

class B2BUserServiceStub {
  get(): Observable<B2BUser> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

fdescribe('ActiveUserGuard', () => {
  let activeUserGuard: ActiveUserGuard;
  let routingService: RoutingService;
  let b2bUserService: B2BUserService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: B2BUserService,
          useClass: B2BUserServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'b2bUserCode' } } }
        },
      ],
      imports: [RouterTestingModule],
    });

    activeUserGuard = TestBed.inject(ActiveUserGuard);
    routingService = TestBed.inject(RoutingService);
    b2bUserService = TestBed.inject(B2BUserService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when user is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(b2bUserService, 'get').and.returnValue(
            of(B2B_USER_NOT_ACTIVE)
          );
        });

        it('then router should redirect to users page', () => {
          activeUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'user',
          });
        });

      });
    });

    describe('when user is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(b2bUserService, 'get').and.returnValue(
            of(B2B_USER_ACTIVE)
          );
        });

        it('then router should not redirect', () => {
          activeUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).not.toHaveBeenCalled()
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activeUserGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });

      });
    });

    describe('when user is not loaded', () => {
      beforeEach(() => {
        spyOn(b2bUserService, 'get').and.returnValue(
          of(B2B_USER_INVALID)
        );
      });

      it('then router should redirect to users page', () => {
        activeUserGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'user',
        });
      });

      it('then returned observable should emit false', () => {
        let emittedValue;

        activeUserGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(false);
      });
    });

  });
});
