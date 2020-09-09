import { Component } from '@angular/core';
import { Configurator, GenericConfiguratorUtilsService } from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-config-overview-notification-banner',
  templateUrl: './configurator-overview-notification-banner.component.html',
})
export class ConfiguratorOverviewNotificationBannerComponent {
  routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData();

  numberOfIssues$: Observable<number> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner)
    ),
    distinctUntilKeyChanged('configId'),
    map((configuration) => {
      if (configuration.totalNumberOfIssues) {
        return configuration.totalNumberOfIssues;
      } else {
        return this.countNumberOfIssues(configuration);
      }
    })
  );

  iconTypes = ICON_TYPE;
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected genericConfigUtilsService: GenericConfiguratorUtilsService
  ) {}

  /**
   * Count number of issues for a configuration.
   * This method will be removed when OCC returns the total number of issues.
   * Our calculation does not cover all groups but only the currently selected
   * one
   * @param configuration Current configuration
   * @returns Number of issues
   */
  countNumberOfIssues(configuration: Configurator.Configuration): number {
    const numberOfConflicts = configuration.flatGroups.filter(
      (group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP
    ).length;
    let numberOfIncompleteFields = 0;
    configuration.flatGroups
      .filter(
        (group) => group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP
      )
      .forEach(
        (group) =>
          (numberOfIncompleteFields =
            numberOfIncompleteFields + this.countIssuesInGroup(group))
      );
    return numberOfConflicts + numberOfIncompleteFields;
  }

  protected countIssuesInGroup(group: Configurator.Group): number {
    let numberOfIssues = 0;
    group.attributes.forEach((attribute) => {
      numberOfIssues =
        numberOfIssues + (attribute.incomplete && attribute.required ? 1 : 0);
    });
    return numberOfIssues;
  }

  /**
   * Retrieves a certain issue message key depending on the number of issues for translation.
   *
   * @param numberOfErrors - number of errors
   * @return {string} - the error message key
   */
  getIssueMessageKey(numberOfErrors: number): string {
    return this.genericConfigUtilsService.getIssueMessageKey(numberOfErrors);
  }
}
