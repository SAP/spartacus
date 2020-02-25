import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { StorageSyncType } from '../../state/config/state-config';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../../state/reducers/storage-sync.reducer';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  initContext$: Observable<string>;

  constructor(
    protected winRef: WindowRef,
    protected siteContextParamService: SiteContextParamsService
  ) {
    this.initContext$ = combineLatest(
      this.siteContextParamService
        .getContextParameters()
        .map(contextParam =>
          this.siteContextParamService
            .getSiteContextService(contextParam)
            .getActive()
        )
    ).pipe(
      filter(contextValues => contextValues.every(param => !!param)),
      map(() => 'all'),
      take(1)
    );
  }

  register<T>(
    key: string,
    source: Observable<T>,
    contextParams: string[] = [],
    storageType: StorageSyncType = StorageSyncType.LOCAL_STORAGE
  ): Observable<T> {
    function keyWithContext(context) {
      return `spartacus-${context}-${key}`;
    }
    const storage = getStorage(storageType, this.winRef);

    const contextWithParams$ = combineLatest(
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

    const context$ =
      contextParams.length > 0 ? contextWithParams$ : this.initContext$;

    source.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
      persistToStorage(keyWithContext(context), state, storage);
    });

    return context$.pipe(
      map(context => {
        return readFromStorage(storage, keyWithContext(context)) as T;
      })
    );
  }
}
