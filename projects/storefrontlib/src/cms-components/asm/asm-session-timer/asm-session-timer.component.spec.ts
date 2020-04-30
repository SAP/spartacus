import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  AsmConfig,
  AuthService,
  I18nTestingModule,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { AsmSessionTimerComponent } from './asm-session-timer.component';
import createSpy = jasmine.createSpy;

const MockAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 1,
    },
  },
};

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of('');
  }
}

class MockAsmComponentService {
  logoutCustomerSupportAgentAndCustomer(): void {}
}
class MockRoutingService {
  go() {}
  isNavigating() {
    return of(false);
  }
}

@Pipe({
  name: 'formatTimer',
})
class MockFormatTimerPipe implements PipeTransform {
  transform() {}
}

describe('AsmSessionTimerComponent', () => {
  let component: AsmSessionTimerComponent;
  let fixture: ComponentFixture<AsmSessionTimerComponent>;
  let config: AsmConfig;
  let asmComponentService: AsmComponentService;
  let routingService: RoutingService;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AsmSessionTimerComponent, MockFormatTimerPipe],
      providers: [
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: createSpy('markForCheck') },
        },
        { provide: AsmConfig, useValue: MockAsmConfig },
        { provide: AsmComponentService, useClass: MockAsmComponentService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSessionTimerComponent);
    config = TestBed.inject(AsmConfig);
    asmComponentService = TestBed.inject(AsmComponentService);
    routingService = TestBed.inject(RoutingService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when time left is zero.', fakeAsync(() => {
    config.asm.agentSessionTimer.startingDelayInSeconds = 1;
    spyOn(
      asmComponentService,
      'logoutCustomerSupportAgentAndCustomer'
    ).and.stub();
    component.ngOnInit();
    tick(2000);
    expect(
      asmComponentService.logoutCustomerSupportAgentAndCustomer
    ).toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('should not call logout when there is some time left.', fakeAsync(() => {
    config.asm.agentSessionTimer.startingDelayInSeconds = 10;
    spyOn(
      asmComponentService,
      'logoutCustomerSupportAgentAndCustomer'
    ).and.stub();
    component.ngOnInit();
    tick(1000);
    expect(
      asmComponentService.logoutCustomerSupportAgentAndCustomer
    ).not.toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('should reset the time left when user navigates on a new page.', () => {
    spyOn<any>(component, 'resetOnCustomerSessionChange').and.stub();
    spyOn(component, 'resetTimer').and.callThrough();
    spyOn(routingService, 'isNavigating').and.returnValue(of(true));
    component.ngOnInit();
    expect(component.resetTimer).toHaveBeenCalled();
  });

  it('should not reset the time left when user is not navigating to a new page', () => {
    spyOn<any>(component, 'resetOnCustomerSessionChange').and.stub();
    spyOn(component, 'resetTimer').and.callThrough();
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    component.ngOnInit();
    expect(component.resetTimer).not.toHaveBeenCalled();
  });

  it('should use start delay from the config', () => {
    config.asm.agentSessionTimer.startingDelayInSeconds = 632;
    component.ngOnInit();
    const result = component['getTimerStartDelayInSeconds']();
    expect(result).toBe(config.asm.agentSessionTimer.startingDelayInSeconds);
  });
  it('should use a maximum start delay', () => {
    config.asm.agentSessionTimer.startingDelayInSeconds = 1000000;
    component.ngOnInit();
    const result = component['getTimerStartDelayInSeconds']();
    expect(result).toBe(component['maxStartDelayInSeconds']);
  });

  it('should reset the time left when agent starts a new customer session', () => {
    spyOn<any>(component, 'resetOnNavigate').and.stub();
    const occUserId$: BehaviorSubject<string> = new BehaviorSubject(
      OCC_USER_ID_ANONYMOUS
    );
    spyOn(component, 'resetTimer').and.callThrough();
    spyOn(authService, 'getOccUserId').and.returnValue(occUserId$);
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    component.ngOnInit(); // reset 1, initial value anonymous.
    occUserId$.next('customer01'); // reset 2, staring an emulation session.
    occUserId$.next('customer01'); // no reset, simulates token resfresh
    occUserId$.next(OCC_USER_ID_ANONYMOUS); // reset 3, end customer emulation session
    expect(component.resetTimer).toHaveBeenCalledTimes(3);
  });
});
