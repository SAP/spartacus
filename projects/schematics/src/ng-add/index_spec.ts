import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

// tslint:disable:max-line-length
describe('Spartacus Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, './../collection.json'),
  );

  // const defaultOptions: any = {
  // };

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'authtest',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'css',
    skipTests: false,
  };

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
  });

  // it('should create home component files', (done) => {
  //   const files = ['home.component.css', 'home.component.html', 'home.component.spec.ts', 'home.component.ts'];
  //   const homePath = '/projects/authtest/src/app/home/';
  //   schematicRunner.runSchematicAsync('ng-add', defaultOptions, appTree).toPromise().then(tree => {
  //     files.forEach(f => {
  //       const path = `${homePath}${f}`;
  //       expect(tree.exists(path)).toEqual(true);
  //     });
  //     done();
  //   }, done.fail);
  // });
  //
  // it('should set the issuer & clientId in app and oidc modules', (done) => {
  //   schematicRunner.runSchematicAsync('ng-add', defaultOptions, appTree).toPromise().then(tree => {
  //     const appModule = tree.readContent('/projects/authtest/src/app/app.module.ts');
  //     expect(appModule).toMatch(/AuthRoutingModule/);
  //     const authModule = tree.readContent('/projects/authtest/src/app/auth-routing.module.ts');
  //     expect(authModule).toContain(`issuer: '${defaultOptions.issuer}'`);
  //     expect(authModule).toContain(`clientId: '${defaultOptions.clientId}'`);
  //     done();
  //   }, done.fail);
  // });
});
