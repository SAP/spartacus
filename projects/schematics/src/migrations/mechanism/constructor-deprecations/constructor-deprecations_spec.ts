import { getSystemPath, strings } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  getSourceNodes,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import * as shx from 'shelljs';
import ts from 'typescript';
import { AUTH_SERVICE, SPARTACUS_CORE, STORE } from '../../../shared/constants';
import {
  getConstructor,
  getParams,
  runMigration,
  writeFile,
} from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-constructor-deprecations-03';
const NOT_INHERITING_SPARTACUS_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithProcess, StateWithUser } from '@spartacus/core';
    export class InheritingService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const NO_CONSTRUCTOR = `
    import { UserAddressService } from '@spartacus/core';
    import { Store } from '@ngrx/store';
    export class InheritingService extends UserAddressService {}
`;
const WRONG_PARAM_ORDER_BUT_VALID = `
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '@spartacus/core';
import {
  AddToCartComponent,
  CurrentProductService,
  ModalService,
} from '@spartacus/storefront';
export class InheritingService extends AddToCartComponent {
  constructor(
    modalService: ModalService,
    currentProductService: CurrentProductService,
    cartService: CartService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(cartService, modalService, currentProductService, changeDetectorRef);
  }
}
`;
const WRONG_PARAM_ORDER_EXPECTED = `
import { ChangeDetectorRef } from '@angular/core';
import {  ActiveCartService } from '@spartacus/core';
import {
  AddToCartComponent,
  CurrentProductService,
  ModalService,
} from '@spartacus/storefront';
export class InheritingService extends AddToCartComponent {
  constructor(
    modalService: ModalService,
    currentProductService: CurrentProductService
    ,
    changeDetectorRef: ChangeDetectorRef, activeCartService: ActiveCartService
  ) {
    super( modalService, currentProductService, changeDetectorRef, activeCartService);
  }
}
`;
const NO_SUPER_CALL = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const CALL_EXPRESSION_NO_SUPER = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
        console.log(Math.random());
      }
    }
`;
const ADD_PARAMETER_VALID_TEST_CLASS = `
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
const ADD_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_VALID_TEST_CLASS = `
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
const ADD_PARAMETER_WITH_ALREADY_ADDED_SERVICE_VALID_TEST_CLASS = `
import { ActionsSubject, Store } from '@ngrx/store';
import {
  StateWithProcess,
  StateWithUser,
  UserAddressService,
  AuthService
} from '@spartacus/core';
export class InheritedService extends UserAddressService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    private auth: AuthService,
  ) {
    super(store);
  }
}
`;
const ADD_PARAMETER_WITH_ALREADY_ADDED_SERVICE_EXPECTED_CLASS = `
import { ActionsSubject, Store } from '@ngrx/store';
import {
  StateWithProcess,
  StateWithUser,
  UserAddressService,
  AuthService
} from '@spartacus/core';
export class InheritedService extends UserAddressService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    private auth: AuthService,
  ) {
    super(store, auth);
  }
}
`;
const REMOVE_PARAMETER_VALID_TEST_CLASS = `
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
const REMOVE_PARAMETER_EXPECTED_CLASS = `
import { Dummy } from '@angular/core';
import {
  CmsService,
  
  PageMetaResolver,
  PageMetaService
} from '@spartacus/core';
export class Test extends PageMetaService {
  constructor(
    resolvers: PageMetaResolver[],
    cms: CmsService
    
  ) {
    super(resolvers, cms );
  }
}
`;
const REMOVE_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_VALID_TEST_CLASS = `
import { ActionsSubject } from '@ngrx/store';
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
    featureConfigService: FeatureConfigService,
    private actions: ActionsSubject
  ) {
    super(resolvers, cms, featureConfigService);
    console.log(this.actions);
  }
}
`;
const REMOVE_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_EXPECTED_CLASS = `
import { ActionsSubject } from '@ngrx/store';
import {
  CmsService,
  
  PageMetaResolver,
  PageMetaService
} from '@spartacus/core';
export class Test extends PageMetaService {
  constructor(
    resolvers: PageMetaResolver[],
    cms: CmsService
    ,
    private actions: ActionsSubject
  ) {
    super(resolvers, cms );
    console.log(this.actions);
  }
}
`;
const REMOVE_PARAMETER_BUT_NOT_IMPORT_VALID_TEST_CLASS = `
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
    featureConfigService: FeatureConfigService
  ) {
    super(resolvers, cms, featureConfigService);
  }
  test(): void {
    console.log(this.featureConfigService);
  }
}
`;
const REMOVE_PARAMETER_BUT_NOT_IMPORT_EXPECTED_CLASS = `
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
    featureConfigService: FeatureConfigService
  ) {
    super(resolvers, cms );
  }
  test(): void {
    console.log(this.featureConfigService);
  }
}
`;

