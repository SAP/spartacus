import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpqQuoteHeadingComponent } from './cpq-quote-heading.component';

describe('CpqQuoteHeadingComponent', () => {
  let component: CpqQuoteHeadingComponent;
  let fixture: ComponentFixture<CpqQuoteHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpqQuoteHeadingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the text "Discount Percentage"', () => {
    const element: HTMLElement = fixture.nativeElement;
    const textContent = element.textContent;
    expect(textContent).not.toBeNull();
    if (textContent) {
      expect(textContent.trim()).toContain('Discount Percentage');
    }
  });
});
