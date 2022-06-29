import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';

@Injectable()
/**
 * Rulebased configurator effects related to variant search
 */
export class ConfiguratorVariantEffects {
  searchVariants$: Observable<
    | ConfiguratorActions.SearchVariantsSuccess
    | ConfiguratorActions.SearchVariantsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.SEARCH_VARIANTS),
      switchMap((action: ConfiguratorActions.SearchVariants) => {
        return this.configuratorCommonsConnector
          .searchVariants(action.payload)
          .pipe(
            switchMap((result: Configurator.Variant[]) => [
              new ConfiguratorActions.SearchVariantsSuccess({
                ownerKey: action.payload.owner.key,
                variants: result,
              }),
            ]),
            catchError((error) => [
              new ConfiguratorActions.SearchVariantsFail({
                ownerKey: action.payload.owner.key,
                error: normalizeHttpError(error),
              }),
            ])
          );
      })
    )
  );

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector
  ) {}
}