const ADD_AND_REMOVE_PARAMETER_VALID_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithCheckout, CheckoutService, CartDataService } from '@spartacus/core';
    export class InheritingService extends CheckoutService {
      constructor(store: Store<StateWithCheckout>, cartDataService: CartDataService) {
        super(store, cartDataService);
      }
    }
`;
const ADD_AND_REMOVE_PARAMETER_EXPECTED_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithCheckout, CheckoutService,  AuthService, ActiveCartService } from '@spartacus/core';
    export class InheritingService extends CheckoutService {
      constructor(store: Store<StateWithCheckout> , authService: AuthService, activeCartService: ActiveCartService) {
        super(store , authService, activeCartService);
      }
    }
`;
const CART_PAGE_LAYOUT_HANDLER = `
    import { CartPageLayoutHandler } from '@spartacus/storefront';
    import { CartService } from '@spartacus/core';
    export class InheritingService extends CartPageLayoutHandler {
      constructor(cartService: CartService) {
        super(cartService);
      }
    }
`;
const CART_PAGE_LAYOUT_HANDLER_EXPECTED = `
    import { CartPageLayoutHandler } from '@spartacus/storefront';
    import {  ActiveCartService, SelectiveCartService } from '@spartacus/core';
    export class InheritingService extends CartPageLayoutHandler {
      constructor( activeCartService: ActiveCartService, selectiveCartService: SelectiveCartService) {
        super( activeCartService, selectiveCartService);
      }
    }
`;
const ADD_PARAM_COMPLEX_CTOR = `
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  CmsConfig,
  CmsService,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {PageSlotComponent} from '@spartacus/storefront';
@Component({
  selector: 'custom',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPageSlotComponent extends PageSlotComponent {
  constructor(
      protected cmsService: CmsService,
      protected dynamicAttributeService: DynamicAttributeService,
      protected renderer: Renderer2,
      protected hostElement: ElementRef,
      protected config?: CmsConfig
  ) {
    super(cmsService, dynamicAttributeService, renderer, hostElement, config);
    of('position').pipe(
        switchMap(position =>
            this.cmsService.getContentSlot(position).pipe(
                tap(slot => console.log(slot)),
                map(slot => (slot && slot.components ? slot.components : [])),
                distinctUntilChanged((a, b) => a.length === b.length)
                )
            )
        )
    );
  }
}
`;
const ADD_PARAM_COMPLEX_CTOR_EXPECTED = `
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2, ChangeDetectorRef,
} from '@angular/core';
import {
  
  CmsService,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {PageSlotComponent, CmsComponentsService} from '@spartacus/storefront';
@Component({
  selector: 'custom',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPageSlotComponent extends PageSlotComponent {
  constructor(
      protected cmsService: CmsService,
      protected dynamicAttributeService: DynamicAttributeService,
      protected renderer: Renderer2,
      protected hostElement: ElementRef
      , cmsComponentsService: CmsComponentsService, changeDetectorRef: ChangeDetectorRef
  ) {
    super(cmsService, dynamicAttributeService, renderer, hostElement , cmsComponentsService, changeDetectorRef);
    of('position').pipe(
        switchMap(position =>
            this.cmsService.getContentSlot(position).pipe(
                tap(slot => console.log(slot)),
                map(slot => (slot && slot.components ? slot.components : [])),
                distinctUntilChanged((a, b) => a.length === b.length)
                )
            )
        )
    );
  }
}
`;
const AT_INJECT_TEST = `
import {
  PageMetaService,
  PageMetaResolver,
  CmsService,
  FeatureConfigService
} from '@spartacus/core';
import {Injectable, Inject} from '@angular/core';
@Injectable({})
export class CustomPageMetaService extends PageMetaService {
  constructor(
      @Inject(PageMetaResolver)
      protected resolvers: PageMetaResolver[],
      protected cms: CmsService,
      featureConfigService: FeatureConfigService
  ) {
      super(resolvers, cms, featureConfigService);
  }
}
`;
const AT_INJECT_EXPECTED = `
import {
  PageMetaService,
  PageMetaResolver,
  CmsService,
  
} from '@spartacus/core';
import {Injectable, Inject} from '@angular/core';
@Injectable({})
export class CustomPageMetaService extends PageMetaService {
  constructor(
      @Inject(PageMetaResolver)
      protected resolvers: PageMetaResolver[],
      protected cms: CmsService
      
  ) {
      super(resolvers, cms );
  }
}
`;

