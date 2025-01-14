import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import createSpy = jasmine.createSpy;

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

class MockAuthService {
  login = createSpy();
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}
class MockRoutingService {
  go = createSpy('go');
}
class MockUserAccountFacade {
  get(): Observable<User> {
    return of(mockUserDetails);
  }
  load(): void {}
}

@Component({
  selector: 'cx-page-slot',
  template: `
    <cx-navigation-ui>
      <nav>
        <ul>
          <li>
            <button>Navigation Trigger</button>
          </li>
        </ul>
      </nav>
    </cx-navigation-ui>
  `,
})
class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): void {}
}

let expectedGreeting = `miniLogin.userGreeting name:${mockUserDetails.name}`;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [LoginComponent, MockDynamicSlotComponent, MockUrlPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  canActivate: [{ GUARD_NAME: 'AuthGuard' }],
                },
              },
            },
          },
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have user details when token exists', () => {
    let user;
    component.user$.subscribe((result) => (user = result));
    expect(user).toEqual(mockUserDetails);
  });

  it('should have greeting details when token exists', () => {
    let greeting;
    component.greeting$.subscribe((result) => (greeting = result));
    expect(greeting).toEqual(expectedGreeting);
  });

  it('should not get user details when token is lacking', () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));

    let user;
    component.ngOnInit();
    component.user$.subscribe((result) => (user = result));
    expect(user).toBeFalsy();
  });

  describe('UI tests', () => {
    it('should contain the dynamic slot: HeaderLinks', () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('cx-page-slot[position="HeaderLinks"]')
        )
      ).not.toBeNull();
    });

    it('should display greeting message when the user is logged in', () => {
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        expectedGreeting
      );
    });

    it('should display the register message when the user is not logged in', () => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'miniLogin.signInRegister'
      );
    });

    it('should contain the dynamic slot: HeaderLinks', () => {
      spyOn(component, 'onRootNavBtnAdded').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      expectedGreeting = 'Testing;';
      const expectedRootNavBtn = fixture.debugElement.query(
        By.css('cx-navigation-ui nav ul li:first-child button')
      );
      const mockedMutation = {
        target: expectedRootNavBtn.nativeNode,
      } as MutationRecord;
      expect(expectedRootNavBtn.nativeElement.ariaLabel).toBe(null);
      component.onRootNavBtnAdded(mockedMutation, expectedGreeting);
      expect(expectedRootNavBtn).not.toBeNull();
      expect(expectedRootNavBtn.nativeElement.ariaLabel).toBe(expectedGreeting);
    });
  });
});
