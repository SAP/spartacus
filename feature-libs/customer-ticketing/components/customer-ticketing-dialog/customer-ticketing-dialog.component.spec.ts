import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';

import { CustomerTicketingDialogComponent } from './customer-ticketing-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

describe('CustomerTicketingReopenDialogComponent', () => {
  let component: CustomerTicketingDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
