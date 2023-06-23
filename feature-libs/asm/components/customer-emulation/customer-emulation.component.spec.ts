import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { CustomerEmulationComponent } from './customer-emulation.component';

class MockUserAccountFacade implements Partial<UserAccountFacade> {
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
  let userAccountFacade: UserAccountFacade;
  let asmComponentService: AsmComponentService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CustomerEmulationComponent, MockFeatureLevelDirective],
        providers: [
          { provide: UserAccountFacade, useClass: MockUserAccountFacade },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userAccountFacade = TestBed.inject(UserAccountFacade);
    asmComponentService = TestBed.inject(AsmComponentService);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info during customer emulation.', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userAccountFacade, 'get').and.returnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-asm-customerInfo .cx-asm-name')).nativeElement
        .innerHTML
    ).toEqual(`${testUser.name}`);
    expect(
      el.query(By.css('.cx-asm-customerInfo .cx-asm-uid')).nativeElement
        .innerHTML
    ).toEqual(`${testUser.uid}`);
    expect(el.query(By.css('dev.fd-alert'))).toBeFalsy();
  });

  it("should call logoutCustomer() on 'End Emulation' button click", () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(userAccountFacade, 'get').and.returnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(
      By.css('button[formControlName="logoutCustomer"]')
    );
    spyOn(asmComponentService, 'logoutCustomer').and.stub();
    endSessionButton.nativeElement.click();

    //assert
    expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
  });
});
