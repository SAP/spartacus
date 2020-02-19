import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import {
  CMS_GET_COMPONENT_FROM_PAGE,
  COMPONENTS_SELECTOR_FACTORY_NEW_API,
  COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API,
  COMPONENT_SELECTOR_FACTORY_OLD_API,
  COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
  GET_COMPONENTS_STATE_NEW_API,
  GET_COMPONENT_ENTITIES_COMMENT,
  GET_COMPONENT_STATE_OLD_API,
  LOAD_CMS_COMPONENT_CLASS,
  LOAD_CMS_COMPONENT_FAIL_CLASS,
  LOAD_CMS_COMPONENT_SUCCESS_CLASS,
} from '../../shared/constants';
import { runMigration, writeFile } from '../../shared/utils/test-utils';
import {
  buildActionComment,
  buildMethodComment,
} from './update-cms-component-state';

const MIGRATION_SCRIPT_NAME = 'migration-v2-update-cms-component-state-02';
const GET_COMPONENT_STATE_TEST_CLASS = `  
    import { MemoizedSelector, select, Store } from '@ngrx/store';
    import {
      CmsSelectors,
      ComponentState,
      EntityLoaderState,
      StateWithCms
    } from '@spartacus/core';
    import { Observable } from 'rxjs';

    export class TestClass {
      constructor(private store: Store<StateWithCms>) {}

      getComponentState1(): void {
        this.store
          .pipe(select(CmsSelectors.getComponentState))
          .subscribe();
      }

      getComponentState2(): Observable<EntityLoaderState<any>> {
        return this.store.pipe(select(CmsSelectors.getComponentState));
      }

      getComponentState3(): MemoizedSelector<StateWithCms, ComponentState> {
        return CmsSelectors.getComponentState;
      }
    }`;
