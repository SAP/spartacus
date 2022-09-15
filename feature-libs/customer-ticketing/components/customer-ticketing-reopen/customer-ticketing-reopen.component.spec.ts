import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  STATUS,
  Status,
  STATUS_NAME,
} from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingDetailsService } from '../customer-ticketing-details.service';

import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';

describe('CustomerTicketingReopenComponent', () => {
  let component: CustomerTicketingReopenComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenComponent>;
  let launchDialogService: LaunchDialogService;

  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    openDialog(
      _caller: LAUNCH_CALLER,
      _openElement?: ElementRef,
      _vcr?: ViewContainerRef
    ) {
      return of();
    }
  }

  const mockTicketStatus$ = new BehaviorSubject<string>(STATUS.OPEN);

  const mockAvailableStatus$ = new BehaviorSubject<Status[]>([]);
  class MockCustomerTicketingDetailsService
    implements Partial<CustomerTicketingDetailsService>
  {
    getTicketStatus = () => mockTicketStatus$.asObservable();
    getAvailableTransitionStatus = () => mockAvailableStatus$.asObservable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingReopenComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingDetailsService,
          useClass: MockCustomerTicketingDetailsService,
        },
      ],
    }).compileComponents();

    mockAvailableStatus$.next([
      { id: STATUS.INPROCESS, name: STATUS_NAME.INPROCESS },
    ]);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingReopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger open dialog and open close request dialog', () => {
    spyOn(launchDialogService, 'openDialog');
    component.openDialog();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN,
      component.element,
      component['vcr']
    );
  });

  describe('enableReopenButton', () => {
    it('should be false if the status is not closed', (done) => {
      mockTicketStatus$.next(STATUS.OPEN);

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be false if available status is not open or in process', (done) => {
      mockTicketStatus$.next(STATUS.CLOSE);
      mockAvailableStatus$.next([
        { id: STATUS.CLOSE, name: STATUS_NAME.CLOSE },
      ]);
      fixture.detectChanges();

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be true if status is close and available status is open or in process', (done) => {
      mockTicketStatus$.next(STATUS.CLOSE);
      mockAvailableStatus$.next([
        { id: STATUS.INPROCESS, name: STATUS_NAME.INPROCESS },
      ]);
      fixture.detectChanges();

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(true);
        done();
      });
    });
  });
});
