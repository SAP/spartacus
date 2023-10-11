import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FeatureModulesService,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { CustomerEmulationComponent } from './customer-emulation.component';

describe('CustomerEmulationComponent', () => {
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
    handleAsmDialogAction(): void {}
  }

  const dialogClose$ = new BehaviorSubject<any>('');
  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    openDialogAndSubscribe() {}
    get dialogClose() {
      return dialogClose$.asObservable();
    }
  }

  class mockFeatureModulesService implements Partial<FeatureModulesService> {
    isConfigured(): boolean {
      return true;
    }
    resolveFeature(featureName: string): Observable<any> {
      return of(featureName);
    }
  }

  let component: CustomerEmulationComponent;
  let fixture: ComponentFixture<CustomerEmulationComponent>;
  let userAccountFacade: UserAccountFacade;
  let asmComponentService: AsmComponentService;
  let el: DebugElement;
  let featureModulesService: FeatureModulesService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FeaturesConfigModule],
        declarations: [CustomerEmulationComponent, MockFeatureLevelDirective],
        providers: [
          {
            provide: FeatureModulesService,
            useClass: mockFeatureModulesService,
          },
          { provide: UserAccountFacade, useClass: MockUserAccountFacade },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '6.3' },
            },
          },
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
    featureModulesService = TestBed.inject(FeatureModulesService);
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

  it('should open customer 360 dialog', () => {
    const launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialogAndSubscribe').and.stub();

    spyOn(asmComponentService, 'handleAsmDialogAction').and.stub();

    component.openAsmCustomer360();

    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledTimes(1);
    const [caller, , data] = (<jasmine.Spy>(
      launchDialogService.openDialogAndSubscribe
    )).calls.argsFor(0);
    expect(caller).toBe(LAUNCH_CALLER.ASM_CUSTOMER_360);
    expect(data).toEqual({ customer: {} });

    expect(asmComponentService.handleAsmDialogAction).not.toHaveBeenCalled();

    dialogClose$.next({});

    expect(asmComponentService.handleAsmDialogAction).toHaveBeenCalledTimes(1);
    expect(asmComponentService.handleAsmDialogAction).toHaveBeenCalledWith(
      {} as any
    );
  });

  it('should display customer 360 button if asm customer360 is configured.', () => {
    spyOn(featureModulesService, 'isConfigured').and.returnValue(true);
    spyOn(userAccountFacade, 'get').and.returnValue(
      of({ uid: 'user@test.com', name: 'Test User' })
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAsmCustomer360Configured).toBeTruthy();
    expect(el.query(By.css('.cx-360-button'))).toBeTruthy();
  });

  it('should not display customer 360 button if asm customer360 is not configured.', () => {
    spyOn(featureModulesService, 'isConfigured').and.returnValue(false);
    spyOn(userAccountFacade, 'get').and.returnValue(
      of({ uid: 'user@test.com', name: 'Test User' })
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAsmCustomer360Configured).toBeFalsy();
    expect(el.query(By.css('.cx-360-button'))).toBeFalsy();
  });
});
