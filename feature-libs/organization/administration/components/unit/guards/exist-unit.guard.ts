import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentUnitService } from '../services/current-unit.service';

@Injectable({
  providedIn: 'root',
})
export class ExistUnitGuard extends ExistOrganizationItemGuard {
  constructor(
    protected unitService: OrgUnitService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentUnitService: CurrentUnitService
  ) {
    super(routingService, globalMessageService);
  }

  canActivate() {
    return this.currentUnitService.key$.pipe(
      switchMap((code) => this.unitService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('units');
          this.showErrorMessage('Unit');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
