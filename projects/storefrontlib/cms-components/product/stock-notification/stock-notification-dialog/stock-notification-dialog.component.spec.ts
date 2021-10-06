import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNotificationDialogComponent } from './stock-notification-dialog.component';
import {
  UserInterestsService,
  I18nTestingModule,
  NotificationPreference,
} from '@spartacus/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('StockNotificationDialogComponent', () => {
  let component: StockNotificationDialogComponent;
  let fixture: ComponentFixture<StockNotificationDialogComponent>;
  let el: DebugElement;

  const modalService = jasmine.createSpyObj('ModalService', [
    'dismissActiveModal',
  ]);
  const interestsService = jasmine.createSpyObj('interestsService', [
    'resetAddInterestState',
  ]);

  const preferences: NotificationPreference[] = [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StockNotificationDialogComponent],
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        providers: [
          { provide: ModalService, useValue: modalService },
          { provide: UserInterestsService, useValue: interestsService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.subscribeSuccess$ = of(true);
    component.enabledPrefs = preferences;
    modalService.dismissActiveModal.and.stub();
    interestsService.resetAddInterestState.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show notification dialog', () => {
    fixture.detectChanges();

    expect(el.query(By.css('.modal-header'))).toBeTruthy();
    expect(el.query(By.css('.close'))).toBeTruthy();
    expect(el.queryAll(By.css('.channels'))).toBeTruthy();
    expect(el.query(By.css('.link-prefs'))).toBeTruthy();
    expect(el.query(By.css('.link-interests'))).toBeTruthy();
    expect(el.query(By.css('.btn-ok'))).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.subscribeSuccess$ = of(false);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to close dialog by close button', () => {
    fixture.detectChanges();
    el.query(By.css('.close')).nativeElement.click();
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });

  it('should be able to close dialog by OK button', () => {
    fixture.detectChanges();
    el.query(By.css('.btn-ok')).nativeElement.click();
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });

  it('should be able to reset the adding state in destory()', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(interestsService.resetAddInterestState).toHaveBeenCalled();
  });
});
