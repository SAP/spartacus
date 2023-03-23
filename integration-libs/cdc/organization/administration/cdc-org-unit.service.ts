import { Injectable } from '@angular/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
@Injectable({
  providedIn: 'root',
})
export class CdcOrgUnitService extends OrgUnitService {
  isUpdatingUnitAllowed(): boolean {
    return false;
  }
}
