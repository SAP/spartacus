import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EventService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  LanguageService,
  Translatable,
} from '@spartacus/core';
import {
  ICON_TYPE,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ExtendSubscriptionDialogComponent } from './extend-subscription-dialog.component';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { extendSubscriptionFrequencyDropdownOptions } from './extend-subscription-frequency-dropdown-options';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'cx-icon',
  template: '',
  standalone: false,
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockSubscriptionBillingService
  implements Partial<SubscriptionBillingFacade>
{
  getSubscriptionExtensionEffectiveDate(__: number, _: boolean) {
    return of({ subscriptionEndAt: '2024-12-31' });
  }

  extendSubscription(_: number, __: boolean) {
    return of({});
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

class MockEventService implements Partial<EventService> {
  dispatch<T extends object>(_event: T): void {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$: Observable<any> = of('Months');
  openDialogAndSubscribe(
    _: LAUNCH_CALLER | string,
    __?: ElementRef,
    ___?: any
  ): void {}
  closeDialog(_: any) {}
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('ExtendSubscriptionDialog', () => {
  let fixture: ComponentFixture<ExtendSubscriptionDialogComponent>;
  let component: ExtendSubscriptionDialogComponent;
  let subscriptionBillingService: SubscriptionBillingFacade;
  let globalMessageService: GlobalMessageService;
  let eventService: EventService;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;
  let extendFrequencyMaxOptions: {
    [key: string]: number;
  };
  let extensionEffectiveDateSpy: jasmine.Spy;
  let extendSubscriptionSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ExtendSubscriptionDialogComponent, MockCxIconComponent],
      providers: [
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: EventService, useClass: MockEventService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    subscriptionBillingService = TestBed.inject(SubscriptionBillingFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    eventService = TestBed.inject(EventService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    extendFrequencyMaxOptions = extendSubscriptionFrequencyDropdownOptions;

    extensionEffectiveDateSpy = spyOn(
      subscriptionBillingService,
      'getSubscriptionExtensionEffectiveDate'
    ).and.callThrough();
    extendSubscriptionSpy = spyOn(
      subscriptionBillingService,
      'extendSubscription'
    ).and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(eventService, 'dispatch').and.callThrough();
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

    fixture = TestBed.createComponent(ExtendSubscriptionDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should render component accordingly when the dialog is opened', () => {
    expect(el).toBeDefined();

    expect(el.query(By.css('.modal-dialog'))).toBeDefined();
    expect(el.query(By.css('.modal-header'))).toBeDefined();
    expect(
      el.query(By.css('.modal-title')).nativeElement.textContent
    ).toContain('extendSubscription.title');
    expect(
      el.query(By.css('#dialogTitle')).nativeElement.textContent
    ).toContain('extendSubscription.title');
    expect(
      el.query(By.css('.modal-header button.close cx-icon'))
    ).toBeDefined();
    expect(
      el.query(By.css('.modal-body .cx-dialog-info')).queryAll(By.css('p'))[0]
        .nativeElement.textContent
    ).toEqual('extendSubscription.disclaimer');
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('span.extend-duration-label')).nativeElement.textContent
    ).toContain('extendSubscription.durationInputLabel');
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('cx-form-required-asterisks'))
    ).toBeDefined();
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('ng-select#extendDurationDropdown'))
    ).toBeDefined();
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('ng-select#extendDurationDropdown')).nativeElement
        .attributes['ng-reflect-readonly'].textContent
    ).toEqual('false');
    expect(
      el.query(By.css('.cx-modal-footer .extend-subscription-dialog-footer'))
    ).toBeDefined();
    expect(
      el.query(By.css('.cx-modal-footer button.btn-secondary')).nativeElement
        .textContent
    ).toContain('common.cancel');
    expect(
      el.query(By.css('.cx-modal-footer button.btn-primary')).nativeElement
        .attributes['disabled']
    ).toBeTruthy();
    expect(
      el.query(By.css('.cx-modal-footer button.btn-primary')).nativeElement
        .textContent
    ).toEqual(' extendSubscription.extend ');
  });

  it('should render component accordingly when the extend subscription button is clicked', () => {
    component.isExtendSubscriptionBtnClicked = true;
    component.isExtensionEffectiveDateAvailable = false;
    fixture.detectChanges();

    expect(el).toBeDefined();

    expect(el.query(By.css('.modal-dialog'))).toBeDefined();
    expect(el.query(By.css('.modal-header'))).toBeDefined();
    expect(el.query(By.css('#dialogTitle')).nativeElement.textContent).toEqual(
      ' extendSubscription.confirmExtensionTitle '
    );
    expect(
      el.query(By.css('.modal-header button.close cx-icon'))
    ).toBeDefined();
    expect(
      el.query(By.css('.modal-body .cx-dialog-info')).queryAll(By.css('p'))[0]
        .nativeElement.textContent
    ).toContain('extendSubscription.disclaimerWithExtensionEndDate');
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('span.extend-duration-label')).nativeElement.textContent
    ).toContain('extendSubscription.durationInputLabel');
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('cx-form-required-asterisks'))
    ).toBeDefined();
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('ng-select#extendDurationDropdown'))
    ).toBeDefined();
    expect(
      el
        .query(By.css('.modal-body .extend-duration-dropdown-label'))
        .query(By.css('ng-select#extendDurationDropdown')).nativeElement
        .attributes['ng-reflect-readonly'].textContent
    ).toEqual('true');
    expect(
      el.query(By.css('.cx-modal-footer .extend-subscription-dialog-footer'))
    ).toBeDefined();
    expect(
      el.query(By.css('.cx-modal-footer button.btn-secondary')).nativeElement
        .textContent
    ).toEqual(' common.cancel ');
    expect(el.query(By.css('.cx-modal-footer button.btn-primary'))).toBeNull();

    component.isExtensionEffectiveDateAvailable = true;
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-modal-footer button.btn-primary')).nativeElement
        .textContent
    ).toEqual(' extendSubscription.confirm ');
  });

  it('should initialize extendDurationOptions on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.subscriptionContractFrequency).toEqual('Months');
    expect(component.extendDurationOptions.length).toEqual(
      extendFrequencyMaxOptions['Months'] + 1
    );

    let expectedDropdownOptions: string[] = Array.from(
      { length: extendFrequencyMaxOptions['Months'] + 1 },
      (_, i) =>
        i + 1 === extendFrequencyMaxOptions['Months'] + 1
          ? 'Unlimited'
          : (i + 1).toString() + ' ' + 'Months'
    );

    expect(component.extendDurationOptions).toEqual(expectedDropdownOptions);
  });

  it('should call getSubscriptionExtensionEffectiveDate and set extensionEffectiveDate on onExtendSubscription', () => {
    component.extendDuration = 3;
    component.isUnlimitedDurationSelected = false;
    component.onExtendSubscription();
    fixture.detectChanges();

    expect(component.isExtendSubscriptionBtnClicked).toBeTruthy();
    expect(
      subscriptionBillingService.getSubscriptionExtensionEffectiveDate
    ).toHaveBeenCalledWith(3, false);
    expect(component.extensionEffectiveDate).toEqual('2024-12-31');
    expect(component.isExtensionEffectiveDateAvailable).toBeTruthy();
  });

  it('should handle error from getSubscriptionExtensionEffectiveDate on onExtendSubscription', () => {
    extensionEffectiveDateSpy.and.returnValue(
      throwError(() => ({
        details: [
          {
            message: 'Something went wrong!',
          },
        ],
      }))
    );

    component.extendDuration = 3;
    component.isUnlimitedDurationSelected = false;
    component.onExtendSubscription();
    fixture.detectChanges();

    expect(component.isExtendSubscriptionBtnClicked).toBeTruthy();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'Something went wrong!',
      GlobalMessageType.MSG_TYPE_ERROR
    );
    expect(component.extensionEffectiveDate).toBeUndefined();
    expect(component.isExtensionEffectiveDateAvailable).toBeFalsy();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'extendSubscription.failed'
    );
  });

  it('should set unlimited duration when the extend duration is changed to unlimited option', () => {
    component.onExtendDurationChange('Unlimited');
    fixture.detectChanges();

    expect(component.isUnlimitedDurationSelected).toBeTruthy();
    expect(component.extendDuration).toBeUndefined();
  });

  it('should set extend duration when the extend duration is changed to option other than unlimited option', () => {
    component.onExtendDurationChange('5 Months');
    fixture.detectChanges();

    expect(component.isUnlimitedDurationSelected).toBeFalsy();
    expect(component.extendDuration).toEqual(5);
  });

  it('should call extendSubscription and close dialog on onConfirmExtendSubscription', () => {
    component.extendDuration = 6;
    component.isUnlimitedDurationSelected = false;
    component.onConfirmExtendSubscription();
    fixture.detectChanges();

    expect(subscriptionBillingService.extendSubscription).toHaveBeenCalledWith(
      6,
      false
    );
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'extendSubscription.extendedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      GetSubscriptionByCodeReloadEvent
    );
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'extendSubscription.extendedSuccessfully'
    );
  });

  it('should handle error and close dialog when extend subscription is not confirmed', () => {
    extendSubscriptionSpy.and.returnValue(
      throwError(() => ({
        details: [
          {
            message: 'Something went wrong!',
          },
        ],
      }))
    );
    component.extendDuration = 6;
    component.isUnlimitedDurationSelected = false;
    component.onConfirmExtendSubscription();
    fixture.detectChanges();

    expect(subscriptionBillingService.extendSubscription).toHaveBeenCalledWith(
      6,
      false
    );
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'Something went wrong!',
      GlobalMessageType.MSG_TYPE_ERROR
    );
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'extendSubscription.failed'
    );
  });

  it('should close dialog without action on close button click', () => {
    component.close('');
    fixture.detectChanges();

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('');
  });
});
