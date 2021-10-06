import {
  FIND_COMPONENTS_BY_IDS_LEGACY,
  OCC_CMS_COMPONENT_ADAPTER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/occ/adapters/cms/occ-cms-component.adapter.ts
export const OCC_CMS_COMPONENT_ADAPTER_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: OCC_CMS_COMPONENT_ADAPTER,
      importPath: SPARTACUS_CORE,
      deprecatedNode: 'findComponentsByIdsLegacy',
      comment: `// ${TODO_SPARTACUS} Method '${FIND_COMPONENTS_BY_IDS_LEGACY}' was removed from '${OCC_CMS_COMPONENT_ADAPTER}'. This method was used to adapt legacy versions of the OCC CMS component API, where a POST was required. We've moved the legacy implementation to an optional 'LegacyOccCmsComponentAdapter'.`,
    },
  ];
