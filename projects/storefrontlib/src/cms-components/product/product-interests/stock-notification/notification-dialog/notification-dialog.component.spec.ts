import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification-dialog.component';
import { Pipe, PipeTransform, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { I18nTestingModule, ProductInterestService } from '@spartacus/core';

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
  let selectedChannels: any[];

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
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.subscribeSuccess$ = of(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show selected channels when selectedChannels are exist', () => {
    selectedChannels = [
      {
        channel: 'EMAIL',
        value: 'test@sap.com',
      },
      {
        channel: 'SMS',
        value: '13800000831',
      },
    ];
    component.subscribeSuccess$ = of(true);
    component.selectedChannels = selectedChannels;
    fixture.detectChanges();
    const plist = fixture.debugElement.queryAll(By.css('p'));
    expect(plist.length).toEqual(6);
    expect(plist[1].nativeElement.textContent).toContain('EMAIL: test@sap.com');
    expect(plist[2].nativeElement.textContent).toContain('SMS: 13800000831');
  });

  it('should show manage channels link and manage subscriptions link', () => {
    component.subscribeSuccess$ = of(true);
    fixture.detectChanges();
    const alist = fixture.debugElement.queryAll(By.css('a'));
    expect(alist[0].nativeElement.textContent).toContain(
      'stockNotification.subscriptionDialog.manageChannelsLink'
    );
    expect(alist[1].nativeElement.textContent).toContain(
      'stockNotification.subscriptionDialog.manageSubscriptionsLink'
    );
  });

  it('should show loading template when data is not ready', () => {
    selectedChannels = [];
    component.selectedChannels = selectedChannels;
    component.subscribeSuccess$ = of(false);
    fixture.detectChanges();
    const notificationPreference = fixture.debugElement.queryAll(
      By.css('.cx-notification-preference-span')
    );
    expect(notificationPreference.length).toEqual(0);
  });

  it('should be able to close dialog', () => {
    component.subscribeSuccess$ = of(true);
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('button'))[0].nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalledWith('Cross click');
    expect(productInterestService.resetCreateState).toHaveBeenCalled();
  });
});
