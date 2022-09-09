import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingReopenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
