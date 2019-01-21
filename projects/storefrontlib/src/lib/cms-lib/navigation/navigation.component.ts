import { Component, Input } from '@angular/core';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NavigationService } from './navigation.service';
import { CmsService, CmsNavigationComponent } from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() dropdownMode = 'list';
  @Input() node: any;

  node$: Observable<NavigationNode>;

  constructor(
    protected cmsService: CmsService,
    private navigationService: NavigationService,
    public component: CmsComponentData<CmsNavigationComponent>
  ) {
    this.node$ = this.component.data$.pipe(
      switchMap(data => {
        if (data) {
          const navigation = data.navigationNode ? data.navigationNode : data;
          return this.cmsService.getNavigationEntryItems(navigation.uid).pipe(
            tap(items => {
              if (items === undefined) {
                this.navigationService.getNavigationEntryItems(
                  navigation,
                  true,
                  []
                );
              }
            }),
            filter(items => items !== undefined),
            map(items => this.navigationService.createNode(navigation, items))
          );
        }
      })
    );
  }
}
