import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  BAD_REQUEST_HANDLER,
  BAD_VOUCHER_REQUEST_HANDLER,
  CONFIGURATOR_EVENT_LISTENER,
  HANDLE_VOUCHER_OPERATION_ERROR,
} from '../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../shared/libs-constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // feature-libs/product-configurator/rulebased/core/event/rulebased-configurator-event.listener.ts
  {
    node: CONFIGURATOR_EVENT_LISTENER,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    comment: `'${CONFIGURATOR_EVENT_LISTENER} has been removed and is no longer part of the public API. Please use 'ConfiguratorRouterListener' instead`,
  },
  // projects/core/src/global-message/http-interceptors/handlers/bad-request/bad-request.handler.ts
  {
    node: BAD_REQUEST_HANDLER,
    importPath: SPARTACUS_CORE,
    comment: `'${HANDLE_VOUCHER_OPERATION_ERROR} has been removed and is no longer part of the public API. Please use new methods in ${BAD_VOUCHER_REQUEST_HANDLER}`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
