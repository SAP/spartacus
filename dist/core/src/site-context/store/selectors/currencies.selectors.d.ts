import { MemoizedSelector } from '@ngrx/store';
import { Currency } from '../../../model/misc.model';
import { CurrenciesState, CurrencyEntities, StateWithSiteContext } from '../state';
export declare const getCurrenciesState: MemoizedSelector<StateWithSiteContext, CurrenciesState>;
export declare const getCurrenciesEntities: MemoizedSelector<StateWithSiteContext, CurrencyEntities | null>;
export declare const getActiveCurrency: MemoizedSelector<StateWithSiteContext, string | null>;
export declare const getAllCurrencies: MemoizedSelector<StateWithSiteContext, Currency[] | null>;
