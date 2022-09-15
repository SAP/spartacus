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

import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

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

describe('CustomerTicketingCloseComponent', () => {
  let component: CustomerTicketingCloseComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCloseComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingDetailsService,
          useClass: MockCustomerTicketingDetailsService,
        },
      ],
    }).compileComponents();

    mockAvailableStatus$.next([{ id: STATUS.CLOSE, name: STATUS_NAME.CLOSE }]);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseComponent);
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
      LAUNCH_CALLER.CUSTOMER_TICKETING_CLOSE,
      component.element,
      component['vcr']
    );
  });

  describe('enableCloseButton', () => {
    it('should be false if the status is not open or in process', (done) => {
      mockTicketStatus$.next(STATUS.CLOSE);

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be false if available status is not closed', (done) => {
      mockTicketStatus$.next(STATUS.OPEN);
      mockAvailableStatus$.next([]);
      fixture.detectChanges();

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be true if status is open and available status is close', (done) => {
      mockTicketStatus$.next(STATUS.OPEN);
      mockAvailableStatus$.next([
        { id: STATUS.CLOSE, name: STATUS_NAME.CLOSE },
      ]);
      fixture.detectChanges();

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(true);
        done();
      });
    });
  });
});
