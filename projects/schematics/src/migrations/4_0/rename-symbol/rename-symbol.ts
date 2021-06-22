import { Rule, Tree } from '@angular-devkit/schematics';
import {
  ASM_ADAPTER,
  ASM_CONFIG,
  ASM_CONNECTOR,
  ASM_MODULE,
  ASM_SERVICE,
  ASM_UI,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_SEARCH_OPTIONS,
  CUSTOMER_SEARCH_PAGE,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
  QUALTRICS_COMPONENT,
  QUALTRICS_CONFIG,
  QUALTRICS_EVENT_NAME,
  QUALTRICS_MODULE,
  SPARTACUS_ASM,
  SPARTACUS_CORE,
  SPARTACUS_QUALTRICS,
  SPARTACUS_STOREFRONTLIB,
} from '../../../shared/constants';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
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
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