const GET_COMPONENT_ENTITIES_TEST_CLASS = `
    import { MemoizedSelector, select, Store } from '@ngrx/store';
    import { CmsSelectors, StateWithCms } from '@spartacus/core';
    import { Observable } from 'rxjs';

    export class TestClass {
      constructor(private store: Store<StateWithCms>) {}

      getComponentEntities1(): void {
        this.store
          .pipe(select(CmsSelectors.getComponentEntities))
          .subscribe();
      }

      getComponentEntities2(): Observable<{ [id: string]: any }> {
        return this.store.pipe(select(CmsSelectors.getComponentEntities));
      }

      getComponentEntities3(): MemoizedSelector<
        StateWithCms,
        { [id: string]: any }
      > {
        return CmsSelectors.getComponentEntities;
      }
    }
`;
const COMPONENT_STATE_SELECTOR_FACTORY_TEST_CLASS = `
    import { MemoizedSelector, select, Store } from '@ngrx/store';
    import { CmsSelectors, LoaderState, StateWithCms } from '@spartacus/core';
    import { Observable } from 'rxjs';

    export class TestClass {
      constructor(private store: Store<StateWithCms>) {}

      componentStateSelectorFactory1(): void {
        this.store
          .pipe(select(CmsSelectors.componentStateSelectorFactory('sample-uid')))
          .subscribe();
      }

      componentStateSelectorFactory2(): Observable<LoaderState<any>> {
        return this.store.pipe(
          select(CmsSelectors.componentStateSelectorFactory('sample-uid'))
        );
      }

      componentStateSelectorFactory3(): MemoizedSelector<
        StateWithCms,
        LoaderState<any>
      > {
        return CmsSelectors.componentStateSelectorFactory('sample-uid');
      }
    }
`;
const COMPONENT_SELECTOR_FACTORY_TEST_CLASS = `
    import { MemoizedSelector, select, Store } from '@ngrx/store';
    import { CmsComponent, CmsSelectors, StateWithCms } from '@spartacus/core';
    import { Observable } from 'rxjs';

    export class TestClass {
      constructor(private store: Store<StateWithCms>) {}

      componentSelectorFactory1(): void {
        this.store
          .pipe(select(CmsSelectors.componentSelectorFactory('sample-uid')))
          .subscribe();
      }

      componentSelectorFactory2(): Observable<CmsComponent> {
        return this.store.pipe(
          select(CmsSelectors.componentSelectorFactory('sample-uid'))
        );
      }

      componentSelectorFactory3(): MemoizedSelector<StateWithCms, CmsComponent> {
        return CmsSelectors.componentSelectorFactory('sample-uid');
      }
    }
`;
const ACTION_CONST_TEST_CLASS = `
    import { CmsActions } from '@spartacus/core';
    export class TestClass {
      constructor() {
        console.log(CmsActions.CMS_GET_COMPONENET_FROM_PAGE);
      }
    }
`;
const ACTION_CONST_TEST_NO_SPARTACUS_IMPORT_CLASS = `
    export class TestClass {
      constructor() {
        console.log(CmsActions.CMS_GET_COMPONENET_FROM_PAGE);
      }
    }
`;
const CMS_COMPONENT_ACTIONS_TEST_CLASS = `
    import { CmsActions } from '@spartacus/core';
    export class Test {
      loadCmsComponent(): void {
        console.log(new CmsActions.LoadCmsComponent('xxx'));
      }
      loadCmsComponentFail(): void {
        console.log(new CmsActions.LoadCmsComponentFail('xxx', 'xxx'));
      }
      loadCmsComponentSuccess(): void {
        console.log(new CmsActions.LoadCmsComponentSuccess({}, 'xxx'));
      }
      cmsGetComponentFromPage(): void {
        console.log(new CmsActions.CmsGetComponentFromPage([]));
      }
    }
`;
const ALL_TEST_CASES_CLASS = `
    import { MemoizedSelector, select, Store } from '@ngrx/store';
    import {
      CmsComponent,
      CmsSelectors,
      ComponentState,
      EntityLoaderState,
      LoaderState,
      StateWithCms,
      CmsActions,
      PageContext,
      StateEntityLoaderActions
    } from '@spartacus/core';
    import { Observable } from 'rxjs';

    export class TestClass {
      constructor(private store: Store<StateWithCms>) {
        console.log(CmsActions.CMS_GET_COMPONENET_FROM_PAGE);
      }

      getComponentState1(): void {
        this.store.pipe(select(CmsSelectors.getComponentState)).subscribe();
      }
      getComponentState2(): Observable<EntityLoaderState<any>> {
        return this.store.pipe(select(CmsSelectors.getComponentState));
      }
      getComponentState3(): MemoizedSelector<StateWithCms, ComponentState> {
        return CmsSelectors.getComponentState;
      }
      getComponentEntities1(): void {
        this.store.pipe(select(CmsSelectors.getComponentEntities)).subscribe();
      }
      getComponentEntities2(): Observable<{ [id: string]: any }> {
        return this.store.pipe(select(CmsSelectors.getComponentEntities));
      }
      getComponentEntities3(): MemoizedSelector<
        StateWithCms,
        { [id: string]: any }
      > {
        return CmsSelectors.getComponentEntities;
      }
      componentStateSelectorFactory1(): void {
        this.store
          .pipe(select(CmsSelectors.componentStateSelectorFactory('sample-uid')))
          .subscribe();
      }
      componentStateSelectorFactory2(): Observable<LoaderState<any>> {
        return this.store.pipe(
          select(CmsSelectors.componentStateSelectorFactory('sample-uid'))
        );
      }
      componentStateSelectorFactory3(): MemoizedSelector<
        StateWithCms,
        LoaderState<any>
      > {
        return CmsSelectors.componentStateSelectorFactory('sample-uid');
      }
      componentSelectorFactory1(): void {
        this.store
          .pipe(select(CmsSelectors.componentSelectorFactory('sample-uid')))
          .subscribe();
      }
      componentSelectorFactory2(): Observable<CmsComponent> {
        return this.store.pipe(
          select(CmsSelectors.componentSelectorFactory('sample-uid'))
        );
      }
      componentSelectorFactory3(): MemoizedSelector<StateWithCms, CmsComponent> {
        return CmsSelectors.componentSelectorFactory('sample-uid');
      }
      loadCmsComponent(): void {
        console.log(new CmsActions.LoadCmsComponent('xxx'));
      }
      loadCmsComponentFail(): void {
        console.log(new CmsActions.LoadCmsComponentFail('xxx', 'xxx'));
      }
      loadCmsComponentSuccess(): void {
        console.log(new CmsActions.LoadCmsComponentSuccess({}, 'xxx'));
      }
      cmsGetComponentFromPage(): void {
        console.log(new CmsActions.CmsGetComponentFromPage([]));
      }
    }
`;

