import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerTicketingListHeaderComponent } from './customer-ticketing-list-header.component';

describe('CustomerTicketingListHeaderComponent should init', () => {
  let component: CustomerTicketingListHeaderComponent;
  let fixture: ComponentFixture<CustomerTicketingListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingListHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
