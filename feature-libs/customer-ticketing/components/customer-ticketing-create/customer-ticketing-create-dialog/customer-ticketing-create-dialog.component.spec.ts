import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { CustomerTicketingDetailsService } from '../../customer-ticketing-details.service';

import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockCustomerTicketingDetailsService
  implements Partial<CustomerTicketingDetailsService>
{
  createTicketEvent(): void {}
}

describe('CustomerTicketingCreateDialogComponent', () => {
  let component: CustomerTicketingCreateDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCreateDialogComponent],
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
    fixture = TestBed.createComponent(CustomerTicketingCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
