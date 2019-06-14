import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogComponent } from './notification-dialog.component';
import { I18nTestingModule, ProductInterestService } from '@spartacus/core';
import { Pipe, PipeTransform, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

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

class MockNgbActiveModal {
  dismiss(): void {}
  close(): void {}
}

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;
  let selectedChannels: any[];
  const productInterestService: ProductInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    ['resetCreateState']
  );

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
          useClass: MockNgbActiveModal,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods test', () => {
    describe('ngOnDestroy', () => {
      it('should reset state when close the dialog', () => {
        component.subscribeSuccess$ = of(true);
        component.ngOnDestroy();
        expect(productInterestService.resetCreateState).toHaveBeenCalled();
      });
    });
  });

  describe('UI test', () => {
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
      expect(plist[1].nativeElement.textContent).toContain(
        'EMAIL: test@sap.com'
      );
      expect(plist[2].nativeElement.textContent).toContain('SMS: 13800000831');
    });

    it('should not show selected channels when selectedChannels are empty', () => {
      selectedChannels = [];
      component.selectedChannels = selectedChannels;
      component.subscribeSuccess$ = of(true);
      fixture.detectChanges();
      const plist = fixture.debugElement.queryAll(By.css('p'));
      expect(plist.length).toEqual(4);
      expect(plist[0].nativeElement.textContent).toContain(
        'stockNotification.subscriptionDialog.notifiedPrefix'
      );
      expect(plist[1].nativeElement.textContent).toContain(
        'stockNotification.subscriptionDialog.notifiedSuffix'
      );
    });

    it('should show loading template when data is not ready', () => {
      selectedChannels = [];
      component.selectedChannels = selectedChannels;
      component.subscribeSuccess$ = of(false);
      fixture.detectChanges();
      const div = fixture.debugElement.queryAll(
        By.css('.cx-notification-preference-span')
      );
      expect(div.length).toEqual(0);
    });
  });
});
