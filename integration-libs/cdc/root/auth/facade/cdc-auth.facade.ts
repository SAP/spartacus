import { Injectable } from '@angular/core';
import { AuthToken, facadeFactory } from '@spartacus/core';
import { CDC_CORE_FEATURE } from '../../feature-name';

export function cdcAuthFacadeFactory() {
  return facadeFactory({
    facade: CdcAuthFacade,
    feature: CDC_CORE_FEATURE,
    methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: cdcAuthFacadeFactory,
})
export abstract class CdcAuthFacade {
  abstract loginWithCustomCdcFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): void;

  abstract loginWithToken(
    token: Partial<AuthToken> & { expires_in?: number }
  ): void;
}
