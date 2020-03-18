import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { map, switchMap } from 'rxjs/operators';
import {
  OutletPosition,
  OutletService,
} from '../../../../../cms-structure/index';
import { ConfigRouterExtractorService } from '../../../generic/service/config-router-extractor.service';
import { ConfigMessageComponent } from '../config-message.component';

@Injectable({
  providedIn: 'root',
})
export class ConfigMessageEnablerService {
  /** indicates whether the configuration message component has been added already */
  private isUiAdded = false;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private routingService: RoutingService
  ) {}

  /**
   * Loads the configuration message component
   */
  load(): void {
    this.configRouterExtractorService
      .isConfigurator(this.routingService)
      .pipe(
        switchMap(isConfiguration =>
          this.configRouterExtractorService
            .isOverview(this.routingService)
            .pipe(
              map(
                isOverview =>
                  isConfiguration.isConfigurator || isOverview.isOverview
              )
            )
        )
      )
      .subscribe(isConfigurationOrOverviewPage => {
        if (isConfigurationOrOverviewPage) {
          this.addUi();
        }
      });
  }

  private addUi(): void {
    if (this.isUiAdded) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ConfigMessageComponent
    );
    this.outletService.add('cx-storefront', factory, OutletPosition.BEFORE);

    this.isUiAdded = true;
  }
}
