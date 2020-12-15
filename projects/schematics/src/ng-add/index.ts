import {
  chain,
  externalSchematic,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addPackageJsonDependencies,
  readPackageJson,
  SpartacusOptions,
} from '@spartacus/schematics';
import { ANGULAR_LOCALIZE } from '../shared/constants';
import { getAngularVersion } from '../shared/utils/package-utils';

export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJsonObject = readPackageJson(tree);
    const angularVersion = getAngularVersion(tree);

    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: ANGULAR_LOCALIZE,
      },
    ];
    const enablePWA = options.pwa;
    const enableSSR = options.ssr;
    return chain([
      schematic('add-spartacus', options),
      enablePWA && JSON.parse(options.pwa)
        ? schematic('add-pwa', options)
        : noop(),
      enableSSR && JSON.parse(options.ssr)
        ? schematic('add-ssr', options)
        : noop(),
      addPackageJsonDependencies(dependencies, packageJsonObject),
      invokeAfterInstall(options),
    ])(tree, context);
  };
}

function invokeAfterInstall(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const id = context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    context.addTask(new RunSchematicTask('after-ng-add', options), [id]);
    return tree;
  };
}

export function afterNgAdd(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([externalSchematic(ANGULAR_LOCALIZE, 'ng-add', options)])(
      host,
      context
    );
  };
}
