import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, filter, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-form',
  templateUrl: './configurator-overview-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewFormComponent {
  attributeOverviewType = Configurator.AttributeOverviewType;

  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner
        )
      ),
      distinctUntilKeyChanged('configId'),
      switchMap((configuration) =>
        this.configuratorCommonsService.getConfigurationWithOverview(
          configuration
        )
      ),
      filter((configuration) => configuration.overview != null)
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  /**
   * Does the configuration contain any selected attribute values?
   * @param {Configurator.Configuration} configuration - Current configuration
   * @returns {boolean} - Any attributes available
   */
  hasAttributes(configuration: Configurator.Configuration): boolean {
    return (
      configuration.overview?.groups?.find((group) =>
        group.attributes ? group.attributes.length : 0 > 0
      ) !== undefined
    );
  }

  /**
   * Verifies whether the next or the previous attributes are same.
   *
   * @param {Configurator.AttributeOverview[]} attributes - Attribute array
   * @param {number} index - Index of the attribute in the array
   * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
   */
  isSameAttribute(
    attributes: Configurator.AttributeOverview[],
    index: number
  ): boolean {
    if (attributes.length > 1) {
      if (index === 0) {
        return (
          attributes[index]?.attribute === attributes[index + 1]?.attribute
        );
      } else {
        return (
          attributes[index]?.attribute === attributes[index - 1]?.attribute
        );
      }
    }
    return false;
  }

  /**
   * Retrieves the styling for the corresponding element.
   *
   * @param {Configurator.AttributeOverview[]} attributes - Attribute array
   * @param {number} index - Index of the attribute in the array
   * @return {string} - corresponding style class
   */
  getStyleClasses(
    attributes: Configurator.AttributeOverview[],
    index: number
  ): string {
    let styleClass = '';

    switch (attributes[index]?.type) {
      case this.attributeOverviewType.BUNDLE:
        styleClass += 'bundle';
        break;
      case this.attributeOverviewType.GENERAL:
        styleClass += 'general';
        break;
    }

    if (index === 0 || !this.isSameAttribute(attributes, index)) {
      styleClass += ' margin';
    }

    if (
      !this.isSameAttribute(attributes, index + 1) &&
      !styleClass.includes('bundle')
    ) {
      styleClass += ' last-value-pair';
    }

    return styleClass;
  }
}
