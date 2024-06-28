/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import {
  ActionErrorProperty,
  ErrorAction,
} from '../../../error-handling/effects-error-handler/error-action';

export const LOADER_LOAD_ACTION = '[LOADER] LOAD';
export const LOADER_FAIL_ACTION = '[LOADER] FAIL';
export const LOADER_SUCCESS_ACTION = '[LOADER] SUCCESS';
export const LOADER_RESET_ACTION = '[LOADER] RESET';

export interface LoaderMeta {
  entityType: string;
  loader:
    | {
        load?: boolean;
        error?: any;
        success?: boolean;
      }
    | undefined;
}

export interface LoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: LoaderMeta;
}

export function loadMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      load: true,
    },
  };
}

export function failMeta(entityType: string, error?: any): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      error: error ? error : true,
    },
  };
}

export function successMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {
      success: true,
    },
  };
}

export function resetMeta(entityType: string): LoaderMeta {
  return {
    entityType: entityType,
    loader: {},
  };
}

export class LoaderLoadAction implements LoaderAction {
  type = LOADER_LOAD_ACTION;
  readonly meta: LoaderMeta;

  constructor(entityType: string) {
    this.meta = loadMeta(entityType);
  }
}

export class LoaderFailAction implements LoaderAction, ErrorAction {
  type = LOADER_FAIL_ACTION;
  readonly meta: LoaderMeta;

  /**
   * @deprecated Use the `error` parameter with a non-null, non-undefined value.
   *             Support for `null` or `undefined` will be removed in future versions,
   *             along with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor(entityType: string, error: null | undefined);
  // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
  constructor(entityType: string, error: ActionErrorProperty);
  constructor(entityType: string, public error: any) {
    this.meta = failMeta(entityType, error);
    this.error = error;
  }
}

export class LoaderSuccessAction implements LoaderAction {
  type = LOADER_SUCCESS_ACTION;
  readonly meta: LoaderMeta;

  constructor(entityType: string) {
    this.meta = successMeta(entityType);
  }
}

export class LoaderResetAction implements LoaderAction {
  type = LOADER_RESET_ACTION;
  readonly meta: LoaderMeta;

  constructor(entityType: string) {
    this.meta = resetMeta(entityType);
  }
}
