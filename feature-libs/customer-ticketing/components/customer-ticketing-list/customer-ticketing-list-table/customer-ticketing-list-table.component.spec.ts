import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerTicketingListTableComponent } from './customer-ticketing-list-table.component';

describe('CustomerTicketingListTableComponent should init', () => {
  let component: CustomerTicketingListTableComponent;
  let fixture: ComponentFixture<CustomerTicketingListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingListTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
