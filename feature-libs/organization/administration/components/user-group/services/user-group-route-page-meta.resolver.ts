import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentUserGroupService } from './current-user-group.service';

@Injectable({ providedIn: 'root' })
export class UserGroupRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUserGroupService
  ) {
    super(translation);
  }

  protected getParams(): Observable<UserGroup> {
    return this.currentItemService.item$;
  }
}
