import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import {
  ConsentTemplate,
  ConsentTemplateList,
  GlobalMessage,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  UrlCommands,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConsentManagementComponent } from './consent-management.component';

@Component({
  selector: 'cx-spinner',
  template: `
    <div>spinner</div>
  `,
})
class MockCxSpinnerComponent {}

@Component({
  selector: 'cx-consent-management-form',
  template: `
    <div>form</div>
  `,
})
class MockConsentManagementFormComponent {
  @Input()
  consentTemplate: ConsentTemplate;
  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();
}

class UserServiceMock {
  loadConsents(_userId: string): void {}
  getConsentsResultLoading(): Observable<boolean> {
    return of();
  }
  getGiveConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getGiveConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  get(): Observable<User> {
    return of();
  }
  getConsents(): Observable<ConsentTemplateList> {
    return of();
  }
  resetGiveConsentProcessState(): void {}
  resetWithdrawConsentProcessState(): void {}
}

class RoutingServiceMock {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

const mockUser: User = {
  uid: 'xxx@xxx.xxx',
};

const mockConsentTemplate: ConsentTemplate = {
  id: 'mock ID',
};

fdescribe('ConsentManagementComponent', () => {
  let component: ConsentManagementComponent;
  let fixture: ComponentFixture<ConsentManagementComponent>;
  let el: DebugElement;

  let userService: UserService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        MockCxSpinnerComponent,
        MockConsentManagementFormComponent,
        ConsentManagementComponent,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
        { provide: RoutingService, useClass: RoutingServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
    globalMessageService = TestBed.get(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const consentListInitMethod = 'consentListInit';
  const giveConsentInitMethod = 'giveConsentInit';
  const withdrawConsentInitMethod = 'withdrawConsentInit';
  const consentsExistsMethod = 'consentsExists';
  const onConsentGivenSuccessMethod = 'onConsentGivenSuccess';
  const onConsentWithdrawnSuccessMethod = 'onConsentWithdrawnSuccess';

  describe('ngOnInit', () => {
    it('should combine all loading flags into one', () => {
      spyOn(userService, 'getConsentsResultLoading').and.returnValue(of(true));
      spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
        of(false)
      );
      spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
        of(false)
      );

      component.ngOnInit();
      expect(userService.getConsentsResultLoading).toHaveBeenCalled();
      expect(userService.getGiveConsentResultLoading).toHaveBeenCalled();
      expect(userService.getWithdrawConsentResultLoading).toHaveBeenCalled();

      let loadingResult = false;
      component.loading$
        .subscribe(result => (loadingResult = result))
        .unsubscribe();
      expect(loadingResult).toEqual(true);
    });

    it('should call all init methods', () => {
      spyOn<any>(component, consentListInitMethod).and.stub();
      spyOn<any>(component, giveConsentInitMethod).and.stub();
      spyOn<any>(component, withdrawConsentInitMethod).and.stub();

      component.ngOnInit();
      expect(component[consentListInitMethod]).toHaveBeenCalled();
      expect(component[giveConsentInitMethod]).toHaveBeenCalled();
      expect(component[withdrawConsentInitMethod]).toHaveBeenCalled();
    });
  });

  describe(consentListInitMethod, () => {
    describe('when there are no consents loaded', () => {
      const mockTemplateList = {} as ConsentTemplateList;
      it('should trigger the loadConsents method', () => {
        spyOn(userService, 'get').and.returnValue(of(mockUser));
        spyOn(userService, 'getConsents').and.returnValue(of(mockTemplateList));
        spyOn<any>(component, consentsExistsMethod).and.returnValue(false);
        spyOn(userService, 'loadConsents').and.stub();

        component[consentListInitMethod]();

        let result: ConsentTemplateList;
        component.templateList$
          .subscribe(templates => (result = templates))
          .unsubscribe();
        expect(result).toEqual(mockTemplateList);
        expect(component[consentsExistsMethod]).toHaveBeenCalledWith(
          mockTemplateList
        );
        expect(userService.loadConsents).not.toHaveBeenCalled();
      });
    });
    describe('when the consents are already present', () => {
      const mockTemplateList: ConsentTemplateList = {
        consentTemplates: [mockConsentTemplate],
      };
      it('should map consents to observable', () => {
        spyOn(userService, 'get').and.returnValue(of(mockUser));
        spyOn(userService, 'getConsents').and.returnValue(of(mockTemplateList));
        spyOn<any>(component, consentsExistsMethod).and.returnValue(true);
        spyOn(userService, 'loadConsents').and.stub();

        component[consentListInitMethod]();

        let result: ConsentTemplateList;
        component.templateList$
          .subscribe(templates => (result = templates))
          .unsubscribe();
        expect(result).toEqual(mockTemplateList);
        expect(component[consentsExistsMethod]).toHaveBeenCalledWith(
          mockTemplateList
        );
        expect(userService.loadConsents).toHaveBeenCalledWith(mockUser.uid);
      });
    });
  });

  describe(giveConsentInitMethod, () => {
    it('should reset the processing state', () => {
      spyOn(userService, 'resetGiveConsentProcessState').and.stub();
      component[giveConsentInitMethod]();
      expect(userService.resetGiveConsentProcessState).toHaveBeenCalled();
    });
    it(`should reset the processing state and call ${onConsentGivenSuccessMethod}`, () => {
      const success = true;
      spyOn(userService, 'getGiveConsentResultSuccess').and.returnValue(
        of(success)
      );
      spyOn<any>(component, onConsentGivenSuccessMethod).and.stub();

      component[giveConsentInitMethod]();
      expect(component[onConsentGivenSuccessMethod]).toHaveBeenCalledWith(
        success
      );
    });
  });

  describe(withdrawConsentInitMethod, () => {
    it('should reset the processing state', () => {
      spyOn(userService, 'resetWithdrawConsentProcessState').and.stub();
      component[withdrawConsentInitMethod]();
      expect(userService.resetWithdrawConsentProcessState).toHaveBeenCalled();
    });
    it(`should should load all consents if the withdrawal was successful and call ${onConsentWithdrawnSuccessMethod}`, () => {
      const withdrawalSuccess = true;
      spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
        of(false)
      );
      spyOn(userService, 'getWithdrawConsentResultSuccess').and.returnValue(
        of(withdrawalSuccess)
      );
      spyOn(userService, 'loadConsents').and.stub();
      spyOn(userService, 'get').and.returnValue(of(mockUser));
      spyOn<any>(component, onConsentWithdrawnSuccessMethod).and.stub();

      component[withdrawConsentInitMethod]();

      expect(userService.loadConsents).toHaveBeenCalledWith(mockUser.uid);
      expect(component[onConsentWithdrawnSuccessMethod]).toHaveBeenCalledWith(
        withdrawalSuccess
      );
    });
    it('should should NOT load all consents if the withdrawal was NOT successful', () => {
      spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
        of(false)
      );
      spyOn(userService, 'getWithdrawConsentResultSuccess').and.returnValue(
        of(false)
      );
      spyOn(userService, 'loadConsents').and.stub();
      spyOn(userService, 'get').and.returnValue(of(mockUser));

      component[withdrawConsentInitMethod]();

      expect(userService.loadConsents).not.toHaveBeenCalled();
    });
  });

  describe(consentsExistsMethod, () => {
    describe('when undefined is provided', () => {
      it('should return false', () => {
        expect(component[consentsExistsMethod](undefined)).toEqual(false);
      });
    });
    describe('when consentTemplates do not exist', () => {
      it('should return false', () => {
        const consentTemplateList = {} as ConsentTemplateList;
        expect(component[consentsExistsMethod](consentTemplateList)).toEqual(
          false
        );
      });
    });
    describe('when consentTemplates are present', () => {
      it('should return true', () => {
        const consentTemplateList: ConsentTemplateList = {
          consentTemplates: [mockConsentTemplate],
        };
        expect(component[consentsExistsMethod](consentTemplateList)).toEqual(
          true
        );
      });
    });
  });
});
