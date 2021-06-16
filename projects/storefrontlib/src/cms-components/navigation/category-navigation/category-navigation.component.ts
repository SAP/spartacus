import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsNavigationComponent } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';
import { mergeMap } from 'rxjs/operators';

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
   * This method is used to construct an observable that will return the total number navigation nodes present in the menu.
   */
  getNumberOfNavigationOptions(): Observable<number> {
    return this.service.getNavigationNode(this.componentData.data$).pipe(
      mergeMap((nodes: NavigationNode) => {
        let numNodes = 0;
        if (nodes.children) {
          numNodes = nodes.children?.length;
        }
        return of(numNodes);
      })
    );
  }
}
