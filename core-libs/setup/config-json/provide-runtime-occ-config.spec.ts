/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { makeStateKey, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CONFIG_INITIALIZER,
  ConfigInitializer,
  LoggerService,
} from '@spartacus/core';
import { provideRuntimeOccConfig } from './provide-runtime-occ-config';
import { RUNTIME_ENVIRONMENT } from './runtime-environment.token';

const CX_RUNTIME_CONFIG_KEY =
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

class MockLoggerService {
  debug = jest.fn();
  log = jest.fn();
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
}

function getInitializer(): ConfigInitializer {
  const initializers = TestBed.inject<(ConfigInitializer | null)[]>(
    CONFIG_INITIALIZER as any
  );
  const found = (initializers ?? []).find((i) =>
    i?.scopes?.includes('backend')
  );
  if (!found) {
    throw new Error('No CONFIG_INITIALIZER with scope "backend" found');
  }
  return found;
}

describe('provideRuntimeOccConfig', () => {
  let transferState: MockTransferState;
  let loggerService: MockLoggerService;

  beforeEach(() => {
    transferState = new MockTransferState();
    loggerService = new MockLoggerService();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should map OCC_BASE_URL to backend.occ.baseUrl', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        { provide: LoggerService, useValue: loggerService },
        {
          provide: RUNTIME_ENVIRONMENT,
          useValue: { OCC_BASE_URL: 'https://api.commerce.sap.com' },
        },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.occ?.baseUrl).toBe('https://api.commerce.sap.com');
  });

  it('should map MEDIA_BASE_URL to backend.media.baseUrl', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        {
          provide: RUNTIME_ENVIRONMENT,
          useValue: { MEDIA_BASE_URL: 'https://api.commerce.sap.com/medias' },
        },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.media?.baseUrl).toBe(
      'https://api.commerce.sap.com/medias'
    );
  });

  it('should map both OCC_BASE_URL and MEDIA_BASE_URL together', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        {
          provide: RUNTIME_ENVIRONMENT,
          useValue: {
            OCC_BASE_URL: 'https://api.commerce.sap.com',
            MEDIA_BASE_URL: 'https://api.commerce.sap.com/medias',
          },
        },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.occ?.baseUrl).toBe('https://api.commerce.sap.com');
    expect(config.backend?.media?.baseUrl).toBe(
      'https://api.commerce.sap.com/medias'
    );
  });

  it('should skip empty string OCC_BASE_URL (no-op fallback)', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        { provide: RUNTIME_ENVIRONMENT, useValue: { OCC_BASE_URL: '' } },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.occ?.baseUrl).toBeUndefined();
  });

  it('should work without RUNTIME_ENVIRONMENT provided (returns empty config)', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.occ?.baseUrl).toBeUndefined();
    expect(config.backend?.media?.baseUrl).toBeUndefined();
  });

  it('should write env to TransferState on first call (SSR path)', async () => {
    const runtimeEnv = { OCC_BASE_URL: 'https://api.commerce.sap.com' };

    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnv },
      ],
    });

    const initializer = getInitializer();
    await initializer.configFactory();

    expect(transferState.hasKey(CX_RUNTIME_CONFIG_KEY)).toBe(true);
    expect(transferState.get(CX_RUNTIME_CONFIG_KEY, {})).toEqual(runtimeEnv);
  });

  it('should read from TransferState when key already present (CSR hydration)', async () => {
    const storedEnv = { OCC_BASE_URL: 'https://from-ssr.commerce.sap.com' };
    transferState.set(CX_RUNTIME_CONFIG_KEY, storedEnv);

    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
        {
          provide: RUNTIME_ENVIRONMENT,
          useValue: { OCC_BASE_URL: 'https://different.value' },
        },
      ],
    });

    const initializer = getInitializer();
    const config = await initializer.configFactory();

    expect(config.backend?.occ?.baseUrl).toBe(
      'https://from-ssr.commerce.sap.com'
    );
  });

  it('should register scope "backend"', () => {
    TestBed.configureTestingModule({
      providers: [
        ...provideRuntimeOccConfig(),
        { provide: TransferState, useValue: transferState },
        { provide: LoggerService, useValue: loggerService },
      ],
    });

    const initializer = getInitializer();
    expect(initializer.scopes).toEqual(['backend']);
  });
});
