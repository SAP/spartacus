import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceQuotesCartComponent } from './commerce-quotes-cart.component';

describe('CommerceQuotesCartComponent', () => {
  let component: CommerceQuotesCartComponent;
  let fixture: ComponentFixture<CommerceQuotesCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommerceQuotesCartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceQuotesCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
