"use strict";
/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCpqQuoteFeature = void 0;
var schematicsA = require("@angular-devkit/schematics");
var schematicsB = require("@spartacus/schematics");
var packageJ = require("../../package.json");
function addCpqQuoteFeature(options) {
    return function (tree, context) {
        context.logger.info("Adding discount percentage feature...");
        var packageJson = (0, schematicsB.readPackageJson)(tree);
        (0, schematicsB.validateSpartacusInstallation)(packageJson);
        var features = (0, schematicsB.analyzeCrossFeatureDependencies)(options.features);
        return (0, schematicsA.chain)([
            (0, schematicsB.analyzeApplication)(options, features),
            (0, schematicsB.addFeatures)(options, features),
            (0, schematicsB.addPackageJsonDependenciesForLibrary)(packageJ.peerDependencies, options),
            (0, schematicsB.finalizeInstallation)(options, features),
        ]);
    };
}
exports.addCpqQuoteFeature = addCpqQuoteFeature;
