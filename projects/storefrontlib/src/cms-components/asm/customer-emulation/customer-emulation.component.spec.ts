import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CustomerEmulationComponent } from './customer-emulation.component';

class MockRoutingService {
  go() {}
}

class MockAuthService {
  logout(): void {}
}

class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

describe('CustomerEmulationComponent', () => {
  let component: CustomerEmulationComponent;
  let fixture: ComponentFixture<CustomerEmulationComponent>;
  let userService: UserService;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerEmulationComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info during customer emulation.', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      el.query(By.css('input[formcontrolname="customer"]')).nativeElement
        .placeholder
    ).toEqual(`${testUser.name}, ${testUser.uid}`);
  });

  it("should call endSession() on 'End Session' button click", () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(
      By.css('.fd-button--negative')
    );
    spyOn(component, 'endSession');
    endSessionButton.nativeElement.click();

    //assert
    expect(component.endSession).toHaveBeenCalled();
  });

  it('should route back to homepage on end session button click', () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(
      By.css('.fd-button--negative')
    );
    spyOn(routingService, 'go');
    endSessionButton.nativeElement.click();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
});
