import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  Permission,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentPermissionService
  ) {
    super(translation);
  }

  protected getParams(): Observable<Permission> {
    return this.currentItemService.item$;
  }
}
