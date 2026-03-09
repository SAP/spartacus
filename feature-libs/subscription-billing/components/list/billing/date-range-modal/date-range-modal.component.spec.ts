import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeModalComponent } from './date-range-modal.component';

describe('DateRangeModalComponent', () => {
  let component: DateRangeModalComponent;
  let fixture: ComponentFixture<DateRangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangeModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
