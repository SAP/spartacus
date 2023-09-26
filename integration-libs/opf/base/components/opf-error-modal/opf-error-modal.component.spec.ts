import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ErrorDialogOptions } from '@spartacus/opf/base/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OpfErrorModalComponent } from './opf-error-modal.component';
import { OpfErrorModalService } from './opf-error-modal.service';

const dialogClose$ = new BehaviorSubject<any>('');
let mockDialogOptions: ErrorDialogOptions = {
  messageString: 'Opf Test Message',
  confirmString: 'Opf Test Confirm',
};
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> | undefined {
    return of(mockDialogOptions);
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }

  closeDialog() {}
}

class MockOpfErrorModalService implements Partial<OpfErrorModalService> {
  getMessageAndConfirmTranslations(dialogOptions: ErrorDialogOptions) {
    return of({
      message: dialogOptions.messageString,
      confirm: dialogOptions.confirmString,
    });
  }
}

describe('OpfErrorModalComponent', () => {
  let component: OpfErrorModalComponent;
  let fixture: ComponentFixture<OpfErrorModalComponent>;
  let launchDialogService: LaunchDialogService;
  let opfErrorModalService: OpfErrorModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OpfErrorModalComponent],
      providers: [
        { provide: OpfErrorModalService, useClass: MockOpfErrorModalService },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    });

    fixture = TestBed.createComponent(OpfErrorModalComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    opfErrorModalService = TestBed.inject(OpfErrorModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialogue when modal is dismissed', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    component.dismissModal('opf test');

    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should closeModal when user click outside', () => {
    const el = fixture.debugElement.nativeElement;
    spyOn(component, 'dismissModal');

    el.click();
    expect(component.dismissModal).toHaveBeenCalledWith('Backdrop click');
  });

  it('should call the transalation service when component is init', () => {
    spyOn(
      opfErrorModalService,
      'getMessageAndConfirmTranslations'
    ).and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      opfErrorModalService.getMessageAndConfirmTranslations
    ).toHaveBeenCalled();
  });
});
