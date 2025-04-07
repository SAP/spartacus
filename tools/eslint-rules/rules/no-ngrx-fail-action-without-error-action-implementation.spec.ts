import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/test-utils';
import {
  rule,
  RULE_NAME,
} from './no-ngrx-fail-action-without-error-action-implementation';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // actions with `Fail` in name, that implement `ErrorAction`
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProductFail implements ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProductFail implements Action, ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProductFail implements Action, SomeOtherInterface, ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProductFail extends SuperClass implements ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProductFail extends SuperClass implements SomeOtherInterface, ErrorAction {}
    `,

    // actions without `Fail` in name, that implement `ErrorAction`
    `        
    import { ErrorAction } from '@spartacus/core';
    export class LoadProduct implements ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProduct implements Action, ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProduct implements Action, SomeOtherInterface, ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProduct extends SuperClass implements ErrorAction {}
    `,
    `
    import { ErrorAction } from '@spartacus/core';
    export class LoadProduct extends SuperClass implements SomeOtherInterface, ErrorAction {}
    `,

    // actions without `Fail` in name, that don't implement `ErrorAction`
    `        
    export class LoadProduct {}
    `,
    `
    export class LoadProduct implements Action {}
    `,
    `
    export class LoadProduct implements Action, SomeOtherInterface {}
    `,
    `
    export class LoadProduct extends SuperClass {}
    `,
    `
    export class LoadProduct extends SuperClass implements SomeOtherInterface {}
    `,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, and no other implements',
      annotatedSource: `
        export class LoadProductFail {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail implements ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),

    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, but only 1 other `implements`',
      annotatedSource: `
        export class LoadProductFail implements Action {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail implements Action, ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),

    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, but only 2 other `implements`',
      annotatedSource: `
        export class LoadProductFail implements Action, SomeOtherInterface {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail implements Action, SomeOtherInterface, ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),

    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, but only 1 other `extends`',
      annotatedSource: `
        export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction implements ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),

    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, but only 1 other `extends` and 1 other `implements`',
      annotatedSource: `
        export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction implements Action {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction implements Action, ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),

    convertAnnotatedSourceToFailureCase({
      description:
        'Fail action has no `implements ErrorAction`, but only 1 other `extends` and 2 other `implements`',
      annotatedSource: `
        export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction implements Action, SomeOtherInterface {
                     ~~~~~~~~~~~~~~~
        }
      `,
      annotatedOutput: `
        import { ErrorAction } from '@spartacus/core';
export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction implements Action, SomeOtherInterface, ErrorAction {
                     
        }
      `,
      messageId: 'missingImplementsErrorAction',
    }),
  ],
});
