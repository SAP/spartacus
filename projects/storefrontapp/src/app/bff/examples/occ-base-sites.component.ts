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
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { BffHttpService } from '../bff-http.service';

/**
 * Example: call OCC's /basesites endpoint via the BFF.
 *
 * Route: /occ-base-sites
 *
 * BFF procedure: occ.getBaseSites (GET /occ/v2/basesites)
 * The BFF forwards the request to OCC via the occ_v2 destination,
 * returning the raw OCC basesites response.
 */
@Component({
  selector: 'cx-occ-base-sites',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <section
      style="padding: 1.5rem; font-family: system-ui, sans-serif; max-width: 800px;"
    >
      <h2>OCC Base Sites (via BFF)</h2>
      <p style="color: #555; font-size: .9rem;">
        Calls <code>occ.getBaseSites</code> on the BFF, which proxies to
        <code>GET /occ/v2/basesites</code> on the OCC backend.
      </p>

      <button
        (click)="load()"
        [disabled]="loading()"
        style="padding: .4rem 1rem; background: #0070c8; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
      >
        {{ loading() ? 'Loading…' : 'Load Base Sites' }}
      </button>

      @if (error(); as e) {
        <p style="color: #b00020; margin-top: 1rem;">Error: {{ e }}</p>
      }

      @if (result() !== null) {
        <pre
          style="background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow: auto; font-size: .8rem; margin-top: 1rem;"
          >{{ result() | json }}</pre
        >
      }
    </section>
  `,
})
export class OccBaseSitesComponent {
  private readonly bff = inject(BffHttpService);
  private readonly trigger$ = new Subject<void>();

  readonly loading = signal(false);
  readonly result = signal<unknown>(null);
  readonly error = signal<string | null>(null);

  constructor() {
    this.trigger$
      .pipe(
        switchMap(() => this.bff.query('occ.getBaseSites')),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (res) => {
          this.result.set(res);
          this.loading.set(false);
        },
        error: (err: unknown) => {
          this.error.set(err instanceof Error ? err.message : String(err));
          this.loading.set(false);
        },
      });
  }

  load(): void {
    this.result.set(null);
    this.error.set(null);
    this.loading.set(true);
    this.trigger$.next();
  }
}
