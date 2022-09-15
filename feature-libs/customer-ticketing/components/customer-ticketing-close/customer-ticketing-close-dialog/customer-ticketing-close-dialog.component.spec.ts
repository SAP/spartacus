import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { STATUS, STATUS_NAME } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { CustomerTicketingDetailsService } from '../../customer-ticketing-details.service';
import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockCustomerTicketingDetailsService
  implements Partial<CustomerTicketingDetailsService>
{
  createTicketEvent(): void {}
}

describe('CustomerTicketingCloseDialogComponent', () => {
  let component: CustomerTicketingCloseDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseDialogComponent>;
  let customerTicketingDetailsService: CustomerTicketingDetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCloseDialogComponent],
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
    fixture = TestBed.createComponent(CustomerTicketingCloseDialogComponent);
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

  describe('closeRequest', () => {
    it('should not call createTicketEvent if the form is invalid', () => {
      spyOn(customerTicketingDetailsService, 'createTicketEvent');

      component.form.get('message')?.setValue('');
      component.closeRequest();

      expect(
        customerTicketingDetailsService.createTicketEvent
      ).not.toHaveBeenCalled();
    });

    it('should call createTicketEvent if the form is valid', () => {
      const mockEvent = {
        message: 'mockMessage',
        toStatus: {
          id: STATUS.CLOSE,
          name: STATUS_NAME.CLOSE,
        },
      };
      spyOn(customerTicketingDetailsService, 'createTicketEvent');

      component.form.get('message')?.setValue('mockMessage');
      component.closeRequest();

      expect(
        customerTicketingDetailsService.createTicketEvent
      ).toHaveBeenCalledWith(mockEvent);
    });
  });
});
