import { Injectable } from '@angular/core';
import { GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorGroupStatusService } from '../../../../../../core/src/configurator/commons/facade';

@Injectable({
  providedIn: 'root',
})
export class ConfigUtilsService {
  constructor(
    private configuratorGroupStatusService: ConfiguratorGroupStatusService
  ) {}

  isCartEntryOrGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupStatusService
      .isGroupVisited(owner, groupId)
      .pipe(
        take(1),
        map((result) => {
          if (
            owner.type === GenericConfigurator.OwnerType.CART_ENTRY ||
            result
          ) {
            return true;
          }
          return false;
        })
      );
  }
}
