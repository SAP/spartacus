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
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<string>;
  productCode: string;

  subscription = new Subscription();
  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.initConfigurationForm(state))
    );
  }

  initConfigurationForm(routingData) {
    this.productCode = routingData.state.params.rootProduct;

    this.configuration$ = this.configuratorCommonsService.getConfiguration(
      this.productCode
    );
    this.currentGroup$ = this.configuratorGroupsService.getCurrentGroup(
      this.productCode
    );
  }

  updateConfiguration(changedAttribute) {
    this.configuration$.pipe(take(1)).subscribe(configuration => {
      const changedGroup: Configurator.Group[] = [];

      configuration.groups.forEach(group => {
        const attributes: Configurator.Attribute[] = group.attributes.filter(
          attribute => attribute.name !== changedAttribute.name
        );

        group.attributes.forEach(attribute => {
          if (attribute.name === changedAttribute.name) {
            attributes.push(changedAttribute);
          }
        });

        changedGroup.push({
          description: group.description,
          attributes: attributes,
          id: group.id,
          name: group.name,
          configurable: group.configurable,
          groupType: group.groupType,
        });
      });

      //Make new configuration object as state configuration cannot be changed
      const changedConfiguration: Configurator.Configuration = {
        productCode: this.productCode,
        consistent: configuration.consistent,
        configId: configuration.configId,
        complete: configuration.complete,
        groups: changedGroup,
      };

      this.configuration$ = this.configuratorCommonsService.updateConfiguration(
        changedConfiguration
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
