import { Injectable } from '@angular/core';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Injectable()
export abstract class OrganizationAssignService<T> {
  constructor(
    protected currentOrganizationItemService: CurrentOrganizationItemService<T>
  ) {}
  abstract toggle(model: T);
}
