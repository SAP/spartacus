import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AnonymousConsentsConfig,
  ANONYMOUS_CONSENTS_FEATURE,
  CmsNavigationComponent,
  isFeatureEnabled,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'cx-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterNavigationComponent {
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  styleClass$: Observable<string> = this.componentData.data$.pipe(
    map((d) => d.styleClass)
  );

  // in order to preserve the backwards compatibility, this should render only if anonymous consents feature is disabled
  data$ = this.componentData.data$.pipe(
    filter(
      (_) =>
        !isFeatureEnabled(
          this.anonymousConsentsConfig,
          ANONYMOUS_CONSENTS_FEATURE
        )
    )
  );

  constructor(
    componentData: CmsComponentData<CmsNavigationComponent>,
    service: NavigationService,
    // tslint:disable-next-line: unified-signatures
    anonymousConsentsConfig: AnonymousConsentsConfig
  );
  /**
   * @deprecated since version 1.3
   * Instead, use:
   * 
    ```ts
      constructor(
      componentData: CmsComponentData<CmsNavigationComponent>,
      service: NavigationService,
      anonymousConsentsConfig: AnonymousConsentsConfig
    )
    ```
   */
  constructor(
    componentData: CmsComponentData<CmsNavigationComponent>,
    service: NavigationService
  );
  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService,
    protected anonymousConsentsConfig?: AnonymousConsentsConfig
  ) {}
}
