import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent {
  routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData();

  constructor(
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}
}
