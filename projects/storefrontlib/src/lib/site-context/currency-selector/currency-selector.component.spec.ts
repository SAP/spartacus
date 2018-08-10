import { By } from '@angular/platform-browser';
import { ConfigService } from './../config.service';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySelectorComponent } from './currency-selector.component';
import * as fromStore from './../shared/store';
import * as fromRoot from './../../routing/store';

import * as fromActions from './../shared/store/actions/currencies.action';
import { PageType } from '../../routing/models/page-context.model';
import { of } from 'rxjs';

class MockConfigService {
  site = {
    language: 'de',
    currency: 'JPY'
  };
}

describe('CurrencySelectorComponent', () => {
  const currencies: any[] = [
    { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
  ];

  let component: CurrencySelectorComponent;
  let fixture: ComponentFixture<CurrencySelectorComponent>;
  let store: Store<fromStore.SiteContextState>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          siteContext: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [CurrencySelectorComponent],
      providers: [
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
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

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain currencies button', () => {
    component.currencies$ = of(currencies);

    const label = el.query(By.css('label'));
    const select = el.query(By.css('select'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(select.nativeElement.value).toEqual(currencies[0].isocode);
    });

    expect(label.nativeElement.textContent).toEqual('Currency');
  });

  it('should get currency data', () => {
    const action = new fromActions.LoadCurrenciesSuccess(currencies);
    store.dispatch(action);

    store.select(fromStore.getAllCurrencies).subscribe(data => {
      expect(data).toEqual(currencies);
    });
  });

  it('should change currency', () => {
    const pageContext = { id: 'testPageId', type: PageType.CONTENT_PAGE };
    store.dispatch({
      type: 'ROUTER_NAVIGATION',
      payload: {
        routerState: {
          context: pageContext
        },
        event: {}
      }
    });

    const usdCurrency = 'USD';
    component.setActiveCurrency(usdCurrency);
    expect(component.activeCurrency).toEqual(usdCurrency);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromActions.SetActiveCurrency(usdCurrency)
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromActions.CurrencyChange()
    );
  });
});
