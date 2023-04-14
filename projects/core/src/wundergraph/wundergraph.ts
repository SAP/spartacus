/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, WunderGraphClient } from '.wundergraph/generated/client';
import { isPlatformServer } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { QueryRequestOptions } from '@wundergraph/sdk/client';

export const WUNDERGRAPH = new InjectionToken('WUNDERGRAPH', {
  factory() {
    const client = createClient();
    return decorateClient(client);
  },
});

function decorateClient(client: WunderGraphClient) {
  const isServer = isPlatformServer(inject(PLATFORM_ID));

  return isServer
    ? forceZoneToWaitForQuery(transferredQueryData(client))
    : useTransferredQueryData(client);
}

function useTransferredQueryData(client: WunderGraphClient) {
  const state = inject(TransferState, { optional: true });
  const query = client.query;

  client.query = (...params: Parameters<typeof query>) => {
    const key = createStateKeyFromQuery(params);

    const transferredData = state?.get(key, null);
    state?.remove(key);

    return transferredData
      ? Promise.resolve(transferredData)
      : query.apply(client, params);
  };

  return client;
}

function transferredQueryData(client: WunderGraphClient) {
  const state = inject(TransferState, { optional: true });
  const query = client.query;

  client.query = (...params: Parameters<typeof query>) => {
    const key = createStateKeyFromQuery(params);

    return query.apply(client, params).then((data) => {
      state?.set(key, data);
      return data;
    });
  };

  return client;
}

function createStateKeyFromQuery(params: [QueryRequestOptions]) {
  const { operationName } = params[0];
  return makeStateKey<any>(operationName);
}

function forceZoneToWaitForQuery(client: WunderGraphClient) {
  const query = client.query;

  client.query = (...params: Parameters<typeof query>) => {
    const finalize = createBackgroundMacroTask();

    return query.apply(client, params).finally(finalize);
  };

  return client;
}

/**
 * Angular's workaround for intercepting the HTPP calls.
 * See more at: https://github.com/angular/angular/blob/294fae02eb32da11202ed4c1cc26ee5a8c291afc/packages/common/http/src/xhr.ts#L354-L358
 */
function createBackgroundMacroTask(): VoidFunction {
  const timeout = setTimeout(() => void 0, MAX_INT);

  return () => clearTimeout(timeout);
}

const MAX_INT = 2147483647;
