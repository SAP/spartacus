import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  CurrencyService,
  defaultOccConfig,
  OccConfig,
  Currency
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { CurrencySelectorComponent } from './currency-selector.component';

const mockCurrencies: Currency[] = [
  { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
];
const mockActiveCurr = 'USD';

class MockCurrencyService {
  get(): Observable<Currency[]> {
    return of(mockCurrencies);
  }
  getActive(): Observable<string> {
    return of(mockActiveCurr);
  }
  setActive(_currency: string): void {}
}

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
          useClass: MockCurrencyService
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
    let currenciesResult: Currency[];
    component.currencies$
      .subscribe(value => {
        currenciesResult = value;
      })
      .unsubscribe();
    expect(currenciesResult).toEqual(mockCurrencies);

    let activeCurrencyResult: string;
    component.activeCurrency$
      .subscribe(value => {
        activeCurrencyResult = value;
      })
      .unsubscribe();
    expect(activeCurrencyResult).toEqual(mockActiveCurr);
  });

  it(`should call facade's 'setActive()'`, () => {
    spyOn(service, 'setActive').and.stub();

    component.setActiveCurrency('CAD');

    expect(service.setActive).toHaveBeenCalledWith('CAD');
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
