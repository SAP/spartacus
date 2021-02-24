import { Injectable } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { BaseItem } from '../../organization.model';

@Injectable({
  providedIn: 'root',
})
export class DisableInfoService<T extends BaseItem> {
  isItemDisabled(item: T): boolean {
    return item?.active === false;
  }

  isParentDisabled(item: T): boolean {
    return (
      (item.orgUnit || (item as any).unit || (item as any).parentOrgUnit)
        ?.active === false && !this.isRootUnit(item)
    );
  }

  isRootUnit(item: B2BUnit): boolean {
    return (
      item?.uid &&
      item?.name &&
      !(item as any)?.orgUnit &&
      !(item as any)?.unit &&
      (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit)
    );
  }
}
