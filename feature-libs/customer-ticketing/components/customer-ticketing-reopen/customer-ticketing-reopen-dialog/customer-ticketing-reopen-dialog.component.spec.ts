import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { STATUS, STATUS_NAME } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { CustomerTicketingDetailsService } from '../../customer-ticketing-details.service';

import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockCustomerTicketingDetailsService
  implements Partial<CustomerTicketingDetailsService>
{
  createTicketEvent(): void {}
}

describe('CustomerTicketingReopenDialogComponent', () => {
  let component: CustomerTicketingReopenDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenDialogComponent>;
  let customerTicketingDetailsService: CustomerTicketingDetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingReopenDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingDetailsService,
          useClass: MockCustomerTicketingDetailsService,
        },
      ],
    }).compileComponents();

    customerTicketingDetailsService = TestBed.inject(
      CustomerTicketingDetailsService
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingReopenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    expect(component.form.get('message')?.value).toBeDefined();
    expect(component.form.get('file')?.value).toBeDefined();
  });

  describe('reopenRequest', () => {
    it('should not call createTicketEvent if the form is invalid', () => {
      spyOn(customerTicketingDetailsService, 'createTicketEvent');

      component.form.get('message')?.setValue('');
      component.reopenRequest();

      expect(
        customerTicketingDetailsService.createTicketEvent
      ).not.toHaveBeenCalled();
    });

    it('should call createTicketEvent if the form is valid', () => {
      const mockEvent = {
        message: 'mockMessage',
        toStatus: {
          id: STATUS.INPROCESS,
          name: STATUS_NAME.INPROCESS,
        },
      };
      spyOn(customerTicketingDetailsService, 'createTicketEvent');

      component.form.get('message')?.setValue('mockMessage');
      component.reopenRequest();

      expect(
        customerTicketingDetailsService.createTicketEvent
      ).toHaveBeenCalledWith(mockEvent);
    });
  });
});
