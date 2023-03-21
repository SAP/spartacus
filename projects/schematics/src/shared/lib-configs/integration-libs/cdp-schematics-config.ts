

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LibraryOptions, SchematicConfig } from "@spartacus/schematics";
export interface SpartacusCdpOptions extends LibraryOptions {
  baseSite?: string;
  sessionExpiration?: number;
}
  export const CDP_SCHEMATICS_CONFIG: SchematicConfig = {
      library: {
          featureName: "",
          mainScope: "",
          featureScope: undefined,
          b2b: undefined
      },
      folderName: "",
      moduleName: "",
      featureModule: {
        name: "",
        importPath: "",
      },
  };
