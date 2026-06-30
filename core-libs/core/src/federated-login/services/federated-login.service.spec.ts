/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { LanguageService } from '../../site-context';
import { WindowRef } from '../../window';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model';
import { FederatedLoginContextSerializerService } from './federated-login-context-serializer.service';
import { FederatedLoginContextStorageService } from './federated-login-context-storage';
import { FederatedLoginService } from './federated-login.service';

const mockOriginMap: Record<string, string> = {
  shop1: 'https://storefront1.de',
  shop2: 'https://storefront2.es',
};

const mockConfig: FederatedLoginConfig = {
  federatedLogin: {
    enabled: true,
    contextParameterName: 'context',
    loginHosts: ['login.example.com'],
    originMap: mockOriginMap,
  },
};

class MockLanguageService implements Partial<LanguageService> {
  getActive = vi.fn().mockReturnValue(of('en'));
}

class MockFederatedLoginContextSerializerService
  implements Partial<FederatedLoginContextSerializerService>
{
  serializeContext = vi.fn().mockReturnValue('shop1:en');
  deserializeContext = vi.fn().mockReturnValue({
    origin: 'https://storefront1.de',
    language: 'en',
  });
}

class MockFederatedLoginContextStorageService
  implements Partial<FederatedLoginContextStorageService>
{
  read = vi.fn().mockReturnValue(undefined);
  write = vi.fn().and.stub();
}

function buildWindowRef(href: string): Partial<WindowRef> {
  const url = new URL(href);
  return {
    location: { href, origin: url.origin } as Location,
  };
}

function configureTestBed(
  windowRefValue: Partial<WindowRef>,
  configOverride: Partial<typeof mockConfig> = {}
): void {
  TestBed.configureTestingModule({
    providers: [
      FederatedLoginService,
      {
        provide: FederatedLoginConfig,
        useValue: { ...mockConfig, ...configOverride },
      },
      { provide: WindowRef, useValue: windowRefValue },
      { provide: LanguageService, useClass: MockLanguageService },
      {
        provide: FederatedLoginContextSerializerService,
        useClass: MockFederatedLoginContextSerializerService,
      },
      {
        provide: FederatedLoginContextStorageService,
        useClass: MockFederatedLoginContextStorageService,
      },
    ],
  });
}

