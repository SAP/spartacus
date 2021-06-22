import { Rule, Tree } from '@angular-devkit/schematics';
import {
  ASM_ADAPTER,
  ASM_AUTH_HTTP_HEADER_SERVICE,
  ASM_AUTH_STORAGE_SERVICE,
  ASM_CONFIG,
  ASM_CONNECTOR,
  ASM_FEATURE,
  ASM_MODULE,
  ASM_SERVICE,
  ASM_STATE,
  ASM_STATE_PERSISTENCE_SERVICE,
  ASM_UI,
  ASM_UI_ACTION,
  ASM_UI_UPDATE,
  ASM_UI_UPDATE_CLASS,
  BUDGET_ROUTING_CONFIG,
  COST_CENTER_ROUTING_CONFIG,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_ACTION,
  CUSTOMER_SEARCH,
  CUSTOMER_SEARCH_CLASS,
  CUSTOMER_SEARCH_DATA,
  CUSTOMER_SEARCH_FAIL,
  CUSTOMER_SEARCH_FAIL_CLASS,
  CUSTOMER_SEARCH_OPTIONS,
  CUSTOMER_SEARCH_PAGE,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
  CUSTOMER_SEARCH_RESET,
  CUSTOMER_SEARCH_RESET_CLASS,
  CUSTOMER_SEARCH_SUCCESS,
  CUSTOMER_SEARCH_SUCCESS_CLASS,
  DEFAULT_BUDGET_ROUTING_CONFIG,
  DEFAULT_COST_CENTER_ROUTING_CONFIG,
  DEFAULT_PERMISSION_ROUTING_CONFIG,
  DEFAULT_UNITS_ROUTING_CONFIG,
  DEFAULT_USER_GROUP_ROUTING_CONFIG,
  DEFAULT_USER_ROUTING_CONFIG,
  LOGOUT_CUSTOMER_SUPPORT_AGENT,
  LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
  PERMISSION_ROUTING_CONFIG,
  QUALTRICS_COMPONENT,
  QUALTRICS_CONFIG,
  QUALTRICS_EVENT_NAME,
  QUALTRICS_MODULE,
  SPARTACUS_ASM,
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  SPARTACUS_QUALTRICS,
  SPARTACUS_STOREFRONTLIB,
  STATE_WITH_ASM,
  SYNCED_ASM_STATE,
  TOKEN_TARGET,
  UNITS_ROUTING_CONFIG,
  USER_GROUP_ROUTING_CONFIG,
  USER_ROUTING_CONFIG,
} from '../../../shared/constants';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  // feature-libs/organization/administration/root/config/default-budget-routing.config.ts
  {
    previousNode: BUDGET_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_BUDGET_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-cost-center-routing.config.ts
  {
    previousNode: COST_CENTER_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_COST_CENTER_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-permission-routing.config.ts
  {
    previousNode: PERMISSION_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_PERMISSION_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-units-routing.config.ts
  {
    previousNode: UNITS_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_UNITS_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-user-group-routing.config.ts
  {
    previousNode: USER_GROUP_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_USER_GROUP_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-user-routing.config.ts
  {
    previousNode: USER_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_USER_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // projects/storefrontlib/src/cms-components/product/config/default-view-config.ts
  {
    previousNode: 'defaultScrollConfig',
    previousImportPath: '@spartacus/storefront',
    newNode: 'defaultViewConfig',
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/config/qualtrics-config.ts
  {
    previousNode: QUALTRICS_CONFIG,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    previousNode: QUALTRICS_EVENT_NAME,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
  {
    previousNode: QUALTRICS_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.module.ts
  {
    previousNode: QUALTRICS_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'QualtricsComponentsModule',
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/asm/asm.module.ts
  {
    previousNode: ASM_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'AsmComponentsModule',
    newImportPath: `${SPARTACUS_ASM}/components`,
  },
  // projects/core/src/asm/config/asm-config.ts
  {
    previousNode: ASM_CONFIG,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/asm.adapter.ts
  {
    previousNode: ASM_ADAPTER,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/asm.connector.ts
  {
    previousNode: ASM_CONNECTOR,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/converters.ts
  {
    previousNode: CUSTOMER_SEARCH_PAGE_NORMALIZER,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/facade/asm.service.ts
  {
    previousNode: ASM_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/facade/csagent-auth.service.ts
  {
    previousNode: CS_AGENT_AUTH_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: CUSTOMER_SEARCH_PAGE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: CUSTOMER_SEARCH_OPTIONS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: ASM_UI,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/services/asm-auth-http-header.service.ts
  {
    previousNode: ASM_AUTH_HTTP_HEADER_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-auth.service.ts
  {
    previousNode: TOKEN_TARGET,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-auth-storage.service.ts
  {
    previousNode: ASM_AUTH_STORAGE_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    previousNode: SYNCED_ASM_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    previousNode: ASM_STATE_PERSISTENCE_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_UPDATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_UPDATE_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_ACTION,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_FAIL,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_FAIL_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_SUCCESS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_SUCCESS_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_RESET,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_RESET_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_ACTION,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    previousNode: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    previousNode: LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: ASM_FEATURE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: CUSTOMER_SEARCH_DATA,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: STATE_WITH_ASM,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: ASM_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
