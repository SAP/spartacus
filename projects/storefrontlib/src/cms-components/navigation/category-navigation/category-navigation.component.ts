import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsNavigationComponent } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';
import { mergeMap } from 'rxjs/operators';
import { NavigationUiConfig } from '../navigation/config/navigation-ui-config';

@Component({
  selector: 'cx-category-navigation',
  templateUrl: './category-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryNavigationComponent {
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  data$: Observable<CmsNavigationComponent> = this.componentData.data$;

  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService
  ) {}

  /**
   * Returns navigation-ui config information.
   */
  getNavUIConfig(): Observable<NavigationUiConfig> {
    return this.componentData.data$.pipe(
      mergeMap((data: CmsNavigationComponent) => {
        let config: NavigationUiConfig = {
          resetMenuOnClose: Boolean(data?.resetMenuOnClose),
        };
        return of(config);
      })
    );
  }
}
