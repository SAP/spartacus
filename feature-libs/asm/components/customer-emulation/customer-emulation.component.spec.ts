import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, User, UserService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { CustomerEmulationComponent } from './customer-emulation.component';

class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

class MockAsmComponentService {
  logoutCustomer(): void {}
  isCustomerEmulationSessionInProgress(): Observable<boolean> {
    return of(true);
  }
}

describe('CustomerEmulationComponent', () => {
  let component: CustomerEmulationComponent;
  let fixture: ComponentFixture<CustomerEmulationComponent>;
  let userService: UserService;
  let asmComponentService: AsmComponentService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CustomerEmulationComponent],
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    asmComponentService = TestBed.inject(AsmComponentService);
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
    expect(el.query(By.css('dev.fd-alert'))).toBeFalsy();
  });

  it("should call logoutCustomer() on 'End Session' button click", () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userService, 'get').and.returnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(By.css('button'));
    spyOn(asmComponentService, 'logoutCustomer').and.stub();
    endSessionButton.nativeElement.click();

    //assert
    expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
  });
});
