import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EventService,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import { SubscriptionDetailsComponent } from './subscription-details.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { Pipe, PipeTransform } from '@angular/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});
const mockSubs: SubscriptionDetail = {
  id: 's1',
};
class MockSubscriptionBillingFacade
  implements Partial<SubscriptionBillingFacade>
{
  getSubscriptionByCode(): Observable<SubscriptionDetail | undefined> {
    return of(mockSubs);
  }
  getSubscriptionCodeFromRoute(): Observable<string | undefined> {
    return of(mockSubs.id);
  }
}
class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}
class MockEventService implements Partial<EventService> {
  dispatch<T extends object>(_event: T): void {}
}
class MockLaunchDialogService {
  openDialogAndSubscribe() {}
}
@Pipe({
  name: 'cxUrl',
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('SubscriptionDetailsComponent', () => {
  let component: SubscriptionDetailsComponent;
  let fixture: ComponentFixture<SubscriptionDetailsComponent>;
  let eventService: EventService;
  let facade: SubscriptionBillingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SubscriptionDetailsComponent, MockUrlPipe],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingFacade,
        },
        { provide: EventService, useClass: MockEventService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
    eventService = TestBed.inject(EventService);
    facade = TestBed.inject(SubscriptionBillingFacade);
    spyOn(eventService, 'dispatch').and.callThrough();
    routerParam$.next({ ticketCode: 's1' });
    fixture = TestBed.createComponent(SubscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reload data', () => {
    spyOn(facade, 'getSubscriptionByCode').and.callThrough();
    component.ngOnInit();
    expect(eventService.dispatch).toHaveBeenCalled();
    expect(facade.getSubscriptionByCode).toHaveBeenCalled();
  });
  it('should open dialog with correct data when showSubscriptionActionsDialog is called', () => {
    const launchDialogService = TestBed.inject(LaunchDialogService);
    const subscription: SubscriptionDetail = {
      id: 's1',
      name: 'Test Sub',
    };
    const mode = 'cancel';

    (component as any).subscriptionDetails$ = of(subscription);
    const openDialogSpy = spyOn(launchDialogService, 'openDialogAndSubscribe');

    component.showSubscriptionActionsDialog(mode);

    expect(openDialogSpy).toHaveBeenCalledWith(
      LAUNCH_CALLER.SUBSCRIPTION_ACTION_CONFIRMATION,
      undefined,
      {
        ...subscription,
        code: subscription.id,
        mode,
      }
    );
  });
});
