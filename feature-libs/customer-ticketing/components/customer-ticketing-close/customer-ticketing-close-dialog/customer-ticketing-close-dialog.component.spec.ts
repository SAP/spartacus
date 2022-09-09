import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
