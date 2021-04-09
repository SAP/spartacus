import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  InsertChange,
  NoopChange,
  RemoveChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import ts from 'typescript';
import { COMPONENT_DEPRECATION_DATA } from '../../migrations/test/component-deprecations/component-deprecations';
import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENTS,
  ANY_TYPE,
  AUTH_SERVICE,
  FEATURE_CONFIG_SERVICE,
  NGRX_STORE,
  PLATFORM,
  PLATFORM_ID_STRING,
  SPARTACUS_CORE,
  STORE,
  TODO_SPARTACUS,
  USER_ADDRESS_SERVICE,
  UTF_8,
} from '../constants';
import {
  addConstructorParam,
  buildSpartacusComment,
  ClassType,
  commitChanges,
  defineProperty,
  findConstructor,
  getAllTsSourceFiles,
  getHtmlFiles,
  getIndexHtmlPath,
  getLineFromTSFile,
  getPathResultsForFile,
  getTsSourceFile,
  injectService,
  insertCommentAboveConfigProperty,
  insertCommentAboveIdentifier,
  insertComponentSelectorComment,
  InsertDirection,
  insertHtmlComment,
  isCandidateForConstructorDeprecation,
  isInheriting,
  removeConstructorParam,
  removeInjectImports,
  renameIdentifierNode,
  shouldRemoveDecorator,
} from './file-utils';
import { getSourceRoot } from './workspace-utils';

const PARAMETER_LENGTH_MISS_MATCH_TEST_CLASS = `
    import { ActionsSubject, Store } from '@ngrx/store';
    import {
      AuthService,
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>,
        private actions: ActionsSubject
      ) {
        super(store);
        console.log(this.actions);
      }
    }
`;
const INHERITANCE_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithProcess, StateWithUser } from '@spartacus/core';
    export class InheritingService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const INHERITANCE_IMPORT_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithProcess, StateWithUser } from '@spartacus/core';
    import { UserAddressService } from './customer-class';
    export class InheritedService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
        super(store);
      }
    }
`;
const IMPORT_MISSING_TEST_CLASS = `
    import { StateWithProcess, StateWithUser, UserAddressService } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const NO_CONSTRUCTOR_TEST_CLASS = `
    import { UserAddressService } from '@spartacus/core';
    import { Store } from '@ngrx/store';
    export class InheritingService extends UserAddressService {}
`;
const WRONG_PARAMETER_ORDER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      AuthService,
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        authService: AuthService,
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        super(authService, store);
      }
    }
`;
const NO_SUPER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {}
    }
`;
const EXPRESSION_NO_SUPER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        console.log('test');
      }
    }
`;
const SUPER_PARAMETER_NUMBER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        super();
      }
    }
`;
const VALID_ADD_CONSTRUCTOR_PARAM_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritedService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
        super(store);
      }
    }
`;
const VALID_ADD_CONSTRUCTOR_PARAM_WITH_ADDITIONAL_INJECTED_SERVICE_CLASS = `
    import { ActionsSubject, Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritedService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>,
        private actions: ActionsSubject
      ) {
        super(store);
        console.log(this.actions);
      }
    }
`;
const VALID_REMOVE_CONSTRUCTOR_PARAM_CLASS = `
    import { Dummy } from '@angular/core';
    import {
      CmsService,
      FeatureConfigService,
      PageMetaResolver,
      PageMetaService
    } from '@spartacus/core';
    export class Test extends PageMetaService {
      constructor(
        resolvers: PageMetaResolver[],
        cms: CmsService,
        featureConfigService?: FeatureConfigService
      ) {
        super(resolvers, cms, featureConfigService);
      }
    }
`;
const CONFIG_DEPRECATION_TEST = `
const config = {
  features: {
    level: '1.5',
    anonymousConsents: true
  }
};

