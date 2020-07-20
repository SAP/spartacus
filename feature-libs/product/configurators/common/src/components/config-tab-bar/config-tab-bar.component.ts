import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent {
  routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData();

  isOverviewPage$: Observable<boolean> = this.routerData$.pipe(
    map(
      (routerData) =>
        routerData.pageType === ConfigurationRouter.PageType.OVERVIEW
    )
  );

  constructor(
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}
}
