import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CpqQuoteHeadingComponent } from './cpq-quote-heading.component';
import { TranslationService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';

describe('CpqQuoteHeadingComponent', () => {
  let component: CpqQuoteHeadingComponent;
  let fixture: ComponentFixture<CpqQuoteHeadingComponent>;
  let mockOutletContextData: BehaviorSubject<any[]>;

  beforeEach(waitForAsync(() => {
    mockOutletContextData = new BehaviorSubject<any[]>([]);

    TestBed.configureTestingModule({
      declarations: [CpqQuoteHeadingComponent],
      providers: [
        { provide: TranslationService, useValue: { translate: () => of('Discount Percentage') } },
        { provide: OutletContextData, useValue: { context$: mockOutletContextData } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display discountLabel when dataAvailable is true', () => {
    component.dataAvailable = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Discount Percentage');
  });

  it('should not display discountLabel when dataAvailable is false', () => {
    // Simulate data not being available
    component.dataAvailable = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).not.toContain('Discount Percentage');
  });
});
