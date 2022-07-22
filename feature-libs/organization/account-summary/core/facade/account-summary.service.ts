import { Injectable } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AccountSummaryConnector } from '../connector/account-summary-connector';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryService implements AccountSummaryFacade {
  unitCode$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params),
    distinctUntilChanged()
  );
  userId: string;

  constructor(
    private routingService: RoutingService,
    private userIdService: UserIdService,
    private accountSummaryConnector: AccountSummaryConnector
  ) {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.userId = userId;
    });
  }

  getAccountSummary(): Observable<any> {
    console.log('GET ACCOUNT SUMMARY ');
    return this.unitCode$.pipe(
      tap((params) => {
        this.accountSummaryConnector.getAccountSummary(
          this.userId,
          params.unitCode
        );
      }),
      map((accountSummary) => accountSummary ?? [])
    );
  }

  getAccountSummaryDocument(): Observable<any> {
    console.log('GET ACCOUNT SUMMARY DOCUMENT');
    return new Observable<any>();
  }
}
