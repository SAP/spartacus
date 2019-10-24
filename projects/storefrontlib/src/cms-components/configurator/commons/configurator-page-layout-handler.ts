import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutHandler } from '../../../cms-structure/page/page-layout/page-layout-handler';

@Injectable()
export class ConfiguratorPageLayoutHandler implements PageLayoutHandler {
  constructor() {}

  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (
      pageTemplate === 'VariantConfigurationTemplate' &&
      (section === 'header' || section === 'navigation')
    ) {
      slots$.pipe(take(1)).subscribe(slots => {
        const configurationSlots = slots.filter(
          slot => slot !== 'NavigationBar'
        );
        slots$ = of(configurationSlots);
      });
    } else if (
      pageTemplate !== 'VariantConfigurationTemplate' &&
      section === 'navigation'
    ) {
      slots$.pipe(take(1)).subscribe(slots => {
        const configurationSlots = slots.filter(
          slot => slot !== 'VariantConfigMenu'
        );
        slots$ = of(configurationSlots);
      });
    }

    return slots$;
  }
}
