/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
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

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('splitMessagesBySeverity', () => {
    it('returns empty buckets when messages are undefined', () => {
      expect(service.splitMessagesBySeverity()).toEqual({
        infoMessages: [],
        errorMessages: [],
        warningMessages: [],
      });
    });

    it('maps ERROR, WARNING and INFO to separate buckets', () => {
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

    it('treats missing severity as info', () => {
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
    it('adds container info and required messages when include flags are true', () => {
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

    it('skips container info when includeContainerInfo is false', () => {
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

    it('keeps engine errors only and clears info, warning and container context for selected products', () => {
      expect(service.filterMessagesByProductSelection(view, true)).toEqual({
        infoMessages: [],
        warningMessages: [],
        errorMessages: ['Error'],
        containerInfoMessages: [],
        requiredErrorMessages: [],
      });
    });

    it('keeps info, warning and container context and clears engine errors for unselected products', () => {
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
    it('places container info and required groups before severity groups', () => {
      const groups = service.prependContainerContextMessageGroups(
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
