import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  AuthService,
  MockTranslatePipe,
  MockTranslationService,
  RoutingService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
  User,
} from '@spartacus/core';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { Observable, of } from 'rxjs';
import { UserAccountFacade } from '../../root/facade';
import { MyAccountV2UserComponent } from './my-account-v2-user.component';
import createSpy = jasmine.createSpy;

class MockAuthService {
  login = createSpy();
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
  isUsingASMClient(): Observable<boolean> {
    return of(false);
  }
}

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

class MockRoutingService {
  go = createSpy('go');
}
class MockUserAccountFacade {
  get(): Observable<User> {
    return of(mockUserDetails);
  }
  load(): void {}
}

describe('MyAccountV2UserComponent', () => {
  let component: MyAccountV2UserComponent;
  let fixture: ComponentFixture<MyAccountV2UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountV2UserComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
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
    })
      .overrideComponent(MyAccountV2UserComponent, {
        remove: { imports: [TranslatePipe, UrlPipe] },
        add: { imports: [MockTranslatePipe, MockUrlPipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2UserComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should see user name when the user is logged in', () => {
    expect(fixture.debugElement.query(By.css('.cx-name'))).not.toBeNull();
  });

  it('should display signout when the user is logged in', () => {
    expect(fixture.debugElement.query(By.css('.cx-sign-out'))).not.toBeNull();
  });
});
