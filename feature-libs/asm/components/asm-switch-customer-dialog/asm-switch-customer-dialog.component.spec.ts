import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LaunchDialogService } from '@spartacus/storefront';
import {
  AsmSwitchCustomerDialogComponent,
  SWITCH_CUSTOMER_DIALOG_ACTION,
} from './asm-switch-customer-dialog.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
}

describe('AsmBindCartDialogComponent', () => {
  let component: AsmSwitchCustomerDialogComponent;
  let fixture: ComponentFixture<AsmSwitchCustomerDialogComponent>;

  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmSwitchCustomerDialogComponent, MockTranslatePipe],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSwitchCustomerDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'closeDialog').and.stub();
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
