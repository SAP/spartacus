import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseSiteService, RoutingService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountSummaryDetailsService {

  unitCode$: Observable<string>;
  userId: string;
  baseSiteId: string;

  constructor(private routingService: RoutingService,
    private userIdService: UserIdService,
    private baseSiteService: BaseSiteService) {
    this.unitCode$ = this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params.unitCode),
      distinctUntilChanged()
    );
    this.userIdService.takeUserId().subscribe((userId) => {
      this.userId = userId;
    });
    this.baseSiteService.getActive().subscribe((baseSiteId) => {
      this.baseSiteId = baseSiteId;
    });

  }

  getAccountSummaryData(unitCode: string) {
    //TODO - incomplete
  }
}
