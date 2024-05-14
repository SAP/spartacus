import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpqQuoteHeadingComponent } from './cpq-quote-heading.component';
import { OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';

describe('CpqQuoteHeadingComponent', () => {
  let component: CpqQuoteHeadingComponent;
  let fixture: ComponentFixture<CpqQuoteHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpqQuoteHeadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataAvailable to true when context$ emits data with cpqDiscounts', () => {
    const mockContext = [{ cpqDiscounts: ['Discount 1', 'Discount 2'] }];
    (component as any).outlet = {
      context$: of(mockContext),
    } as OutletContextData<any>;
    component.ngOnInit();
    expect(component.dataAvailable).toBeTruthy();
  });

  it('should set dataAvailable to false when context$ emits empty data', () => {
    const mockContext: any[] = [];
    (component as any).outlet = {
      context$: of(mockContext),
    } as OutletContextData<any>;
    component.ngOnInit();
    expect(component.dataAvailable).toBeFalsy();
  });
});
