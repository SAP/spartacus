import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';

describe('RequestQuoteButtonComponent', () => {
  let component: RequestQuoteButtonComponent;
  let fixture: ComponentFixture<RequestQuoteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestQuoteButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuoteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