describe('constructor migrations', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
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
          'spartacus-test': {
            sourceRoot: 'src',
            test: {
              architect: {
                build: { options: { tsConfig: './tsconfig.json' } },
              },
            },
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

  describe('when the class does NOT extend a Spartacus class', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', NOT_INHERITING_SPARTACUS_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NOT_INHERITING_SPARTACUS_CLASS);
    });
  });

  describe('when the class does NOT have a constructor', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', NO_CONSTRUCTOR);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NO_CONSTRUCTOR);
    });
  });

  describe('when the class has the wrong param order', () => {
    it('should NOT skip it', async () => {
      writeFile(host, '/src/index.ts', WRONG_PARAM_ORDER_BUT_VALID);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(WRONG_PARAM_ORDER_EXPECTED);
    });
  });

  describe('when the class does NOT have a super call', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', NO_SUPER_CALL);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NO_SUPER_CALL);
    });
  });

  describe('when the class has a CallExpression node which is NOT of type super', () => {
    it('should skip it', async () => {
      const filePath = '/src/index.ts';
      writeFile(host, filePath, CALL_EXPRESSION_NO_SUPER);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(filePath);
      expect(content).toEqual(CALL_EXPRESSION_NO_SUPER);
    });
  });

  describe('when all the pre-conditions are valid for adding a parameter', () => {
    it('should just append the missing parameters', async () => {
      const filePath = '/src/index.ts';
      writeFile(host, filePath, ADD_PARAMETER_VALID_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(filePath);

      const source = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = getConstructor(nodes);
      const params = getParams(constructorNode, [
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      expect(params).toEqual([
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
    });
    describe('when the class has additional services injected', () => {
      it('should just append the missing parameters', async () => {
        const filePath = '/src/index.ts';
        writeFile(
          host,
          filePath,
          ADD_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_VALID_TEST_CLASS
        );

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent(filePath);

        const source = ts.createSourceFile(
          filePath,
          content,
          ts.ScriptTarget.Latest,
          true
        );
        const nodes = getSourceNodes(source);
        const constructorNode = getConstructor(nodes);
        const params = getParams(constructorNode, [
          strings.camelize(STORE),
          strings.camelize(AUTH_SERVICE),
        ]);
        expect(params).toEqual([
          strings.camelize(STORE),
          strings.camelize(AUTH_SERVICE),
        ]);
        expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
      });
    });
    describe('when the service to be added is already injected', () => {
      it('should just not add the parameter', async () => {
        const filePath = '/src/index.ts';
        writeFile(
          host,
          filePath,
          ADD_PARAMETER_WITH_ALREADY_ADDED_SERVICE_VALID_TEST_CLASS
        );

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
        const content = appTree.readContent(filePath);
        expect(content).toEqual(
          ADD_PARAMETER_WITH_ALREADY_ADDED_SERVICE_EXPECTED_CLASS
        );
      });
    });
  });

  describe('when all the pre-conditions are valid for removing a parameter', () => {
    it('should make the required changes', async () => {
      writeFile(host, '/src/index.ts', REMOVE_PARAMETER_VALID_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(REMOVE_PARAMETER_EXPECTED_CLASS);
    });
    describe('when an additional parameter is injected', () => {
      it('should make the required changes', async () => {
        writeFile(
          host,
          '/src/index.ts',
          REMOVE_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_VALID_TEST_CLASS
        );

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent('/src/index.ts');
        expect(content).toEqual(
          REMOVE_PARAMETER_WITH_ADDITIONAL_INJECTED_SERVICE_EXPECTED_CLASS
        );
      });
    });
    describe('when the param to be removed is being used elsewhere', () => {
      it('should make the required changes, but not remove the import and param from the ctor', async () => {
        writeFile(
          host,
          '/src/index.ts',
          REMOVE_PARAMETER_BUT_NOT_IMPORT_VALID_TEST_CLASS
        );

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent('/src/index.ts');
        expect(content).toEqual(REMOVE_PARAMETER_BUT_NOT_IMPORT_EXPECTED_CLASS);
      });
    });
    describe('when the first constructor parameter should be removed', () => {
      it('should remove the trailing comma as well', async () => {
        writeFile(host, '/src/index.ts', CART_PAGE_LAYOUT_HANDLER);

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent('/src/index.ts');
        expect(content).toEqual(CART_PAGE_LAYOUT_HANDLER_EXPECTED);
      });
    });
  });

  describe('when all the pre-conditions are valid for adding and removing parameters', () => {
    it('should make the required changes', async () => {
      writeFile(
        host,
        '/src/index.ts',
        ADD_AND_REMOVE_PARAMETER_VALID_TEST_CLASS
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(ADD_AND_REMOVE_PARAMETER_EXPECTED_CLASS);
    });
  });

  describe('when all the pre-conditions are valid for adding and removing parameters', () => {
    it('should make the required changes', async () => {
      writeFile(
        host,
        '/src/index.ts',
        ADD_AND_REMOVE_PARAMETER_VALID_TEST_CLASS
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(ADD_AND_REMOVE_PARAMETER_EXPECTED_CLASS);
    });
  });

  describe('when the constructor has some complex logic in it', () => {
    it('should add parameters', async () => {
      writeFile(host, '/src/index.ts', ADD_PARAM_COMPLEX_CTOR);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(ADD_PARAM_COMPLEX_CTOR_EXPECTED);
    });
  });

  describe('when the constructor contains @Inject()', () => {
    it('should remove a parameter', async () => {
      writeFile(host, '/src/index.ts', AT_INJECT_TEST);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(AT_INJECT_EXPECTED);
    });
  });
});
