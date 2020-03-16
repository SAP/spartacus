import { Location } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { RoutingService, WindowRef } from '@spartacus/core';
import { OutletPosition, OutletService } from '../../../../cms-structure/index';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigMessageComponent } from '../config-message/config-message.component';

@Injectable({
  providedIn: 'root',
})
export class ConfigMessageEnablerService {
  /** indicates whether the configuration message component has been added already */
  private isUiAdded = false;

  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private routingService: RoutingService
  ) {}

  /**
   * Loads the configuration message component
   */
  load(): void {
    if (
      this.configRouterExtractorService.isConfigurator(this.routingService) ||
      this.configRouterExtractorService.isOverview(this.routingService)
    ) {
      this.addUi();
    }
  }

  private addUi(): void {
    if (this.isUiAdded) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ConfigMessageComponent
    );
    this.outletService.add('cx-header', factory, OutletPosition.AFTER);

    this.isUiAdded = true;
  }
}