describe('FederatedLoginService', () => {
  let service: FederatedLoginService;
  let contextSerializerService: MockFederatedLoginContextSerializerService;
  let contextStorageService: MockFederatedLoginContextStorageService;

  describe('when on a non-login domain', () => {
    beforeEach(() => {
      configureTestBed(buildWindowRef('https://shop.example.com'));

      contextSerializerService = TestBed.inject(
        FederatedLoginContextSerializerService
      ) as unknown as MockFederatedLoginContextSerializerService;
      contextStorageService = TestBed.inject(
        FederatedLoginContextStorageService
      ) as unknown as MockFederatedLoginContextStorageService;

      service = TestBed.inject(FederatedLoginService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should set enabled from config', () => {
      expect(service.enabled).toEqual(mockConfig.federatedLogin?.enabled);
    });

    it('should set isLoginDomain to false', () => {
      expect(service.isLoginDomain).toBe(false);
    });

    describe('context accessors', () => {
      it('should return undefined because contextValue is not set', () => {
        contextStorageService.read.mockReturnValue({
          origin: 'https://storefront1.de',
          language: 'de',
        });
        contextSerializerService.deserializeContext.mockReturnValue({
          origin: 'https://storefront1.de',
          language: 'de',
        });

        service.detectContext();

        expect(service.language).toBeUndefined();
        expect(service.origin).toBeUndefined();
      });
    });

    describe('getParameters()', () => {
      it('should serialize the context with the active language and current window origin', async () => {
        const winRef = TestBed.inject(WindowRef);
        (winRef.location as any).origin = 'https://shop.example.com';

        await firstValueFrom(service.getParameters());

        expect(contextSerializerService.serializeContext).toHaveBeenCalledWith(
          expect.objectContaining({
            language: 'en',
            origin: winRef.location.origin,
          })
        );
      });

      it('should return a URL parameter string', async () => {
        const params = await firstValueFrom(service.getParameters());

        expect(params).toEqual('context=shop1:en');
      });
    });

    describe('detectContext()', () => {
      it('should not take any action (read from storage or deserialize)', () => {
        service.detectContext();

        expect(contextStorageService.read).not.toHaveBeenCalled();
        expect(
          contextSerializerService.deserializeContext
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('when on a login domain', () => {
    beforeEach(() => {
      configureTestBed(
        buildWindowRef('https://login.example.com?cx=shop1%3Aen')
      );

      contextSerializerService = TestBed.inject(
        FederatedLoginContextSerializerService
      ) as unknown as MockFederatedLoginContextSerializerService;
      contextStorageService = TestBed.inject(
        FederatedLoginContextStorageService
      ) as unknown as MockFederatedLoginContextStorageService;

      service = TestBed.inject(FederatedLoginService);
    });

    it('should set isLoginDomain to true when host matches a loginDomain', () => {
      expect(service.isLoginDomain).toBe(true);
    });

    describe('detectContext()', () => {
      it('should read stored context', () => {
        service.detectContext();
        expect(contextStorageService.read).toHaveBeenCalled();
      });

      it('should deserialize the context parameter from the URL', () => {
        service.detectContext();
        expect(contextSerializerService.deserializeContext).toHaveBeenCalled();
      });

      it('should write merged context to storage', () => {
        service.detectContext();
        expect(contextStorageService.write).toHaveBeenCalled();
      });

      it('should set contextValue from deserialized URL param', () => {
        service.detectContext();

        expect(service.origin).toEqual('https://storefront1.de');
      });

      it('should merge stored context with deserialized context, giving deserialized priority', () => {
        contextStorageService.read.mockReturnValue({
          origin: 'https://old.example.com',
          language: 'fr',
        } as FederatedLoginContext);
        contextSerializerService.deserializeContext.mockReturnValue({
          origin: 'https://storefront1.de',
        });

        service.detectContext();

        expect(service.origin).toEqual('https://storefront1.de');
        expect(service.language).toEqual('fr');
      });

      it('should retain stored fields not overridden by deserialized context', () => {
        contextStorageService.read.mockReturnValue({
          origin: 'https://storefront1.de',
        } as FederatedLoginContext);
        contextSerializerService.deserializeContext.mockReturnValue({
          language: 'en',
        });

        service.detectContext();

        expect(service.origin).toEqual('https://storefront1.de');
        expect(service.language).toEqual('en');
      });

      it('should reject stored origin value that is not known', () => {
        contextStorageService.read.mockReturnValue({
          origin: 'https://questionable-domain.com',
        } as FederatedLoginContext);
        contextSerializerService.deserializeContext.mockReturnValue({
          language: 'en',
        });

        service.detectContext();

        expect(service.origin).toEqual(undefined);
        expect(service.language).toEqual('en');
      });
    });

    describe('getParameters()', () => {
      it('should use service origin for the context value when serializing', async () => {
        contextStorageService.read.mockReturnValue({
          origin: 'https://storefront1.de',
        });
        service.detectContext();

        await firstValueFrom(service.getParameters());

        expect(contextSerializerService.serializeContext).toHaveBeenCalledWith(
          expect.objectContaining({ origin: 'https://storefront1.de' })
        );
      });
    });
  });

  describe('when federatedLogin is disabled in config', () => {
    beforeEach(() => {
      configureTestBed(buildWindowRef('https://shop.example.com'), {
        federatedLogin: {
          ...(mockConfig.federatedLogin as NonNullable<
            FederatedLoginConfig['federatedLogin']
          >),
          enabled: false,
        },
      });

      service = TestBed.inject(FederatedLoginService);
    });

    it('should set enabled to false', () => {
      expect(service.enabled).toBe(false);
    });
  });

  describe('when federatedLogin config is absent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FederatedLoginService,
          { provide: FederatedLoginConfig, useValue: {} },
          {
            provide: WindowRef,
            useValue: buildWindowRef('https://shop.example.com'),
          },
          { provide: LanguageService, useClass: MockLanguageService },
          {
            provide: FederatedLoginContextSerializerService,
            useClass: MockFederatedLoginContextSerializerService,
          },
          {
            provide: FederatedLoginContextStorageService,
            useClass: MockFederatedLoginContextStorageService,
          },
        ],
      });
      service = TestBed.inject(FederatedLoginService);
    });

    it('should set enabled to false', () => {
      expect(service.enabled).toBe(false);
    });
  });
});
