import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';

@Component({
  selector: 'cx-config-group-menu',
  templateUrl: './config-group-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigGroupMenuComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  productCode: string;
  subscription = new Subscription();

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private hamburgerMenuService: HamburgerMenuService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.initConfigurationGroups(state))
    );
  }

  initConfigurationGroups(routingData) {
    this.productCode = routingData.state.params.rootProduct;

    this.configuration$ = this.configuratorCommonsService.getConfiguration(
      this.productCode
    );
  }

  click(group: Configurator.Group) {
    this.configuratorGroupsService.setCurrentGroup(this.productCode, group.id);

    this.hamburgerMenuService.toggle(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
