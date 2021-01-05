import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { forkJoin, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT } from '../root/interceptor/cpq-configurator-rest.interceptor';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from './cpq-configurator.converters';
import { Cpq } from './cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(
    protected http: HttpClient,
    protected converterService: ConverterService
  ) {}

  /**
   * Will create a new runtime configuration for the given product id
   * and read this default configuration from the CPQ system.
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

  readConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.callConfigurationDisplay(configId).pipe(
      switchMap((currentTab) => {
        const tabRequests: Observable<Cpq.Configuration>[] = [];
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

        return forkJoin(tabRequests);
      }),
      map((tabReqResultList) => {
        const overviewConfiguration = {
          ...tabReqResultList[0],
        };
        overviewConfiguration.attributes = [];
        overviewConfiguration.tabs = [];

        tabReqResultList.forEach((tabReqResult) => {
          const currentTab = tabReqResult.tabs.find((tab) => tab.isSelected);
          currentTab.attributes = tabReqResult.attributes;
          overviewConfiguration.tabs.push(currentTab);
        });
        return overviewConfiguration;
      }),
      tap((resultConfiguration) => console.info(resultConfiguration)),
      //(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          configId: configId,
        };
      })
    );
  }

  /**
   * Will update an attribute of the runtime configuration for the given configuration id and attribute code
   * and read this default configuration from the CPQ system.
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
        return this.callConfigurationDisplay(configuration.configId).pipe(
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
   * Will update an attribute of the runtime configuration for the given configuration id and attribute code
   * and read this default configuration from the CPQ system.
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
        return this.callConfigurationDisplay(configuration.configId).pipe(
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

  callUpdateValue(updateValue: Cpq.UpdateValue): Observable<any> {
    return this.http.patch<Cpq.ConfigurationCreatedResponseData>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${updateValue.configurationId}/attributes/${updateValue.standardAttributeCode}/attributeValues/${updateValue.attributeValueId}`,
      {
        Quantity: updateValue.quantity,
      }
    );
  }

  protected callConfigurationInit(
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations`,
      {
        ProductSystemId: productSystemId,
      }
    );
  }

  protected callConfigurationDisplay(
    configId: string,
    tabId?: string
  ): Observable<Cpq.Configuration> {
    let url = `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${configId}/display`;
    if (tabId) {
      url += `?tabId=${tabId}`;
    }
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callUpdateAttribute(
    updateAttribute: Cpq.UpdateAttribute
  ): Observable<any> {
    return this.http.patch<any>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${updateAttribute.configurationId}/attributes/${updateAttribute.standardAttributeCode}`,
      updateAttribute.changeAttributeValue
    );
  }
}
