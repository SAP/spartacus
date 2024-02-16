import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteCartGuardComponent } from './quote-cart-guard.component';

describe('QuoteCartGuardComponent', () => {
  let fixture: ComponentFixture<QuoteCartGuardComponent>;
  let component: QuoteCartGuardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteCartGuardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCartGuardComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
