import { Component, DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  FeatureLevelDirective,
  FeatureModulesService,
  FeaturesConfig,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  User,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { MockFeatureLevelDirective } from '../../../../core-libs/storefront/shared/test/mock-feature-level-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AsmBindCartComponent } from '../public_api';
import { AsmComponentService } from '../services/asm-component.service';
import { CustomerEmulationComponent } from './customer-emulation.component';

describe('CustomerEmulationComponent', () => {
  class MockUserAccountFacade implements Partial<UserAccountFacade> {
    get(): Observable<User> {
      return of({});
    }
  }
  @Injectable()
  class MockAsmComponentService {
    logoutCustomer(): void {}
    isCustomerEmulationSessionInProgress(): Observable<boolean> {
      return of(true);
    }
    handleAsmDialogAction(): void {}
  }

  @Component({
    selector: 'cx-asm-bind-cart',
    template: '',
  })
  class MockAsmBindCartComponent {}

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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CustomerEmulationComponent],
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
    })
      .overrideComponent(CustomerEmulationComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            AsmBindCartComponent,
            FeatureLevelDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockAsmBindCartComponent,
            MockFeatureLevelDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmulationComponent);
    component = fixture.componentInstance;
    userAccountFacade = TestBed.inject(UserAccountFacade);
    asmComponentService = TestBed.inject(AsmComponentService);
    featureModulesService = TestBed.inject(FeatureModulesService);
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display user info during customer emulation.', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of(testUser));
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

  it("should call logoutCustomer() on 'End Session' button click", () => {
    //customer login
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of(testUser));

    component.ngOnInit();
    fixture.detectChanges();

    //Click button
    const endSessionButton = fixture.debugElement.query(
      By.css('button[formControlName="logoutCustomer"]')
    );
    vi.spyOn(asmComponentService, 'logoutCustomer').mockImplementation(() => {});
    endSessionButton.nativeElement.click();

    //assert
    expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
  });

  it('should open customer 360 dialog', () => {
    fixture.detectChanges();
    const launchDialogService = TestBed.inject(LaunchDialogService);

    vi.spyOn(launchDialogService, 'openDialogAndSubscribe').mockImplementation(() => {});

    vi.spyOn(asmComponentService, 'handleAsmDialogAction').mockImplementation(() => {});

    component.openAsmCustomer360();

    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledTimes(1);
    const [caller, , data] = vi.mocked(launchDialogService.openDialogAndSubscribe).mock.calls[0];
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
    vi.spyOn(featureModulesService, 'isConfigured').mockReturnValue(true);
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(
      of({ uid: 'user@test.com', name: 'Test User' })
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAsmCustomer360Configured).toBeTruthy();
    expect(el.query(By.css('.cx-360-button'))).toBeTruthy();
  });

  it('should not display customer 360 button if asm customer360 is not configured.', () => {
    vi.spyOn(featureModulesService, 'isConfigured').mockReturnValue(false);
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(
      of({ uid: 'user@test.com', name: 'Test User' })
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAsmCustomer360Configured).toBeFalsy();
    expect(el.query(By.css('.cx-360-button'))).toBeFalsy();
  });
});
