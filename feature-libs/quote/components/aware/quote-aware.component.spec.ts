import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteAwareComponent } from './quote-aware.component';

describe('QuoteAwareComponent', () => {
  let fixture: ComponentFixture<QuoteAwareComponent>;
  let component: QuoteAwareComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteAwareComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAwareComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