@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '1.5',
        anonymousConsents: true
      }
    }),
  ],
  providers: [
    provideConfig(config),
    provideConfig({
      features: {
        level: '1.5',
        anonymousConsents: true
      }
    }),
  ]
})
export class AppModule {}
`;
const INHERITANCE_VALID_TEST_CLASS = `
export class Test extends UserAddressService {}
`;
const HTML_EXAMPLE = `<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;
const HTML_EXAMPLE_EXPECTED = `<!-- ${TODO_SPARTACUS} 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<!-- ${TODO_SPARTACUS} 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;
const HTML_EXAMPLE_NGIF = `<div *ngIf="isThumbsEmpty">test</div>`;
const HTML_EXAMPLE_NGIF_EXPECTED = `<!-- ${TODO_SPARTACUS} 'isThumbsEmpty' property has been removed. -->
<div *ngIf="isThumbsEmpty">test</div>`;

const SINGLE_DECORATOR_CONSTRUCTOR = `
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LaunchDialogService,
  LayoutConfig,
} from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ServiceNameService extends LaunchDialogService {
  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    protected layoutConfig: LayoutConfig
  ) {
    super(platform, layoutConfig);
  }
}`;

const MULTIPLE_DECORATOR_CONSTRUCTOR = `
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LaunchDialogService,
  LaunchRenderStrategy,
  LayoutConfig,
} from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ServiceNameService extends LaunchDialogService {
  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    @Inject(LaunchRenderStrategy)
    launchRenderStrategy: LaunchRenderStrategy[],
    protected layoutConfig: LayoutConfig
  ) {
    super(platform, launchRenderStrategy, layoutConfig);
  }
}`;

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('File utils', () => {
  let appTree: UnitTestTree;
  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };
  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };
  const defaultOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe('getTsSourceFile', () => {
    it('should return TS file', async () => {
      const tsFile = getTsSourceFile(appTree, 'src/test.ts');
      const tsFileName = tsFile.fileName.split('/').pop();

      expect(tsFile).toBeTruthy();
      expect(tsFileName).toEqual('test.ts');
    });
  });

  describe('getAllTsSourceFiles', () => {
    it('should return all .ts files', () => {
      const project = getSourceRoot(appTree, {});
      const sourceFiles = getAllTsSourceFiles(appTree, project);
      expect(sourceFiles.length !== 0).toEqual(true);
    });
  });

  describe('getIndexHtmlPath', () => {
    it('should return index.html path', async () => {
      const projectIndexHtmlPath = getIndexHtmlPath(appTree);
      expect(projectIndexHtmlPath).toEqual(`src/index.html`);
    });
  });

  describe('getPathResultsForFile', () => {
    it('should return proper path for file', async () => {
      const pathsToFiles = getPathResultsForFile(appTree, 'test.ts', 'src');

      expect(pathsToFiles.length).toBeGreaterThan(0);
      expect(pathsToFiles[0]).toEqual('/src/test.ts');
    });
  });

  describe('getAllHtmlFiles', () => {
    it('should return proper path for file', async () => {
      let pathsToFiles = getHtmlFiles(appTree, undefined, 'src');
      expect(pathsToFiles).toBeTruthy();

      pathsToFiles = pathsToFiles || [];
      expect(pathsToFiles.length).toEqual(2);
      expect(pathsToFiles[0]).toEqual('/src/index.html');
      expect(pathsToFiles[1]).toEqual('/src/app/app.component.html');
    });
  });

  describe('insertComponentSelectorComment', () => {
    it('should insert the comment', async () => {
      const componentDeprecation = COMPONENT_DEPRECATION_DATA[0];
      const result = insertComponentSelectorComment(
        HTML_EXAMPLE,
        componentDeprecation.selector,
        (componentDeprecation.removedProperties || [])[0]
      );

      expect(result).toBeTruthy();
      expect(result).toEqual(HTML_EXAMPLE_EXPECTED);
    });
  });

  describe('insertHtmlComment', () => {
    it('should insert the comment with *ngIf', async () => {
      const componentDeprecation = COMPONENT_DEPRECATION_DATA[2];
      const result = insertHtmlComment(
        HTML_EXAMPLE_NGIF,
        (componentDeprecation.removedProperties || [])[0]
      );

      expect(result).toBeTruthy();
      expect(result).toEqual(HTML_EXAMPLE_NGIF_EXPECTED);
    });
  });

  describe('commitChanges', () => {
    it('should commit provided InsertChanges', async () => {
      const filePath = 'src/index.html';
      const change = 'xxx';
      const testChange = new InsertChange(filePath, 0, change);
      commitChanges(appTree, filePath, [testChange], InsertDirection.LEFT);

      const buffer = appTree.read(filePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const content = buffer.toString(UTF_8);
        expect(content).toContain(change);
      }
    });
    it('should commit provided ReplaceChange', async () => {
      const filePath = '/src/app/app.component.ts';
      const change = 'ChangedAppComponent';

      const testChange = new ReplaceChange(
        filePath,
        173,
        'AppComponent',
        change
      );
      commitChanges(appTree, filePath, [testChange], InsertDirection.LEFT);

      const buffer = appTree.read(filePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const content = buffer.toString(UTF_8);
        expect(content).toContain(change);
      }
    });
    it('should commit provided RemoveChange', async () => {
      const filePath = '/src/app/app.component.ts';

      const toRemove = `title = 'schematics-test';`;
      const testChange = new RemoveChange(filePath, 188, toRemove);
      commitChanges(appTree, filePath, [testChange], InsertDirection.LEFT);

      const buffer = appTree.read(filePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const content = buffer.toString(UTF_8);
        expect(content).not.toContain(toRemove);
      }
    });
  });

  describe('findConstructor', () => {
    it('should return the constructor if found', () => {
      const constructorNode: ts.Node = {
        kind: ts.SyntaxKind.Constructor,
      } as ts.Node;

      const nodes: ts.Node[] = [constructorNode];
      expect(findConstructor(nodes)).toEqual(constructorNode);
    });
    it('should return undefined if the constructor is not found', () => {
      const nodes: ts.Node[] = [];
      expect(findConstructor(nodes)).toEqual(undefined);
    });
  });

  describe('findConstructor', () => {
    it('should return the constructor if found', () => {
      const constructorNode: ts.Node = {
        kind: ts.SyntaxKind.Constructor,
      } as ts.Node;

      const nodes: ts.Node[] = [constructorNode];
      expect(findConstructor(nodes)).toEqual(constructorNode);
    });
    it('should return undefined if the constructor is not found', () => {
      const nodes: ts.Node[] = [];
      expect(findConstructor(nodes)).toEqual(undefined);
    });
  });

  describe('defineProperty', () => {
    it('should create a Change if the constructor exists', async () => {
      const testPath = 'path-xxx';
      const toAdd = 'add-xxx';
      const ctorNode = { kind: ts.SyntaxKind.Constructor, pos: 0 } as ts.Node;
      const result = defineProperty([ctorNode], testPath, toAdd);

      expect(result).toBeTruthy();
      expect(result.path).toEqual(testPath);
      expect(result.order).toEqual(1);
      expect(result.toAdd).toEqual(toAdd);
    });
  });

  describe('isCandidateForConstructorDeprecation', () => {
    it('should return false if the inheritance condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        INHERITANCE_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams: [],
        })
      ).toEqual(false);
    });
    it('should return false if the inheriting class import condition not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        INHERITANCE_IMPORT_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return false if the parameter import condition not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        IMPORT_MISSING_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return false if the constructor condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        NO_CONSTRUCTOR_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return true even if the parameter lengths condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        PARAMETER_LENGTH_MISS_MATCH_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(true);
    });
    it('should return false if the parameter order is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        WRONG_PARAMETER_ORDER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
        { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return false if the super() call does NOT exist', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        NO_SUPER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return false if an expression call exists, but it is NOT the super(); call', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        EXPRESSION_NO_SUPER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
    it('should return false if the expected number of parameters is not passed to super() call', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        SUPER_PARAMETER_NUMBER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const deprecatedParams: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(source, {
          class: USER_ADDRESS_SERVICE,
          importPath: SPARTACUS_CORE,
          deprecatedParams,
        })
      ).toEqual(false);
    });
  });

  describe('isInheriting', () => {
    it('should return true if the class is inheriting the provided service name', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        INHERITANCE_VALID_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );

      expect(
        isInheriting(getSourceNodes(source), USER_ADDRESS_SERVICE)
      ).toEqual(true);
    });
    it('should return false if the class is NOT inheriting the provided service name', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        INHERITANCE_VALID_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );

      expect(isInheriting(getSourceNodes(source), 'Xxx')).toEqual(false);
    });
  });

  describe('addConstructorParam', () => {
    it('should return the expected changes', () => {
      const sourcePath = 'xxx.ts';
      const source = ts.createSourceFile(
        sourcePath,
        VALID_ADD_CONSTRUCTOR_PARAM_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = findConstructor(nodes);
      const paramToAdd: ClassType = {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      };

      const changes = addConstructorParam(
        source,
        sourcePath,
        constructorNode,
        paramToAdd
      );
      expect(changes.length).toEqual(3);
      expect(changes[0].description).toEqual(
        `Inserted , authService: AuthService into position 288 of ${sourcePath}`
      );
      expect(changes[1].description).toEqual(
        `Inserted , AuthService into position 124 of ${sourcePath}`
      );
      expect(changes[2].description).toEqual(
        `Inserted , authService into position 311 of ${sourcePath}`
      );
    });
    describe('when the class has additional services injected', () => {
      it('should return the expected changes', () => {
        const sourcePath = 'xxx.ts';
        const source = ts.createSourceFile(
          sourcePath,
          VALID_ADD_CONSTRUCTOR_PARAM_WITH_ADDITIONAL_INJECTED_SERVICE_CLASS,
          ts.ScriptTarget.Latest,
          true
        );
        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);
        const paramToAdd: ClassType = {
          className: AUTH_SERVICE,
          importPath: SPARTACUS_CORE,
        };

        const changes = addConstructorParam(
          source,
          sourcePath,
          constructorNode,
          paramToAdd
        );
        expect(changes.length).toEqual(3);
        expect(changes[0].description).toEqual(
          `Inserted , authService: AuthService into position 354 of ${sourcePath}`
        );
        expect(changes[1].description).toEqual(
          `Inserted , AuthService into position 140 of ${sourcePath}`
        );
        expect(changes[2].description).toEqual(
          `Inserted , authService into position 384 of ${sourcePath}`
        );
      });
    });
    describe('when adding an @Inject decorator', () => {
      it('should return the expected changes', () => {
        const sourcePath = 'xxx.ts';
        const source = ts.createSourceFile(
          sourcePath,
          VALID_ADD_CONSTRUCTOR_PARAM_CLASS,
          ts.ScriptTarget.Latest,
          true
        );
        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);
        const paramToAdd: ClassType = {
          className: PLATFORM,
          literalInference: ANY_TYPE,
          injectionToken: {
            token: PLATFORM_ID_STRING,
            importPath: ANGULAR_CORE,
          },
        };

        const changes = addConstructorParam(
          source,
          sourcePath,
          constructorNode,
          paramToAdd
        );
        expect(changes.length).toEqual(4);
        expect(changes[0].description).toEqual(
          `Inserted , @Inject(PLATFORM_ID) platform: any into position 288 of ${sourcePath}`
        );
        expect(changes[1].description).toContain(
          `import { Inject } from '@angular/core' into position 153 of ${sourcePath}`
        );
        expect(changes[2].description).toContain(
          `import { PLATFORM_ID } from '@angular/core' into position 153 of ${sourcePath}`
        );
        expect(changes[3].description).toEqual(
          `Inserted , platform into position 311 of ${sourcePath}`
        );
      });
    });
  });

  describe('removeConstructorParam', () => {
    it('should return the expected changes', () => {
      const sourcePath = 'xxx.ts';
      const source = ts.createSourceFile(
        sourcePath,
        VALID_REMOVE_CONSTRUCTOR_PARAM_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = findConstructor(nodes);
      const paramToRemove: ClassType = {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      };

      const changes = removeConstructorParam(
        source,
        sourcePath,
        constructorNode,
        paramToRemove
      );
      expect(changes.length).toEqual(6);
      expect(changes[0].description).toEqual(
        `Removed FeatureConfigService, into position 81 of ${sourcePath}`
      );
      expect(changes[1].description).toEqual(
        `Removed , into position 308 of ${sourcePath}`
      );
      expect(changes[2].description).toEqual(
        `Removed featureConfigService?: FeatureConfigService into position 318 of ${sourcePath}`
      );
      expect(changes[3]).toEqual(new NoopChange());
      expect(changes[4].description).toEqual(
        `Removed , into position 400 of ${sourcePath}`
      );
      expect(changes[5].description).toEqual(
        `Removed featureConfigService into position 402 of ${sourcePath}`
      );
    });
  });

  describe('injectService', () => {
    it('should create a Change to inject the specified service', async () => {
      const testPath = 'path-xxx';
      const ctorNode = {
        kind: ts.SyntaxKind.Constructor,
        pos: 0,
        getChildren: () => [] as ts.Node[],
        getStart: () => 10,
      } as ts.Node;

      const result = injectService({
        constructorNode: ctorNode,
        path: testPath,
        serviceName: 'dummyService',
        modifier: 'private',
        propertyName: 'DummyProperty',
      });
      expect(result).toBeTruthy();
      expect(result.toAdd).toEqual(`private dummyProperty: DummyService`);
    });
  });

  describe('buildSpartacusComment', () => {
    it('should build a proper comment', () => {
      const comment = 'test';
      expect(buildSpartacusComment(comment)).toEqual(
        `// ${TODO_SPARTACUS} ${comment}\n`
      );
    });
  });

  describe('insertCommentAboveConfigProperty', () => {
    it('should return the InsertChanges', async () => {
      const filePath = 'xxx.ts';
      const source = ts.createSourceFile(
        filePath,
        CONFIG_DEPRECATION_TEST,
        ts.ScriptTarget.Latest,
        true
      );

      const testComment = `// test comment\n`;
      const changes = insertCommentAboveConfigProperty(
        filePath,
        source,
        ANONYMOUS_CONSENTS,
        testComment
      );
      expect(changes.length).toEqual(3);
    });
  });

  describe('insertCommentAboveIdentifier', () => {
    it('should return the InsertChanges', async () => {
      const filePath = '/src/app/app.component.ts';
      const source = getTsSourceFile(appTree, filePath);
      const identifierName = 'AppComponent';
      const commentToInsert = 'comment';

      const changes = insertCommentAboveIdentifier(
        filePath,
        source,
        identifierName,
        commentToInsert
      );
      expect(changes).toEqual([
        new InsertChange(filePath, 161, commentToInsert),
      ]);
    });
  });

  describe('renameIdentifierNode', () => {
    it('should return the ReplaceChange', async () => {
      const filePath = '/src/app/app.component.ts';
      const source = getTsSourceFile(appTree, filePath);
      const oldName = 'AppComponent';
      const newName = 'NewAppComponent';

      const changes = renameIdentifierNode(filePath, source, oldName, newName);
      expect(changes).toEqual([
        new ReplaceChange(filePath, 174, oldName, newName),
      ]);
    });
  });

  describe('getLineFromTSFile', () => {
    it('should return the ReplaceChange', async () => {
      const lineFileTestContent =
        "import test1 from '@test-lib';\nimport test2 from '@another-test-lib';\nconst test = new Test();";
      const lineFilePath = '/line-test.ts';
      const testLine = "import test2 from '@another-test-lib'";
      appTree.create(lineFilePath, lineFileTestContent);
      const content = appTree.readContent(lineFilePath);
      const lines = getLineFromTSFile(
        appTree,
        lineFilePath,
        content.indexOf(testLine)
      );

      expect(lines[0]).toEqual(content.indexOf(testLine));
    });
  });

  describe('removeInjectImports', () => {
    it('should remove injection token AND Inject decorator imports when there is one decorator in the constructor', () => {
      const sourcePath = 'xxx.ts';
      const source = ts.createSourceFile(
        sourcePath,
        SINGLE_DECORATOR_CONSTRUCTOR,
        ts.ScriptTarget.Latest,
        true
      );
      const paramToRemove: ClassType = {
        className: PLATFORM,
        literalInference: ANY_TYPE,
        injectionToken: {
          token: PLATFORM_ID_STRING,
          importPath: ANGULAR_CORE,
        },
      };

      const nodes = getSourceNodes(source);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const constructorNode = findConstructor(nodes)!;
      const changes = removeInjectImports(
        source,
        constructorNode,
        paramToRemove
      );
      expect(changes.length).toEqual(2);
      expect(changes[0].description).toEqual(
        `Removed Inject, into position 10 of ${sourcePath}`
      );
      expect(changes[1].description).toContain(
        `Removed PLATFORM_ID into position 30 of ${sourcePath}`
      );
    });
    it('should remove ONLY injection token when there are many decorators in the constructor', () => {
      const sourcePath = 'xxx.ts';
      const source = ts.createSourceFile(
        sourcePath,
        MULTIPLE_DECORATOR_CONSTRUCTOR,
        ts.ScriptTarget.Latest,
        true
      );
      const paramToRemove: ClassType = {
        className: PLATFORM,
        literalInference: ANY_TYPE,
        injectionToken: {
          token: PLATFORM_ID_STRING,
          importPath: ANGULAR_CORE,
        },
      };

      const nodes = getSourceNodes(source);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const constructorNode = findConstructor(nodes)!;
      const changes = removeInjectImports(
        source,
        constructorNode,
        paramToRemove
      );
      expect(changes.length).toEqual(1);
      expect(changes[0].description).toContain(
        `Removed PLATFORM_ID into position 30 of ${sourcePath}`
      );
    });
  });

  describe('shouldRemoveDecorator', () => {
    it('should return true if the decorator is present one time', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        SINGLE_DECORATOR_CONSTRUCTOR,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const constructorNode = findConstructor(nodes)!;
      expect(shouldRemoveDecorator(constructorNode, 'Inject')).toEqual(true);
    });

    it('should return false if the decorator is present multiple times', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        MULTIPLE_DECORATOR_CONSTRUCTOR,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const constructorNode = findConstructor(nodes)!;
      const res = shouldRemoveDecorator(constructorNode, 'Inject');
      expect(res).toEqual(false);
    });
  });
});
