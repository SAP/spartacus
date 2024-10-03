/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR,
  LOAD_ANONYMOUS_CONSENTS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR,
      importPath: SPARTACUS_CORE,
      deprecatedNode: LOAD_ANONYMOUS_CONSENTS,
      newNode: LOAD_ANONYMOUS_CONSENTS,
      comment: `// ${TODO_SPARTACUS} Method ${LOAD_ANONYMOUS_CONSENTS} changed the return type from 'Observable<AnonymousConsent[] | null>' to 'Observable<AnonymousConsent[]>'`,
    },
  ];
