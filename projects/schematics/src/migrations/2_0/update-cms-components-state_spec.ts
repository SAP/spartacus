import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import {
  COMPONENT_STATE_SELECTOR_FACTORY_COMMENT,
  GET_COMPONENT_ENTITIES_COMMENT,
  GET_COMPONENT_STATE_COMMENT,
} from './update-cms-components-state';

// TODO:#6027 - create a mixed class with every use case
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
          .subscribe(console.log);
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
          .subscribe(console.log);
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
          .subscribe(console.log);
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

describe('updateCmsComponentsState', () => {
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
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      '/angular.json',
      JSON.stringify({
        projects: {
          t: {
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
    writeFile('/index.ts', GET_COMPONENT_STATE_TEST_CLASS);

    await runMigration();

    const content = appTree.readContent('/index.ts');
    const regex = new RegExp(GET_COMPONENT_STATE_COMMENT, 'g');
    const commentNumber = (content.match(regex) || []).length;
    expect(commentNumber).toEqual(3);
  });

  it('getComponentEntities', async () => {
    writeFile('/index.ts', GET_COMPONENT_ENTITIES_TEST_CLASS);

    await runMigration();

    const content = appTree.readContent('/index.ts');
    const regex = new RegExp(GET_COMPONENT_ENTITIES_COMMENT, 'g');
    const commentNumber = (content.match(regex) || []).length;
    expect(commentNumber).toEqual(3);
  });

  it('componentStateSelectorFactory', async () => {
    writeFile('/index.ts', COMPONENT_STATE_SELECTOR_FACTORY_TEST_CLASS);

    await runMigration();

    const content = appTree.readContent('/index.ts');
    const regex = new RegExp(COMPONENT_STATE_SELECTOR_FACTORY_COMMENT, 'g');
    const commentNumber = (content.match(regex) || []).length;
    expect(commentNumber).toEqual(3);
  });

  function writeFile(filePath: string, contents: string): void {
    host.sync.write(
      normalize(filePath),
      virtualFs.stringToFileBuffer(contents)
    );
  }

  function runMigration(): Promise<UnitTestTree> {
    return schematicRunner
      .runSchematicAsync('migration-v2-cms-components-state-01', {}, appTree)
      .toPromise();
  }
});
