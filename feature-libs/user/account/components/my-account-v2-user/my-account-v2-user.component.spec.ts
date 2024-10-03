import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountV2UserComponent } from './my-account-v2-user.component';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
  User,
} from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccountFacade } from '../../root/facade';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import createSpy = jasmine.createSpy;
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockAuthService {
  login = createSpy();
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): void {}
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
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [MyAccountV2UserComponent, MockUrlPipe],
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
