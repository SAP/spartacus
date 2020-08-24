import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { runMigration } from '../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-styles-version-10';

describe('stylesVersion migration', () => {
  let appTree: UnitTestTree;
  let appSchematicRunner: SchematicTestRunner;
  const workspaceOptions: any = {
    name: 'workspace',
    version: '9.0.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',

    project: 'schematics-test',
  };

  beforeEach(async () => {
    appSchematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../migrations.json')
    );

    appTree = await appSchematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await appSchematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
  });

  it('should apply stylesVersion variable', async () => {
    appTree.overwrite('src/styles.scss', "@import '~@spartacus/styles/index'");
    await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);
    const stylesContent = appTree.readContent('src/styles.scss').toString();
    expect(stylesContent).toContain('$styleVersion: 2.');
  });
});
