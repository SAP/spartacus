import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
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

class MockRoutingService {
  go = createSpy('go');
}
class MockUserService {
  get(): Observable<User> {
    return of(mockUserDetails);
  }
  load(): void {}
}

@Component({
  selector: 'cx-page-slot',
  template: '',
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

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userService: MockUserService;

  beforeEach(async(() => {
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
        { provide: UserService, useClass: MockUserService },
      ],
    }).compileComponents();

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    it('should contain the dynamic slot: HeaderLinks', () => {
      spyOn(userService, 'get').and.returnValue(of(mockUserDetails));

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('cx-page-slot[position="HeaderLinks"]')
        )
      ).not.toBeNull();
    });

    it('should display greeting message when the user is logged in', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'login.userGreeting name:First Last'
      );
    });

    it('should display the register message when the user is not logged in', () => {
      spyOn(userService, 'get').and.returnValue(of({} as User));
      component.ngOnInit();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'login.signInRegister'
      );
    });
  });
});
