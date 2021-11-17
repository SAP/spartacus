import { Injectable } from '@angular/core';
import { AuthToken, facadeFactory } from '@spartacus/core';
import { CDC_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CdcAuthFacade,
      feature: CDC_CORE_FEATURE,
      methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
      async: true,
    }),
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
