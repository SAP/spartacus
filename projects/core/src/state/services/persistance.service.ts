import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
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
export class PersistanceService {
  constructor(
    private winRef: WindowRef,
    private siteContextParamService: SiteContextParamsService
  ) {}

  register<T>(
    key: string,
    source: Observable<T>,
    contextParams: string[],
    storageType: StorageSyncType = StorageSyncType.LOCAL_STORAGE
  ): Observable<T> {
    function keyWithContext(context) {
      return `spartacus-${key}-data-${context}`;
    }

    const storage = getStorage(storageType, this.winRef);

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
      persistToStorage(keyWithContext(context), state, storage);
    });

    return context$.pipe(
      map(context => {
        return readFromStorage(storage, keyWithContext(context)) as T;
      })
    );
  }
}
