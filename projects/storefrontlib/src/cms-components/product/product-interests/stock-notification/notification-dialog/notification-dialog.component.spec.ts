import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification-dialog.component';
import { Pipe, PipeTransform, Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  ProductInterestService,
  BasicNotificationPreferenceList,
} from '@spartacus/core';
import { of } from 'rxjs';

const basicNotificationPreferenceList: BasicNotificationPreferenceList = {
  preferences: [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
    {
      channel: 'SITE_MESSAGE',
      enabled: true,
      value: '',
      visible: true,
    },
  ],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;
  let el: DebugElement;

  const productInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    ['resetCreateState']
  );
  const ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);

  ngbActiveModal.dismiss.and.stub();
  productInterestService.resetCreateState.and.stub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        NotificationDialogComponent,
        MockUrlPipe,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: ngbActiveModal,
        },
        {
          provide: ProductInterestService,
          useValue: productInterestService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDialogComponent);
    component.subscribeSuccess$ = of(true);
    component.selectedChannels = basicNotificationPreferenceList.preferences;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show notification dialog', () => {
    fixture.detectChanges();

    expect(el.query(By.css('[data-test]="title"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="btn-close"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="list-channel"'))).toBeTruthy();
    expect(el.queryAll(By.css('[data-test]="link-setchannel"'))).toBeTruthy();
    expect(el.queryAll(By.css('[data-test]="link-myinterest"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="btn-ok"'))).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.subscribeSuccess$ = of(false);

    fixture.detectChanges();

    expect(el.query(By.css('.cx-spinner'))).toBeTruthy();
  });

  it('should be able to close dialog by close button', () => {
    fixture.detectChanges();

    el.query(By.css('[data-test]="btn-close"')).nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });

  it('should be able to close dialog by OK button', () => {
    fixture.detectChanges();

    el.query(By.css('[data-test]="btn-ok"')).nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });

  it('should able to reset the state in destory', () => {
    component.ngOnDestroy();

    expect(productInterestService.resetCreateState).toHaveBeenCalled();
  });
});
