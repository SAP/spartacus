"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPickupInStoreFeatures = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@spartacus/schematics");
const package_json_1 = require("../../package.json");
function addPickupInStoreFeatures(options) {
    return (tree, _context) => {
        const packageJson = (0, schematics_2.readPackageJson)(tree);
        (0, schematics_2.validateSpartacusInstallation)(packageJson);
        const features = (0, schematics_2.analyzeCrossFeatureDependencies)(options.features);
        return (0, schematics_1.chain)([
            (0, schematics_2.analyzeApplication)(options, features),
            (0, schematics_2.addFeatures)(options, features),
            (0, schematics_2.addPackageJsonDependenciesForLibrary)(package_json_1.peerDependencies, options),
            (0, schematics_2.finalizeInstallation)(options, features),
        ]);
    };
}
exports.addPickupInStoreFeatures = addPickupInStoreFeatures;
//# sourceMappingURL=index.js.map