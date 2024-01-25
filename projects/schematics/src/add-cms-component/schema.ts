/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AngularComponentSchema,
  AngularModuleSchema,
  Schema,
} from '../add-spartacus/schema';

export interface CxCmsComponentSchema
  extends Schema,
    AngularComponentSchema,
    AngularModuleSchema {
  /**
   * Where to declare the generated CMS component. If omitted, a new module is generated.
   */
  declareCmsModule: string;
  /**
   * Inject the `CmsComponentData` in the generated component. By default it's `true`.
   */
  cmsComponentData: boolean;
  /**
   * Specify the model for the `CmsComponentData`, e.g. `MyModel`.
   */
  cmsComponentDataModel?: string;
  /**
   * Specify the import path for the `CmsComponentData`.
   * Default is `@spartacus/storefront`
   */
  cmsComponentDataModelPath: string;
}
