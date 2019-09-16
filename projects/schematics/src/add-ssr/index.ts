import {
  chain, externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {Schema as SpartacusOptions} from "../add-spartacus/schema";
import {addPackageJsonDependency, NodeDependency, NodeDependencyType} from "@schematics/angular/utility/dependencies";
import {NodePackageInstallTask} from "@angular-devkit/schematics/tasks";


function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '~8.0.0',
        name: '@angular/platform-server',
      },
      {
        type: NodeDependencyType.Default,
        version: '^7.1.1',
        name: '@nguniversal/express-engine',
      },
      {
        type: NodeDependencyType.Dev,
        version: '^5.3.2',
        name: 'ts-loader',
      },
      {
        type: NodeDependencyType.Dev,
        version: '^3.3.2',
        name: 'webpack-cli',
      }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);
      context.logger.log(
        'info',
        `✅️ Added '${dependency.name}' into ${dependency.type}`
      );
    });

    return tree;
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}

function addPackageJsonScripts(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('package.json');

    if(buffer) {
      const packageJsonFileObject = JSON.parse(buffer.toString('utf-8'));

      packageJsonFileObject.scripts['build:ssr'] = 'npm run build:client-and-server-bundles && npm run webpack:server';
      packageJsonFileObject.scripts['serve:ssr'] = 'node dist/server.js';
      packageJsonFileObject.scripts['build:client-and-server-bundles'] = 'ng build --prod && ng run storefrontapp:server';
      packageJsonFileObject.scripts['webpack:server'] = 'webpack --config webpack.server.config.js --progress --colors';

      tree.overwrite('package.json', JSON.stringify(packageJsonFileObject, null, 2));
      context.logger.log('info', `✅️ Added build scripts to package.json file.`);
    }
    return tree;
  };
}

export function addSSR(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(),
      externalSchematic('@nguniversal/express-engine', 'ng-add', {
        clientProject: options.project,
      }),
      addPackageJsonScripts(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
