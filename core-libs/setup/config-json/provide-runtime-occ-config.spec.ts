/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { makeStateKey, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Config } from '@spartacus/core';
import { ENVIRONMENT } from './provide-environment';
import { provideRuntimeOccConfig } from './provide-runtime-occ-config';
import { RUNTIME_ENVIRONMENT } from './runtime-environment.token';

const CX_ENVIRONMENT_STATE_KEY =
  makeStateKey<Record<string, string>>('cx-runtime-config');

class MockTransferState {
  protected store = new Map<any, any>();

  hasKey(key: any): boolean {
    return this.store.has(key);
  }
  set(key: any, value: any): void {
    this.store.set(key, value);
  }
  get(key: any, defaultValue: any): any {
    return this.store.has(key) ? this.store.get(key) : defaultValue;
  }
}

describe('provideRuntimeOccConfig', () => {
  let transferState: MockTransferState;

  beforeEach(() => {
    transferState = new MockTransferState();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function setup(runtimeEnv?: Record<string, string>) {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        ...(runtimeEnv
          ? [{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnv }]
          : []),
      ],
    });
  }

  it('should map OCC_BASE_URL to backend.occ.baseUrl', () => {
    setup({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
    const config = TestBed.inject(Config) as any;
    expect(config.backend?.occ?.baseUrl).toBe('https://api.commerce.sap.com');
  });

  it('should skip empty string OCC_BASE_URL (no-op fallback)', () => {
    setup({ OCC_BASE_URL: '' });
    const config = TestBed.inject(Config) as any;
    expect(config.backend?.occ?.baseUrl).toBeUndefined();
  });

  it('should work without RUNTIME_ENVIRONMENT provided (returns empty config)', () => {
    setup();
    const config = TestBed.inject(Config) as any;
    expect(config.backend?.occ?.baseUrl).toBeUndefined();
  });

  it('should write env to TransferState on first resolution (SSR path)', () => {
    const runtimeEnv = { OCC_BASE_URL: 'https://api.commerce.sap.com' };
    setup(runtimeEnv);
    TestBed.inject(ENVIRONMENT);
    expect(transferState.hasKey(CX_ENVIRONMENT_STATE_KEY)).toBe(true);
    expect(transferState.get(CX_ENVIRONMENT_STATE_KEY, {})).toEqual(runtimeEnv);
  });

  it('should read from TransferState when key already present (CSR hydration)', () => {
    const storedEnv = { OCC_BASE_URL: 'https://from-ssr.commerce.sap.com' };
    transferState.set(CX_ENVIRONMENT_STATE_KEY, storedEnv);
    setup({ OCC_BASE_URL: 'https://different.value' });
    const config = TestBed.inject(Config) as any;
    expect(config.backend?.occ?.baseUrl).toBe(
      'https://from-ssr.commerce.sap.com'
    );
  });
});
