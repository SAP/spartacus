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
    private http: HttpClient,
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

  getAccountSummary(unitCode: string) {
    //TODO - incomplete
    return this.http.get(`https://spartacus-dev3.eastus.cloudapp.azure.com:9002/occ/v2/${this.baseSiteId}/users/${this.userId}/accountSummary`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: 'Basic ' + btoa('mobile_android' + ':' + 'secret'),
          username: 'linda.wolf@rustic-hw.com',
          password: 'Humorbot5.0'
        }),
        params: {
          unit: unitCode,
        }
      });
  }
}
