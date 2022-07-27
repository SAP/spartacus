import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FeatureModulesService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PunchoutSessionService {
  private _sessionId: string | undefined;

  get sessionId(): string | undefined {
    return this._sessionId;
  }

  constructor(
    protected location: Location,
    protected featureModules: FeatureModulesService,
    protected routing: RoutingService
  ) {}

  /**
   * Lazy loads modules and start punchout session
   */
  start(): Observable<any> {
    if (this.isFromAriba() && this.featureModules.isConfigured('punchout')) {
      return this.getPunchoutSession(this.sessionId as string).pipe(
        take(1),
        tap((sessionData) => {
          this.featureModules.resolveFeature('punchout').subscribe();
          if (sessionData.punchoutLevel === 'product') {
            this.routing.go({
              cxRoute: 'product',
              params: { code: sessionData.selectedItem },
            });
          } else {
            this.routing.go({
              cxRoute: 'home',
            });
          }
        })
      );
    }

    return of();
  }

  /**
   * Indicates whether Spartacus is opened from Ariba
   */
  isFromAriba(): boolean {
    const path = this.location.path().split('?')[0];
    const params = this.location.path().split('?')[1];
    const sidParam = params
      ?.split('&')
      .find((param) => param.startsWith('sid='));
    this._sessionId = sidParam?.split('=')[1];

    return path.endsWith('/punchout/cxml/session') && !!this._sessionId;
  }

  /*
   * return some faked data, delay 20s
   */
  getPunchoutSession(_sessionId: string): Observable<any> {
    return of({
      cartId: '00002159',
      punchoutLevel: 'product',
      selectedItem: '2116279',
      token: {
        accessToken: 'xxxxxxx',
        tokenType: 'bearer',
      },
      userId: 'punchout.customer@punchoutorg.com',
    }).pipe(delay(20000));
  }
}
