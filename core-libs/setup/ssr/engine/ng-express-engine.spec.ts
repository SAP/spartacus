/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@angular/compiler';

import { Component, Inject, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { REQUEST, RESPONSE } from '../public_api';
import { ngExpressEngine } from './ng-express-engine';
//@ts-ignore

const allowedHosts = Object.freeze(['localhost']);

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@Component({
  selector: 'cx-mock',
  template: 'some template',
  // eslint-disable-next-line @angular-eslint/prefer-standalone -- This component must be non-standalone to support NgModule.bootstrap[] in the test setup
  standalone: false,
})
export class MockComponent {}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [MockComponent],
  bootstrap: [MockComponent],
})
export class MockServerModule {}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@Component({
  selector: 'cx-request',
  template: `url:{{ _req.url }}`,
  // eslint-disable-next-line @angular-eslint/prefer-standalone -- This component must be non-standalone to support NgModule.bootstrap[] in the test setup
  standalone: false,
})
export class RequestComponent {
  constructor(@Inject(REQUEST) public readonly _req: any) {}
}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [RequestComponent],
  bootstrap: [RequestComponent],
})
export class RequestServerModule {}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@Component({
  selector: 'cx-response',
  template: `statusCode:{{ _res.statusCode }}`,
  // eslint-disable-next-line @angular-eslint/prefer-standalone -- This component must be non-standalone to support NgModule.bootstrap[] in the test setup
  standalone: false,
})
export class ResponseComponent {
  constructor(@Inject(RESPONSE) public readonly _res: any) {}
}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [ResponseComponent],
  bootstrap: [ResponseComponent],
})
export class ResponseServerModule {}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
export const SOME_TOKEN = new InjectionToken<string>('SOME_TOKEN');

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@Component({
  selector: 'cx-token',
  template: `message:{{ _someToken.message }}`,
  // eslint-disable-next-line @angular-eslint/prefer-standalone -- This component must be non-standalone to support NgModule.bootstrap[] in the test setup
  standalone: false,
})
export class TokenComponent {
  constructor(@Inject(SOME_TOKEN) public readonly _someToken: any) {}
}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/mock.server.module.ts
 *
 */
@NgModule({
  imports: [BrowserModule, ServerModule],
  declarations: [TokenComponent],
  bootstrap: [TokenComponent],
})
export class TokenServerModule {}

function getTestRequest(overrides: Record<string, unknown> = {}): unknown {
  return {
    get: (header: string) => (header === 'host' ? 'localhost:4200' : undefined),
    protocol: 'http',
    baseUrl: '',
    // Express's `req.url` is the path portion, not a full URL.
    // The engine builds the final render URL via
    // `${protocol}://${host}${baseUrl}${url}`, so passing a full URL here
    // would produce a malformed concatenated URL that newer
    // `@angular/platform-server` versions reject during host validation.
    url: '/',
    ...overrides,
  };
}

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by tests for ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/spec/index.spec.ts
 *
 */
describe('ngExpressEngine', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  it('should render a basic template', (done) => {
    ngExpressEngine({
      bootstrap: MockServerModule,
      allowedHosts,
    })(
      null as any as string,
      {
        req: getTestRequest(),
        document: '<cx-mock></cx-mock>',
      },
      (err, html) => {
        if (err) {
          throw err;
        }
        expect(html).toContain('some template');
        done();
      }
    );
  });

  it('Should throw when no module is passed', () => {
    ngExpressEngine({ bootstrap: null as any, allowedHosts })(
      null as any as string,
      {
        req: {} as any,
        bootstrap: null as any,
        document: '<cx-mock></cx-mock>',
      },
      (_err, _html) => {
        expect(_err).toBeTruthy();
      }
    );
  });

  it('should be able to inject REQUEST token', (done) => {
    ngExpressEngine({
      bootstrap: RequestServerModule,
      allowedHosts,
    })(
      null as any as string,
      {
        req: getTestRequest(),
        document: '<cx-request></cx-request>',
      },
      (err, html) => {
        if (err) {
          throw err;
        }
        expect(html).toContain('url:/');
        done();
      }
    );
  });

  it('should be able to inject RESPONSE token', (done) => {
    const someStatusCode = 400;
    ngExpressEngine({
      bootstrap: ResponseServerModule,
      allowedHosts,
    })(
      null as any as string,
      {
        req: getTestRequest({
          res: { statusCode: someStatusCode },
        }),
        document: '<cx-response></cx-response>',
      },
      (err, html) => {
        if (err) {
          throw err;
        }
        expect(html).toContain(`statusCode:${someStatusCode}`);
        done();
      }
    );
  });

  it('should be able to inject some token', (done) => {
    const someValue = { message: 'value' + new Date() };
    ngExpressEngine({
      bootstrap: TokenServerModule,
      providers: [{ provide: SOME_TOKEN, useValue: someValue }],
      allowedHosts,
    })(
      null as any as string,
      {
        req: getTestRequest(),
        document: '<cx-token></cx-token>',
      },
      (err, html) => {
        if (err) {
          throw err;
        }
        expect(html).toContain(someValue.message);
        done();
      }
    );
  });
});
