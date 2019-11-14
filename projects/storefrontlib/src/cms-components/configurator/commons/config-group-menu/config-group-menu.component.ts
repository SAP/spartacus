import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';

@Component({
  selector: 'cx-config-group-menu',
  templateUrl: './config-group-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigGroupMenuComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private hamburgerMenuService: HamburgerMenuService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.rootProduct),
      switchMap(product =>
        this.configuratorCommonsService.getConfiguration(product)
      )
    );
  }

  click(configId: string, productCode: string, group: Configurator.Group) {
    this.configuratorGroupsService.navigateToGroup(
      configId,
      productCode,
      group.id
    );
    this.hamburgerMenuService.toggle(true);
  }
}
