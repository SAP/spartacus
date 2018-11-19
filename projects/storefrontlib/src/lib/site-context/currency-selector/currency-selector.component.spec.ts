import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CurrencyService, defaultOccConfig, OccConfig } from '@spartacus/core';
import { CurrencySelectorComponent } from './currency-selector.component';

const mockCurrencies: any[] = [
  { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
];
const mockActiveCurr = 'USD';

const currencyServiceMock = {
  currencies$: of(mockCurrencies),
  activeCurrency$: of(mockActiveCurr)
};
describe('CurrencySelectorComponent', () => {
  let component: CurrencySelectorComponent;
  let fixture: ComponentFixture<CurrencySelectorComponent>;
  let service: CurrencyService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencySelectorComponent],
      providers: [
        {
          provide: CurrencyService,
          useValue: currencyServiceMock
        },
        { provide: OccConfig, useValue: defaultOccConfig }
      ]
    })
      .overrideComponent(CurrencySelectorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencySelectorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    service = TestBed.get(CurrencyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get currencies and activeCurrency in ngOnInit', () => {
    component.currencies$.subscribe(value => {
      expect(value).toEqual(mockCurrencies);
    });
    component.activeCurrency$.subscribe(value => {
      expect(value).toEqual(mockActiveCurr);
    });
  });

  it('should change currency', () => {
    component.setActiveCurrency('CAD');
    expect(service.activeCurrency).toEqual('CAD');
  });

  it('should contain dropdown with currencies', () => {
    component.currencies$ = of(mockCurrencies);
    fixture.detectChanges();

    const label = el.query(By.css('label'));
    const selectBox = el.query(By.css('select'));

    expect(selectBox.nativeElement.value).toEqual(mockCurrencies[0].isocode);
    expect(label.nativeElement.textContent).toEqual('Currency');
  });

  it('should contain disabled dropdown when currencies list is empty', () => {
    component.currencies$ = of([]);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox.nativeElement.disabled).toBeTruthy();
  });

  it('should contain enabled dropdown when currencies list is NOT empty', () => {
    component.currencies$ = of(mockCurrencies);
    fixture.detectChanges();

    const selectBox = el.query(By.css('select'));
    expect(selectBox.nativeElement.disabled).toBeFalsy();
  });
});
