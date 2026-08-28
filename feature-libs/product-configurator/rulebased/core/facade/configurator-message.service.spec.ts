/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../model/configurator.model';
import {
  ConfiguratorMessageService,
  ConfiguratorMessagesView,
} from './configurator-message.service';

describe('ConfiguratorMessageService', () => {
  let service: ConfiguratorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguratorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('splitMessagesBySeverity', () => {
    it('should return empty arrays if messages are undefined', () => {
      expect(service.splitMessagesBySeverity()).toEqual({
        infoMessages: [],
        errorMessages: [],
        warningMessages: [],
      });
    });

    it('should map severities to the corresponding buckets', () => {
      expect(
        service.splitMessagesBySeverity([
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.WARNING,
          },
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.INFO,
          },
          {
            message: 'Invalid configuration',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ])
      ).toEqual({
        infoMessages: ['Check quantity'],
        warningMessages: ['Too many units'],
        errorMessages: ['Invalid configuration'],
      });
    });

    it('should treat messages without severity as info', () => {
      expect(
        service.splitMessagesBySeverity([{ message: 'Unspecified message' }])
      ).toEqual({
        infoMessages: ['Unspecified message'],
        errorMessages: [],
        warningMessages: [],
      });
    });
  });

  describe('enrichMessagesWithContainerContext', () => {
    it('should prepend container info and required messages', () => {
      expect(
        service.enrichMessagesWithContainerContext(
          {
            infoMessages: ['Info'],
            warningMessages: [],
            errorMessages: ['Error'],
          },
          {
            minRows: 2,
            maxRows: 4,
            rows: [],
            includeContainerInfo: true,
            includeRequiredError: true,
            getContainerRowInfoKey: () => ({
              key: 'configurator.attribute.containerMinMaxRows',
              params: { minRows: 2, maxRows: 4 },
            }),
            getContainerRequiredMessageKey: () => ({
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 2 },
            }),
          }
        )
      ).toEqual({
        infoMessages: ['Info'],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinMaxRows',
            params: { minRows: 2, maxRows: 4 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 2 },
          },
        ],
      });
    });

    it('should preserve existing container context when include flags are false', () => {
      expect(
        service.enrichMessagesWithContainerContext(
          {
            infoMessages: ['Info'],
            warningMessages: [],
            errorMessages: ['Error'],
            containerInfoMessages: [
              {
                key: 'configurator.attribute.containerMinRows',
                params: { count: 2 },
              },
            ],
          },
          {
            minRows: 2,
            rows: [],
            includeContainerInfo: false,
            includeRequiredError: true,
            getContainerRowInfoKey: () => ({
              key: 'configurator.attribute.containerMinMaxRows',
              params: { minRows: 2, maxRows: 4 },
            }),
            getContainerRequiredMessageKey: () => ({
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 1 },
            }),
          }
        )
      ).toEqual({
        infoMessages: ['Info'],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinRows',
            params: { count: 2 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 1 },
          },
        ],
      });
    });
  });

  describe('filterMessagesByProductSelection', () => {
    const view: ConfiguratorMessagesView = {
      infoMessages: ['Info'],
      warningMessages: ['Warning'],
      errorMessages: ['Error'],
      containerInfoMessages: [
        {
          key: 'configurator.attribute.containerMinRows',
          params: { count: 2 },
        },
      ],
      requiredErrorMessages: [
        {
          key: 'configurator.attribute.containerRequiredMessage',
          params: { count: 1 },
        },
      ],
    };

    it('should keep warnings only for selected products', () => {
      expect(service.filterMessagesByProductSelection(view, true)).toEqual({
        infoMessages: [],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [],
        requiredErrorMessages: [],
      });
    });

    it('should keep info and errors only for unselected products', () => {
      expect(service.filterMessagesByProductSelection(view, false)).toEqual({
        infoMessages: ['Info'],
        warningMessages: ['Warning'],
        errorMessages: [],
        containerInfoMessages: [
          {
            key: 'configurator.attribute.containerMinRows',
            params: { count: 2 },
          },
        ],
        requiredErrorMessages: [
          {
            key: 'configurator.attribute.containerRequiredMessage',
            params: { count: 1 },
          },
        ],
      });
    });
  });

  describe('prependContainerContextMessageGroups', () => {
    it('should place container context groups before severity groups', () => {
      const groups = service.prependContainerContextMessageGroups(
        [
          {
            messages: ['Error'],
            messageClass: 'error',
            showIcon: true,
            uiKeyPrefix: 'error-msg',
          },
        ],
        {
          infoMessages: [],
          warningMessages: [],
          errorMessages: ['Error'],
          containerInfoMessages: [
            {
              key: 'configurator.attribute.containerMinRows',
              params: { count: 2 },
            },
          ],
          requiredErrorMessages: [
            {
              key: 'configurator.attribute.containerRequiredMessage',
              params: { count: 1 },
            },
          ],
        },
        {
          containerInfoMessageClass: 'info',
          requiredErrorMessageClass: 'required',
          iconTypeError: ICON_TYPE.ERROR,
          containerInfoUiKeyPrefix: 'container-info-msg',
          requiredErrorUiKeyPrefix: 'required-msg',
        }
      );

      expect(groups.map((group) => group.uiKeyPrefix)).toEqual([
        'container-info-msg',
        'required-msg',
        'error-msg',
      ]);
    });
  });
});
