import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CpqQuoteHeadingComponent } from './cpq-quote-heading.component';
import { TranslationService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';

describe('CpqQuoteHeadingComponent', () => {
  let component: CpqQuoteHeadingComponent;
  let fixture: ComponentFixture<CpqQuoteHeadingComponent>;
  let mockOutletContextData: BehaviorSubject<any[]>;
  let translationService: TranslationService;

  beforeEach(waitForAsync(() => {
    mockOutletContextData = new BehaviorSubject<any[]>([]);

    TestBed.configureTestingModule({
      imports: [CpqQuoteHeadingComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: { translate: () => of('Discount Percentage') },
        },
        {
          provide: OutletContextData,
          useValue: { context$: mockOutletContextData },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteHeadingComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set discountLabel on translationService subscription', () => {
    translationService.translate('cpqQuoteHeading').subscribe(() => {
      expect(component.discountLabel).toBe('Discount Percentage');
    });
  });

  it('should set dataAvailable to true if context contains cpqDiscounts', () => {
    mockOutletContextData.next([{ cpqDiscounts: ['discount1', 'discount2'] }]);
    expect(component.dataAvailable).toBe(true);
  });

  it('should set dataAvailable to false if context does not contain cpqDiscounts', () => {
    mockOutletContextData.next([]);
    expect(component.dataAvailable).toBe(false);
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component['subscription'].closed).toBe(true);
  });

  it('should set flag in cpqQuoteService based on cpqDiscounts availability', () => {
    // Mock cpqQuoteService
    const cpqQuoteServiceSpy = spyOn(component['cpqQuoteService'], 'setFlag');
    mockOutletContextData.next([{ cpqDiscounts: ['discount1', 'discount2'] }]);
    expect(cpqQuoteServiceSpy).toHaveBeenCalledWith(false);
    mockOutletContextData.next([]);
    expect(cpqQuoteServiceSpy).toHaveBeenCalledWith(true); // Because hasDiscounts is false
  });
});
