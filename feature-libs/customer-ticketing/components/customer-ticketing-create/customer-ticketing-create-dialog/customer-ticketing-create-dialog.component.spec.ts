import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
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
        { provide: RoutingService, useClass: MockRoutingService },
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
