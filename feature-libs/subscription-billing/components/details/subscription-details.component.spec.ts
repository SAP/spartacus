import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  EventService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  SubscriptionDetail,
  SubscriptionFacade,
} from '@spartacus/subscription-billing/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SubscriptionDetailsComponent } from './subscription-details.component';
const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});
const mockSubs: SubscriptionDetail = {
  id: 's1',
};
class MockSubscriptionFacade implements Partial<SubscriptionFacade> {
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
@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
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

describe('SubscriptionDetailsComponent', () => {
  let component: SubscriptionDetailsComponent;
  let fixture: ComponentFixture<SubscriptionDetailsComponent>;
  let eventService: EventService;
  let facade: SubscriptionFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SubscriptionDetailsComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: SubscriptionFacade,
          useClass: MockSubscriptionFacade,
        },
        { provide: EventService, useClass: MockEventService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(SubscriptionDetailsComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
    eventService = TestBed.inject(EventService);
    facade = TestBed.inject(SubscriptionFacade);
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
