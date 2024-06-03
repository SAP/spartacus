import {
  Component,
  Injectable,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { AuthService, RoutingService } from '@spartacus/core';
import {
  FocusDirective,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AsmComponentService } from '../services';
import {
  AsmSwitchCustomerDialogComponent,
  SwitchCustomerData,
  SWITCH_CUSTOMER_DIALOG_ACTION,
} from './asm-switch-customer-dialog.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<SwitchCustomerData> {
    return of({
      curCustomer: { customerId: '00000001' },
      switchCustomer: { customerId: '00000002' },
    });
  }
  closeDialog(_reason: any) {}
}
@Injectable()
class MockAsmComponentService extends AsmComponentService {
  logoutCustomer() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}
class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  authorizeCustomerSupportAgent(): Promise<void> {
    return Promise.resolve();
  }
  isCustomerSupportAgentLoggedIn(): Observable<boolean> {
    return of(false);
  }
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    return of(false);
  }
  startCustomerEmulationSession(_customerId: string) {}
}

describe('AsmSwitchCustomerDialogComponent', () => {
  let component: AsmSwitchCustomerDialogComponent;
  let fixture: ComponentFixture<AsmSwitchCustomerDialogComponent>;

  let launchDialogService: LaunchDialogService;
  let asmComponentService: AsmComponentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AsmSwitchCustomerDialogComponent,
        MockTranslatePipe,
        FocusDirective,
        MockCxIconComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: AsmComponentService, useClass: MockAsmComponentService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSwitchCustomerDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    asmComponentService = TestBed.inject(AsmComponentService);

    spyOn(launchDialogService, 'closeDialog').and.stub();
    spyOn(asmComponentService, 'logoutCustomer').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close with replace action when replace button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SWITCH_CUSTOMER_DIALOG_ACTION.SWITCH
    );
    expect(asmComponentService.logoutCustomer).toHaveBeenCalled();
  });

  it('should close with cancel action when cancel button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SWITCH_CUSTOMER_DIALOG_ACTION.CANCEL
    );
  });
});
