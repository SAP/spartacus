/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BffHttpService } from '../bff-http.service';

/**
 * Minimal example: call the BFF's `sample.sayHello` procedure.
 *
 * Route: /bff-say-hello
 *
 * Procedure contract (apps/bff/src/api/routers/sample.ts):
 *   path:    sample.sayHello
 *   type:    query (GET)
 *   input:   { name?: string }              default "world"
 *   headers: { x-app-custom: 'foo'|'bar' }  default "foo"
 *   output:  { message: string }            e.g. "Hello Spartacus!"
 */
@Component({
  selector: 'cx-bff-say-hello',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <section style="padding: 1.5rem; font-family: system-ui, sans-serif;">
      <h2>sample.sayHello</h2>

      <div
        style="display: flex; gap: .5rem; align-items: center; margin-bottom: 1rem;"
      >
        <input
          [(ngModel)]="name"
          placeholder="Enter a name"
          style="padding: .4rem .7rem; border: 1px solid #ccc; border-radius: 4px;"
        />
        <select
          [(ngModel)]="appCustomHeader"
          style="padding: .4rem .7rem; border: 1px solid #ccc; border-radius: 4px;"
        >
          <option value="foo">x-app-custom: foo</option>
          <option value="bar">x-app-custom: bar</option>
        </select>
        <button
          (click)="sayHello()"
          [disabled]="loading()"
          style="padding: .4rem 1rem; background: #0070c8; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
        >
          {{ loading() ? '…' : 'Say Hello' }}
        </button>
      </div>

      @if (message()) {
        <p data-testid="message">{{ message() }}</p>
      }
      @if (error()) {
        <p style="color: #b00020;" data-testid="error">{{ error() }}</p>
      }
    </section>
  `,
})
export class SayHelloComponent {
  private readonly bff = inject(BffHttpService);

  name = 'Spartacus';
  appCustomHeader: 'foo' | 'bar' = 'foo';

  readonly message = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  sayHello(): void {
    this.message.set(null);
    this.error.set(null);
    this.loading.set(true);

    this.bff
      .query<{
        message: string;
      }>(
        'sample.sayHello',
        { name: this.name },
        { 'x-app-custom': this.appCustomHeader }
      )
      .subscribe({
        next: (res) => {
          this.message.set(res.message);
          this.loading.set(false);
        },
        error: (err: unknown) => {
          this.error.set(err instanceof Error ? err.message : String(err));
          this.loading.set(false);
        },
      });
  }
}
