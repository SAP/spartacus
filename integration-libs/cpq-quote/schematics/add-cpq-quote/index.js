"use strict";
/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCpqQuoteFeature = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var schematics_2 = require("@spartacus/schematics");
var package_json_1 = require("../../package.json");
function addCpqQuoteFeature(options) {
    return function (tree, context) {
        context.logger.info("Adding discount percentage feature...");
        var packageJson = (0, schematics_2.readPackageJson)(tree);
        (0, schematics_2.validateSpartacusInstallation)(packageJson);
        var features = (0, schematics_2.analyzeCrossFeatureDependencies)(options.features);
        return (0, schematics_1.chain)([
            (0, schematics_2.analyzeApplication)(options, features),
            (0, schematics_2.addFeatures)(options, features),
            (0, schematics_2.addPackageJsonDependenciesForLibrary)(package_json_1.peerDependencies, options),
            (0, schematics_2.finalizeInstallation)(options, features),
        ]);
        return (0, schematics_1.chain)([]);
    };
}
exports.addCpqQuoteFeature = addCpqQuoteFeature;
//# sourceMappingURL=index.js.map