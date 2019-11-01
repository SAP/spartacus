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
  RoutingService,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmSessionTimerComponent } from './asm-session-timer.component';
import createSpy = jasmine.createSpy;

const MockAsmConfig: AsmConfig = {
  asm: {
    sessionTimer: {
      startingDelayInSeconds: 1,
    },
  },
};

class MockRoutingService {
  go() {}
  isNavigating() {
    return of(false);
  }
}

class MockAuthService {
  logoutCustomerSupportAgent(): void {}
  logout(): void {}
  getUserToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
}

const mockToken = {
  access_token: 'asdfasf',
} as UserToken;

@Pipe({
  name: 'formatTimer',
})
class MockFormatTimerPipe implements PipeTransform {
  transform() {}
}

fdescribe('AsmSessionTimerComponent', () => {
  let component: AsmSessionTimerComponent;
  let fixture: ComponentFixture<AsmSessionTimerComponent>;
  let config: AsmConfig;
  let authService: AuthService;
  let routingService: RoutingService;

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
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSessionTimerComponent);
    config = TestBed.get(AsmConfig);
    authService = TestBed.get(AuthService);
    routingService = TestBed.get(RoutingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when time left is zero.', fakeAsync(() => {
    config.asm.sessionTimer.startingDelayInSeconds = 1;
    spyOn<any>(component, 'logout').and.stub();
    component.ngOnInit();
    tick(2000);
    expect(component['logout']).toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('should not call logout when there is some time left.', fakeAsync(() => {
    config.asm.sessionTimer.startingDelayInSeconds = 10;
    spyOn<any>(component, 'logout').and.stub();
    component.ngOnInit();
    tick(1000);
    expect(component['logout']).not.toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('should logout asagent when no emulation is in progress.', () => {
    spyOn(authService, 'logout').and.stub();
    spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
    spyOn(authService, 'getUserToken').and.returnValue(of({} as UserToken));
    component['logout']();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
  });

  it('should logout asagent and customer emulation session when emulation is in progress.', () => {
    spyOn(authService, 'logout').and.stub();
    spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    component['logout']();
    expect(authService.logout).toHaveBeenCalled();
    expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
  });

  it('should reset the time left when user navigates on a new page.', () => {
    spyOn(component, 'resetTimer').and.callThrough();
    spyOn(routingService, 'isNavigating').and.returnValue(of(true));
    component.ngOnInit();
    expect(component.resetTimer).toHaveBeenCalled();
  });

  it('should not reset the time left when user is not navigating to a new page', () => {
    spyOn(component, 'resetTimer').and.callThrough();
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    component.ngOnInit();
    expect(component.resetTimer).not.toHaveBeenCalled();
  });
});
