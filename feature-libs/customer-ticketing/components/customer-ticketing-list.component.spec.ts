import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';

describe('CustomerTicketingListComponent should init', () => {
  let component: CustomerTicketingListComponent;
  let fixture: ComponentFixture<CustomerTicketingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
