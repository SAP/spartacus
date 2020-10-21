import { Injectable } from '@angular/core';
import {
  B2BUser,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({ providedIn: 'root' })
export class UserRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUserService
  ) {
    super(translation);
  }

  protected getParams(): Observable<B2BUser> {
    return this.currentItemService.item$;
  }
}
