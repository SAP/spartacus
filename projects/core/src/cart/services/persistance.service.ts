import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor(
    private winRef: WindowRef,
    private siteContextParamService: SiteContextParamsService
  ) {}

  register<T>(
    key: string,
    source: Observable<T>,
    contextParams: string[]
  ): Observable<T> {
    function keyWithContext(context) {
      return `spartacus-${key}-data-${context}`;
    }

    const context$ = combineLatest(
      contextParams.map(contextParam =>
        this.siteContextParamService
          .getSiteContextService(contextParam)
          .getActive()
      )
    ).pipe(
      filter(contextValues => contextValues.every(param => !!param)),
      map(contextValues => contextValues.join('-')),
      distinctUntilChanged()
    );

    source.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
      this.saveStateToStorage(state, keyWithContext(context));
    });

    return context$.pipe(
      map(context => {
        const state = this.restoreStateFromStorage(keyWithContext(context));
        return state;
      })
    );
  }

  saveStateToStorage(state, storageKey) {
    this.winRef.localStorage.setItem(storageKey, JSON.stringify(state));
  }

  restoreStateFromStorage(storageKey) {
    try {
      const state = JSON.parse(this.winRef.localStorage.getItem(storageKey));
      return state;
    } catch {}
    return null;
  }
}
