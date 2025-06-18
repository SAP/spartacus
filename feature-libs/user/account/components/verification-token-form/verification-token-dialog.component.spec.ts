import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusDirective, LaunchDialogService } from '@spartacus/storefront';
import { VERIFICATION_TOKEN_DIALOG_ACTION } from '@spartacus/user/account/root';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { VerificationTokenDialogComponent } from './verification-token-dialog.component';

@Pipe({
  name: 'cxTranslate',
  standalone: false,
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
}

describe('VerificationTokenDialogComponent', () => {
  let component: VerificationTokenDialogComponent;
  let fixture: ComponentFixture<VerificationTokenDialogComponent>;

  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VerificationTokenDialogComponent,
        MockTranslatePipe,
        FocusDirective,
        MockFeatureDirective,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationTokenDialogComponent);
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
      VERIFICATION_TOKEN_DIALOG_ACTION.OK
    );
  });
});