describe('updateCmsComponentState migration', () => {
  let host = new TempScopedNodeJsSyncHost();
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      host,
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      host,
      '/angular.json',
      JSON.stringify({
        projects: {
          sourceRoot: 'src',
          test: {
            architect: { build: { options: { tsConfig: './tsconfig.json' } } },
          },
        },
      })
    );

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  it('getComponentState', async () => {
    writeFile(host, '/src/index.ts', GET_COMPONENT_STATE_TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    const regex = new RegExp(
      buildMethodComment(
        GET_COMPONENT_STATE_OLD_API,
        GET_COMPONENTS_STATE_NEW_API
      ),
      'g'
    );
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(3);
  });

  it('getComponentEntities', async () => {
    writeFile(host, '/src/index.ts', GET_COMPONENT_ENTITIES_TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    const regex = new RegExp(GET_COMPONENT_ENTITIES_COMMENT, 'g');
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(3);
  });

  it('componentStateSelectorFactory', async () => {
    writeFile(
      host,
      '/src/index.ts',
      COMPONENT_STATE_SELECTOR_FACTORY_TEST_CLASS
    );

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    const regex = new RegExp(
      buildMethodComment(
        COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
        COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API
      ),
      'g'
    );
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(3);
  });

  it('componentSelectorFactory', async () => {
    writeFile(host, '/src/index.ts', COMPONENT_SELECTOR_FACTORY_TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    const regex = new RegExp(
      buildMethodComment(
        COMPONENT_SELECTOR_FACTORY_OLD_API,
        COMPONENTS_SELECTOR_FACTORY_NEW_API
      ),
      'g'
    );
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(3);
  });

  it(`should rename 'CMS_GET_COMPONENET_FROM_PAGE' to 'CMS_GET_COMPONENT_FROM_PAGE'`, async () => {
    writeFile(host, '/src/index.ts', ACTION_CONST_TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');

    const regexOld = new RegExp('CMS_GET_COMPONENET_FROM_PAGE', 'g');
    const oldOccurrences = (content.match(regexOld) || []).length;
    expect(oldOccurrences).toEqual(0);

    const regexNew = new RegExp('CMS_GET_COMPONENT_FROM_PAGE', 'g');
    const newOccurrences = (content.match(regexNew) || []).length;
    expect(newOccurrences).toEqual(1);
  });

  it('should NOT do the update if there is no Spartacus import present', async () => {
    writeFile(
      host,
      '/src/index.ts',
      ACTION_CONST_TEST_NO_SPARTACUS_IMPORT_CLASS
    );

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');

    const regexOld = new RegExp('CMS_GET_COMPONENET_FROM_PAGE', 'g');
    const oldOccurrences = (content.match(regexOld) || []).length;
    expect(oldOccurrences).toEqual(1);

    const regexNew = new RegExp('CMS_GET_COMPONENT_FROM_PAGE', 'g');
    const newOccurrences = (content.match(regexNew) || []).length;
    expect(newOccurrences).toEqual(0);
  });

  it('should add comments for CMS component actions', async () => {
    writeFile(host, '/src/index.ts', CMS_COMPONENT_ACTIONS_TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');

    const loadCmsComponentRegex = new RegExp(
      `^${buildActionComment(LOAD_CMS_COMPONENT_CLASS)}$`,
      'gm'
    );
    const loadCmsComponentOccurrences = (
      content.match(loadCmsComponentRegex) || []
    ).length;
    expect(loadCmsComponentOccurrences).toEqual(1);

    const loadCmsComponentFailRegex = new RegExp(
      buildActionComment(LOAD_CMS_COMPONENT_FAIL_CLASS),
      'g'
    );
    const loadCmsComponentFailOccurrences = (
      content.match(loadCmsComponentFailRegex) || []
    ).length;
    expect(loadCmsComponentFailOccurrences).toEqual(1);

    const loadCmsComponentSuccessRegex = new RegExp(
      buildActionComment(LOAD_CMS_COMPONENT_SUCCESS_CLASS),
      'g'
    );
    const loadCmsComponentSuccessOccurrences = (
      content.match(loadCmsComponentSuccessRegex) || []
    ).length;
    expect(loadCmsComponentSuccessOccurrences).toEqual(1);

    const cmsGetComponentFromPageRegex = new RegExp(
      buildActionComment(CMS_GET_COMPONENT_FROM_PAGE),
      'g'
    );
    const cmsGetComponentFromPageRegexOccurrences = (
      content.match(cmsGetComponentFromPageRegex) || []
    ).length;
    expect(cmsGetComponentFromPageRegexOccurrences).toEqual(1);
  });

  it('all test cases in one file', async () => {
    writeFile(host, '/src/index.ts', ALL_TEST_CASES_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');

    const getComponentStateRegex = new RegExp(
      buildMethodComment(
        GET_COMPONENT_STATE_OLD_API,
        GET_COMPONENTS_STATE_NEW_API
      ),
      'g'
    );
    const getComponentEntitiesRegex = new RegExp(
      GET_COMPONENT_ENTITIES_COMMENT,
      'g'
    );
    const componentStateSelectorFactoryRegex = new RegExp(
      buildMethodComment(
        COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
        COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API
      ),
      'g'
    );
    const componentSelectorFactoryRegex = new RegExp(
      buildMethodComment(
        COMPONENT_SELECTOR_FACTORY_OLD_API,
        COMPONENTS_SELECTOR_FACTORY_NEW_API
      ),
      'g'
    );
    const getComponentStateOccurrences = (
      content.match(getComponentStateRegex) || []
    ).length;
    expect(getComponentStateOccurrences).toEqual(3);
    const getComponentEntitiesOccurrences = (
      content.match(getComponentEntitiesRegex) || []
    ).length;
    expect(getComponentEntitiesOccurrences).toEqual(3);
    const componentStateSelectorFactoryOccurrences = (
      content.match(componentStateSelectorFactoryRegex) || []
    ).length;
    expect(componentStateSelectorFactoryOccurrences).toEqual(3);
    const componentSelectorFactoryOccurrences = (
      content.match(componentSelectorFactoryRegex) || []
    ).length;
    expect(componentSelectorFactoryOccurrences).toEqual(3);
    const regexCmsActionConstOld = new RegExp(
      'CMS_GET_COMPONENET_FROM_PAGE',
      'g'
    );

    const cmsActionConstOccurrencesOld = (
      content.match(regexCmsActionConstOld) || []
    ).length;
    expect(cmsActionConstOccurrencesOld).toEqual(0);
    const regexCmsActionConstNew = new RegExp(
      'CMS_GET_COMPONENT_FROM_PAGE',
      'g'
    );
    const cmsActionConstOccurrencesNew = (
      content.match(regexCmsActionConstNew) || []
    ).length;
    expect(cmsActionConstOccurrencesNew).toEqual(1);

    const loadCmsComponentRegex = new RegExp(
      `^${buildActionComment(LOAD_CMS_COMPONENT_CLASS)}$`,
      'gm'
    );
    const loadCmsComponentOccurrences = (
      content.match(loadCmsComponentRegex) || []
    ).length;
    expect(loadCmsComponentOccurrences).toEqual(1);

    const loadCmsComponentFailRegex = new RegExp(
      buildActionComment(LOAD_CMS_COMPONENT_FAIL_CLASS),
      'g'
    );
    const loadCmsComponentFailOccurrences = (
      content.match(loadCmsComponentFailRegex) || []
    ).length;
    expect(loadCmsComponentFailOccurrences).toEqual(1);

    const loadCmsComponentSuccessRegex = new RegExp(
      buildActionComment(LOAD_CMS_COMPONENT_SUCCESS_CLASS),
      'g'
    );
    const loadCmsComponentSuccessOccurrences = (
      content.match(loadCmsComponentSuccessRegex) || []
    ).length;
    expect(loadCmsComponentSuccessOccurrences).toEqual(1);

    const cmsGetComponentFromPageRegex = new RegExp(
      buildActionComment(CMS_GET_COMPONENT_FROM_PAGE),
      'g'
    );
    const cmsGetComponentFromPageRegexOccurrences = (
      content.match(cmsGetComponentFromPageRegex) || []
    ).length;
    expect(cmsGetComponentFromPageRegexOccurrences).toEqual(1);
  });
});
