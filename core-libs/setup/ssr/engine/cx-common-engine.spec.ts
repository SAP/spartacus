// eslint-disable-next-line import/no-unassigned-import
import '@angular/compiler';

import { Component, InjectionToken, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-handling/error-response/propagate-error-to-server';
import { CxCommonEngine } from './cx-common-engine';

// Test how the CxCommonEngine handles successful server-side rendering
@Component({ selector: 'cx-mock', template: 'some template' })
export class SuccessComponent {}

@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [SuccessComponent],
  bootstrap: [SuccessComponent],
})
export class SuccessServerModule {}

// Test how the CxCommonEngine handles propagated error
@Component({
  selector: 'cx-response',
  template: ``,
})
export class WithPropagatedErrorComponent {
  constructor() {
    inject(PROPAGATE_ERROR_TO_SERVER)(new Error('test error'));
  }
}

@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [WithPropagatedErrorComponent],
  bootstrap: [WithPropagatedErrorComponent],
})
export class WithPropagatedErrorServerModule {}

// Test that the CxCommonEngine doesn't override providers
// If SOME_TOKEN not provided, test how the CxCommonEngine handles APP_INITIALIZER errors
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

describe('CxCommonEngine', () => {
  let engine: CxCommonEngine;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return html if no errors', async () => {
    engine = new CxCommonEngine({
      bootstrap: SuccessServerModule,
    });

    const html = await engine.render({
      url: 'http://localhost:4200',
      document: '<cx-mock></cx-mock>',
    });

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(html).toMatchSnapshot();
  });

  it('should not override providers passed to options', async () => {
    engine = new CxCommonEngine({
      bootstrap: TokenServerModule,
    });

    const html = await engine.render({
      url: 'http://localhost:4200',
      document: '<cx-token></cx-token>',
      providers: [{ provide: SOME_TOKEN, useValue: 'test' }],
    });

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    expect(html).toMatchSnapshot();
  });

  it('should handle APP_INITIALIZER errors the standard Angular way and throw if any occurred', async () => {
    engine = new CxCommonEngine({
      bootstrap: TokenServerModule,
    });

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    await expect(
      engine.render({
        url: 'http://localhost:4200',
        document: '<cx-token></cx-token>',
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should handle errors propagated from SSR', async () => {
    engine = new CxCommonEngine({
      bootstrap: WithPropagatedErrorServerModule,
    });

    // Cannot use `.toMatchInlineSnapshot()` due to bug in jest:
    // see: https://github.com/thymikee/jest-preset-angular/issues/1084
    await expect(
      engine.render({
        url: 'http://localhost:4200',
        document: '<cx-response></cx-response>',
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
