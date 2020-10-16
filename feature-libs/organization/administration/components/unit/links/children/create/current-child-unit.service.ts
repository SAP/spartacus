import { Injectable } from '@angular/core';
import { CurrentUnitService } from '../../../services/current-unit.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentChildUnitService extends CurrentUnitService {
  protected getParamKey(): string {
    // this is fake actually
    return 'childUnitCode';
  }
}
