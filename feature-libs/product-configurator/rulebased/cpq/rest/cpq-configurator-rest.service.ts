import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from './converters/cpq-configurator.converters';
import { CpqConfiguratorEndpointService } from './cpq-configurator-endpoint.service';
import { Cpq } from './cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(
    protected http: HttpClient,
    protected converterService: ConverterService,
    protected endpointService: CpqConfiguratorEndpointService
  ) {}

  /**
   * Creates a new runtime configuration for the given product id
   * and read this default configuration from the CPQ system.
   *
   * @param {string} productSystemId - Product system ID
   * @returns {Observable<Configurator.Configuration>} - Created configuration
   */
  createConfiguration(
    productSystemId: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationInit(productSystemId).pipe(
      switchMap((configCreatedResponse) => {
        return this.callConfigurationDisplay(
          configCreatedResponse.configurationId
        ).pipe(
          this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
          map((resultConfiguration) => {
            return {
              ...resultConfiguration,
              configId: configCreatedResponse.configurationId,
            };
          })
        );
      })
    );
  }

  /**
   * Retrieves a configuration from the CPQ system by its configuration ID and for a certain tab.
   *
   * @param {string} configId - Configuration ID
   * @param {string} tabId - Tab ID
   * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
   */
  readConfiguration(
    configId: string,
    tabId?: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationDisplay(configId, tabId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          configId: configId,
        };
      })
    );
  }

  /**
   * Retrieves an overview for a certain configuration by its configuration ID.
   *
   * @param {string} configId - Configuration ID
   * @returns {Observable<Configurator.Overview>} - Retrieved overview
   */
  readConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.getConfigurationWithAllTabsAndAttributes(configId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          configId: configId,
        };
      })
    );
  }

  /**
   * This method is actually a workaround until CPQ provides and API to fetch
   * all selected attributes / attribute values grouped by all tabs.
   * It will fire a request for each tab to collect all required data.
   */
  protected getConfigurationWithAllTabsAndAttributes(
    configId: string
  ): Observable<Cpq.Configuration> {
    return this.callConfigurationDisplay(configId).pipe(
      switchMap((currentTab) => {
        const tabRequests: Observable<Cpq.Configuration>[] = [];
        if (currentTab.tabs && currentTab.tabs.length > 0) {
          // prepare requests for remaining tabs
          currentTab.tabs.forEach((tab) => {
            if (tab.isSelected) {
              // details of the currently selected tab are already fetched
              tabRequests.push(of(currentTab));
            } else {
              tabRequests.push(
                this.callConfigurationDisplay(configId, tab.id.toString())
              );
            }
          });
        } else {
          // tabs are not defined in model, general tab is used
          tabRequests.push(of(currentTab));
        }
        // fire requests for remaining tabs and wait until all are finished
        return forkJoin(tabRequests);
      }),
      map(this.mergeTabResults)
    );
  }

  protected mergeTabResults(
    tabReqResultList: Cpq.Configuration[]
  ): Cpq.Configuration {
    const config = {
      // first tab will be the current tab. It might not contain all error messages (bug in CPQ). So we just use the last tab.
      // this whole logic will be obsolete, as soon as CPQ provides and API to fetch everything.
      ...tabReqResultList[tabReqResultList.length - 1],
    };
    config.attributes = undefined;
    config.tabs = [];
    tabReqResultList.forEach((tabReqResult) => {
      let tab: Cpq.Tab;
      const currentTab = tabReqResult.tabs?.find((tab) => tab.isSelected);
      if (currentTab && tabReqResult.tabs && tabReqResult.tabs.length > 0) {
        tab = {
          ...currentTab,
        };
      } else {
        tab = {
          id: 0,
        };
      }
      tab.attributes = tabReqResult.attributes;
      config.tabs?.push(tab);
    });
    return config;
  }

  /**
   * Updates an attribute of the runtime configuration for the given configuration id and attribute code
   * and read this default configuration from the CPQ system.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {Observable<Configurator.Configuration>} - Updated configuration
   */
  updateAttribute(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateAttribute: Cpq.UpdateAttribute = this.converterService.convert(
      configuration,
      CPQ_CONFIGURATOR_SERIALIZER
    );
    return this.callUpdateAttribute(updateAttribute).pipe(
      switchMap(() => {
        return this.callConfigurationDisplay(
          configuration.configId,
          updateAttribute.tabId
        ).pipe(
          this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
          map((resultConfiguration) => {
            return {
              ...resultConfiguration,
              configId: configuration.configId,
            };
          })
        );
      })
    );
  }

  /**
   * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
   * and read this default configuration from the CPQ system.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {Observable<Configurator.Configuration>} - Updated configuration
   */
  updateValueQuantity(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateValue: Cpq.UpdateValue = this.converterService.convert(
      configuration,
      CPQ_CONFIGURATOR_QUANTITY_SERIALIZER
    );
    return this.callUpdateValue(updateValue).pipe(
      switchMap(() => {
        return this.callConfigurationDisplay(
          configuration.configId,
          updateValue.tabId
        ).pipe(
          this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
          map((resultConfiguration) => {
            return {
              ...resultConfiguration,
              configId: configuration.configId,
            };
          })
        );
      })
    );
  }

  protected callUpdateValue(updateValue: Cpq.UpdateValue): Observable<any> {
    return this.http.patch<Cpq.ConfigurationCreatedResponseData>(
      this.endpointService.buildUrl('valueUpdate', {
        configId: updateValue.configurationId,
        attributeCode: updateValue.standardAttributeCode,
        valueCode: updateValue.attributeValueId,
      }),
      {
        Quantity: updateValue.quantity,
      },
      this.endpointService.CPQ_MARKER_HEADER
    );
  }

  protected callConfigurationInit(
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      this.endpointService.buildUrl('configurationInit'),
      {
        ProductSystemId: productSystemId,
      },
      this.endpointService.CPQ_MARKER_HEADER
    );
  }

  protected callConfigurationDisplay(
    configId: string,
    tabId?: string
  ): Observable<Cpq.Configuration> {
    return this.http.get<Cpq.Configuration>(
      this.endpointService.buildUrl(
        'configurationDisplay',
        { configId: configId },
        tabId ? [{ name: 'tabId', value: tabId }] : undefined
      ),
      this.endpointService.CPQ_MARKER_HEADER
    );
  }

  protected callUpdateAttribute(
    updateAttribute: Cpq.UpdateAttribute
  ): Observable<any> {
    return this.http.patch<any>(
      this.endpointService.buildUrl('attributeUpdate', {
        configId: updateAttribute.configurationId,
        attributeCode: updateAttribute.standardAttributeCode,
      }),
      updateAttribute.changeAttributeValue,
      this.endpointService.CPQ_MARKER_HEADER
    );
  }
}
