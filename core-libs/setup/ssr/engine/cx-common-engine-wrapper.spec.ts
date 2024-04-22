// eslint-disable-next-line import/no-unassigned-import
import '@angular/compiler';

import { Component, InjectionToken, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { CommonEngine } from '@angular/ssr';
import { PROPAGATE_SERVER_ERROR_RESPONSE } from '../error-handling/server-error-response/propagate-server-error-response';
import {
  CmsPageNotFoundServerErrorResponse,
  cxCommonEngineWrapper,
} from '../public_api';

// Test how the cxCommonEngineWrapper handles successful server-side rendering
@Component({ selector: 'cx-mock', template: 'some template' })
export class SuccessComponent {}

@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [SuccessComponent],
  bootstrap: [SuccessComponent],
})
export class SuccessServerModule {}

// Test how the cxCommonEngineWrapper handles propagated server errors
@Component({
  selector: 'cx-response',
  template: ``,
})
export class WithPropagatedErrorComponent {
  constructor() {
    inject(PROPAGATE_SERVER_ERROR_RESPONSE)(
      new CmsPageNotFoundServerErrorResponse({ message: 'test' })
    );
  }
}

@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [WithPropagatedErrorComponent],
  bootstrap: [WithPropagatedErrorComponent],
})
export class WithPropagatedErrorServerModule {}

// Test that the cxCommonEngineWrapper doesn't override providers
// If SOME_TOKEN not provided, test how the cxCommonEngineWrapper handles APP_INITIALIZER errors
export const SOME_TOKEN = new InjectionToken<string>('SOME_TOKEN');

@Component({
  selector: 'cx-token',
  template: `message:{{ someToken }}`,
})
export class TokenComponent {
  someToken = inject(SOME_TOKEN);
}

@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [TokenComponent],
  bootstrap: [TokenComponent],
})
export class TokenServerModule {}

describe('ngExpressEngine', () => {
  let engine: CommonEngine;
  let callback: jest.Mock;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return html if no errors', async () => {
    engine = new CommonEngine({
      bootstrap: SuccessServerModule,
    });

    await cxCommonEngineWrapper(
      engine,
      {
        req: {
          get: () => 'localhost',
          url: 'http://localhost:4200',
        } as any,
        document: '<cx-mock></cx-mock>',
      },
      callback
    );

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(callback.mock.lastCall).toMatchSnapshot();
  });

  it('should not override providers passed to options', async () => {
    engine = new CommonEngine({
      bootstrap: TokenServerModule,
    });

    await cxCommonEngineWrapper(
      engine,
      {
        req: {
          get: () => 'localhost',
          url: 'http://localhost:4200',
        } as any,
        providers: [{ provide: SOME_TOKEN, useValue: 'test' }],
        document: '<cx-token></cx-token>',
      },
      callback
    );

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(callback.mock.lastCall).toMatchSnapshot();
  });

  it('should handle APP_INITIALIZER errors the standard Angular way', async () => {
    engine = new CommonEngine({
      bootstrap: TokenServerModule,
    });

    await cxCommonEngineWrapper(
      engine,
      {
        req: {} as any,
        bootstrap: null as any,
        document: '<cx-token></cx-token>',
      },
      callback
    );

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(callback.mock.lastCall).toMatchSnapshot();
  });

  it('should handle errors propagated from SSR', async () => {
    engine = new CommonEngine({
      bootstrap: WithPropagatedErrorServerModule,
    });

    await cxCommonEngineWrapper(
      engine,
      {
        req: {} as any,
        bootstrap: null as any,
        document: '<cx-response></cx-response>',
      },
      callback
    );

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(callback.mock.lastCall).toMatchSnapshot();
  });
});
