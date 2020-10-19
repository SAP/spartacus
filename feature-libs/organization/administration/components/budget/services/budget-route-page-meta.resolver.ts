import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentBudgetService } from './current-budget.service';

@Injectable({ providedIn: 'root' })
export class BudgetRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentBudgetService
  ) {
    super(translation);
  }

  protected getParams(): Observable<Budget> {
    return this.currentItemService.item$;
  }
}
