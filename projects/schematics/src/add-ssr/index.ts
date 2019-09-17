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

function addServerConfigInAngularJsonFile(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('angular.json');

    if(buffer) {
      const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
      const projectArchitectObject = angularJsonFileObject.projects[options.project].architect;
      projectArchitectObject.build.options['outputPath'] = `dist/${options.project}`;
      projectArchitectObject['server'] = {
        "builder": "@angular-devkit/build-angular:server",
        "options": {
          "outputPath": "dist/server",
          "main": "src/main.server.ts",
          "tsConfig": "tsconfig.server.json"
        }
      };

      tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
      context.logger.log('info', `✅️ Modified build scripts in angular.json file.`);
    }
    return tree;
  };
}

function modifyTSConfigServerFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('tsconfig.server.json');

    if(buffer) {
      const newTSConfigServerContent = {
        "extends": "./tsconfig.json",
        "compilerOptions": {
          "outDir": "../out-tsc/app",
          "baseUrl": "./",
          "module": "commonjs",
          "types": []
        },
        "exclude": ["test.ts", "e2e/src/app.e2e-spec.ts", "**/*.spec.ts"],
        "angularCompilerOptions": {
          "entryModule": "src/app/app.server.module#AppServerModule"
        }
      };

      tree.overwrite('tsconfig.server.json', JSON.stringify(newTSConfigServerContent, null, 2));
      context.logger.log('info', `✅️ Modified tsconfig.server.json file.`);
    }
    return tree;
  };
}

function overwriteMainServerTsFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('src/main.server.ts');
    const newFileContent = `export { AppServerModule } from './app/app.server.module';`;

    if(buffer) {
      tree.overwrite('src/main.server.ts', newFileContent);
      context.logger.log('info', `✅️ Modified main.server.ts file.`);
    } else {
      tree.create('src/main.server.ts', newFileContent);
      context.logger.log('info', `✅️ Created main.server.ts file.`);
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
      addServerConfigInAngularJsonFile(options),
      modifyTSConfigServerFile(),
      overwriteMainServerTsFile(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
