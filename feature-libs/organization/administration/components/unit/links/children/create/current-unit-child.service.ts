import { Injectable } from '@angular/core';
import { CurrentUnitService } from '../../../services/current-unit.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitChildService extends CurrentUnitService {
  protected getParamKey(): string {
    // We must come up with a fake param key, to avoid that the (parent) unit
    // code is loaded from the route parameter map.
    return 'childUnitCode';
  }
}
