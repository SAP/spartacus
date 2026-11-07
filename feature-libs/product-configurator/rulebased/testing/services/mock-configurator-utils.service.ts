/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../configurator-test-utils';

const defaultConfiguration = ConfiguratorTestUtils.createConfiguration('test');

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorUtilsService {
  getParentGroup(): Configurator.Group | undefined {
    return undefined;
  }
  getGroupById(groups: Configurator.Group[], groupId: string): Configurator.Group {
    return (
      groups.find((group) => group.id === groupId) ??
      ({ id: groupId } as Configurator.Group)
    );
  }
  getOptionalGroupById(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group | undefined {
    return groups.find((group) => group.id === groupId);
  }
  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }
  isConfigurationCreated(configuration?: Configurator.Configuration): boolean {
    return !!configuration?.configId;
  }
  createConfigurationExtract(): Configurator.Configuration {
    return defaultConfiguration;
  }
  findContainerRowGroupByRowId(): Configurator.Group | undefined {
    return undefined;
  }
  buildGroupPath(): Configurator.Group[] {
    return [];
  }
  getConfigurationFromState(): Configurator.Configuration {
    return defaultConfiguration;
  }
}
