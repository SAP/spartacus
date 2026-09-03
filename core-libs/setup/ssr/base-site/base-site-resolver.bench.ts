/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — performance benchmark harness.
 *
 * How to run — from the Spartacus workspace root (the directory that contains
 * `core-libs/` and `projects/`; in this spike the worktree root
 * `spartacus-approach-a/`):
 *
 *   Mock-only scenarios (concurrency-cap + slow-occ) — no backend needed:
 *     npx ts-node \
 *       --project core-libs/setup/ssr/base-site/tsconfig.bench.json \
 *       core-libs/setup/ssr/base-site/base-site-resolver.bench.ts
 *
 *   Full run incl. per-call + concurrent against a real OCC backend:
 *     NODE_TLS_REJECT_UNAUTHORIZED=0 \
 *     CX_BASE_URL=https://your-backend:9002 \
 *     BENCH_REQUEST_URL=https://your-backend:9002/electronics-spa/en/USD/ \
 *     npx ts-node \
 *       --project core-libs/setup/ssr/base-site/tsconfig.bench.json \
 *       core-libs/setup/ssr/base-site/base-site-resolver.bench.ts
 *
 *   Notes:
 *   - `--project tsconfig.bench.json` scopes the compile to the 3 resolver files
 *     (CommonJS, skipLibCheck) so ts-node runs without the full app tsconfig.
 *   - `NODE_TLS_REJECT_UNAUTHORIZED=0` is only for self-signed test backends;
 *     never set it in production.
 *
 * Switch approach by swapping the resolver import block below (same as server.ts).
 *
 * The resolver caches base sites for `cacheTtlMs` (default 60 s). Concurrent
 * cache-miss requests share a single OCC fetch (`initPromise` dedup). The
 * per-call scenario therefore measures cache-warm latency (sub-millisecond
 * regex match) after the first call; cache-miss latency equals the OCC
 * round-trip plus regex matching.
 *
 * Required env vars:
 *   CX_BASE_URL=https://your-backend.com                (real OCC backend)
 *   BENCH_REQUEST_URL=https://your-storefront.com/en/   (URL to resolve)
 *   MOCK_OCC_PORT=9999                                  (optional: mock slow OCC port)
 *
 * Scenarios:
 *   concurrency-cap — fire (cap + extra) simultaneous resolves at a slow mock;
 *                     asserts the extras fail fast with ConcurrencyLimitError
 *   slow-occ        — resolve() against a mock that delays past the timeout;
 *                     asserts it throws OccUnavailableError within the timeout
 *   per-call        — resolve() latency over N iterations (each a full OCC call)
 *   concurrent      — 10 parallel resolve() calls, 3 batches
 *
 * concurrency-cap and slow-occ use local mocks — run without CX_BASE_URL.
 * per-call and concurrent require a real OCC backend (CX_BASE_URL).
 */

/* webpackIgnore: true */
import * as http from 'node:http';
import { performance } from 'node:perf_hooks';
import {
  BaseSiteResolver,
  BaseSiteResolverConfig,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

// ─── config ────────────────────────────────────────────────────────────────

const OCC_BASE_URL = process.env['CX_BASE_URL'] ?? '';
const REQUEST_URL =
  process.env['BENCH_REQUEST_URL'] ?? 'http://localhost:4000/en/';
const MOCK_OCC_PORT = process.env['MOCK_OCC_PORT']
  ? Number(process.env['MOCK_OCC_PORT'])
  : null;

import { PureNodeBaseSiteResolver } from './pure-node-base-site-resolver';
const APPROACH_LABEL = 'pure-node';
function makeResolver(config: BaseSiteResolverConfig): BaseSiteResolver {
  return new PureNodeBaseSiteResolver(config);
}

// ─── statistics ─────────────────────────────────────────────────────────────

function stats(samples: number[]): {
  mean: number;
  p50: number;
  p95: number;
  p99: number;
  max: number;
} {
  const sorted = [...samples].sort((a, b) => a - b);
  const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
  const pct = (p: number) =>
    sorted[Math.floor((p / 100) * sorted.length)] ?? sorted[sorted.length - 1];
  return {
    mean,
    p50: pct(50),
    p95: pct(95),
    p99: pct(99),
    max: sorted[sorted.length - 1],
  };
}

function fmt(n: number): string {
  return n.toFixed(2).padStart(8);
}

function printStats(label: string, samples: number[]): void {
  const s = stats(samples);
  console.log(
    `  ${label.padEnd(20)} mean=${fmt(s.mean)} ms  p50=${fmt(s.p50)} ms  p95=${fmt(s.p95)} ms  p99=${fmt(s.p99)} ms  max=${fmt(s.max)} ms`
  );
}

// ─── mock OCC server ────────────────────────────────────────────────────────

const MOCK_BODY = JSON.stringify({
  baseSites: [{ uid: 'mock-site', urlPatterns: ['(?i)^https?://.*'] }],
});

interface MockOccServer {
  server: http.Server;
  getCallCount: () => number;
}

function startMockOccServer(port: number, delayMs: number): MockOccServer {
  let callCount = 0;
  const server = http.createServer((_req, res) => {
    callCount++;
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(MOCK_BODY);
    }, delayMs);
  });
  server.listen(port);
  return { server, getCallCount: () => callCount };
}

async function startEphemeralMockOccServer(
  delayMs: number
): Promise<MockOccServer & { port: number }> {
  let callCount = 0;
  const server = http.createServer((_req, res) => {
    callCount++;
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(MOCK_BODY);
    }, delayMs);
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as { port: number };
  return { server, port, getCallCount: () => callCount };
}

// ─── scenarios ──────────────────────────────────────────────────────────────

async function scenarioConcurrencyCap(
  cap: number,
  extra: number
): Promise<{ resolved: number; shed: number; occCallCount: number }> {
  // Mock holds each call open long enough that all resolves overlap, filling
  // the in-flight counter before any completes.
  const mock = await startEphemeralMockOccServer(200);
  const resolver = makeResolver({
    occBaseUrl: `http://localhost:${mock.port}`,
    timeoutMs: 3000,
    maxConcurrentOccCalls: cap,
  });

  const outcomes = await Promise.allSettled(
    Array.from({ length: cap + extra }, () => resolver.resolve(REQUEST_URL))
  );
  const resolved = outcomes.filter((o) => o.status === 'fulfilled').length;
  const shed = outcomes.filter(
    (o) =>
      o.status === 'rejected' &&
      (o as PromiseRejectedResult).reason instanceof ConcurrencyLimitError
  ).length;

  await new Promise<void>((resolve) => mock.server.close(() => resolve()));
  return { resolved, shed, occCallCount: mock.getCallCount() };
}

async function scenarioSlowOcc(
  occBaseUrl: string,
  resolverTimeoutMs: number
): Promise<{ threw: boolean; elapsed: number }> {
  const resolver = makeResolver({ occBaseUrl, timeoutMs: resolverTimeoutMs });
  const t0 = performance.now();
  let threw = false;
  try {
    await resolver.resolve(REQUEST_URL);
  } catch (err) {
    threw = err instanceof OccUnavailableError;
  }
  return { threw, elapsed: performance.now() - t0 };
}

async function scenarioPerCall(
  resolver: BaseSiteResolver,
  iterations: number
): Promise<number[]> {
  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    await resolver.resolve(REQUEST_URL);
    samples.push(performance.now() - t0);
  }
  return samples;
}

async function scenarioConcurrent(
  resolver: BaseSiteResolver,
  concurrency: number,
  batches: number
): Promise<number[]> {
  const samples: number[] = [];
  for (let b = 0; b < batches; b++) {
    const t0 = performance.now();
    await Promise.all(
      Array.from({ length: concurrency }, () => resolver.resolve(REQUEST_URL))
    );
    samples.push(performance.now() - t0);
  }
  return samples;
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\n${'═'.repeat(72)}`);
  console.log(`  BASE-SITE RESOLVER BENCHMARK (cacheless)`);
  console.log(`  Approach : ${APPROACH_LABEL}`);
  console.log(`  OCC URL  : ${OCC_BASE_URL || '(not set — will fail)'}`);
  console.log(`  Req URL  : ${REQUEST_URL}`);
  console.log(`${'═'.repeat(72)}\n`);

  // ── Scenario: concurrency cap (mock — no CX_BASE_URL needed) ──────────────
  console.log('Scenario: concurrency-cap (cap 10, fire 15 concurrent)\n');
  const capResult = await scenarioConcurrencyCap(10, 5);
  const capPass = capResult.resolved === 10 && capResult.shed === 5;
  console.log(
    `  resolved: ${capResult.resolved}  shed(ConcurrencyLimitError): ${capResult.shed}  OCC calls: ${capResult.occCallCount}  cap: ${capPass ? 'PASS' : 'FAIL — expected 10 resolved / 5 shed'}`
  );
  if (!capPass) {
    process.exitCode = 1;
  }

  // ── Scenario: slow OCC (mock — no CX_BASE_URL needed) ─────────────────────
  console.log('\nScenario: slow-occ (mock 4 s delay, resolver timeout 3 s)\n');
  {
    const port = MOCK_OCC_PORT ?? 9999;
    const { server: mockServer } = startMockOccServer(port, 4000);
    const result = await scenarioSlowOcc(`http://localhost:${port}`, 3000);
    const slowPass = result.threw && result.elapsed < 3500;
    console.log(
      `  resolve: ${result.elapsed.toFixed(1)} ms  threw OccUnavailableError: ${result.threw ? 'PASS' : 'FAIL — expected timeout error'}`
    );
    if (!slowPass) {
      process.exitCode = 1;
    }
    mockServer.close();
  }

  if (!OCC_BASE_URL) {
    console.log(
      '\nINFO: CX_BASE_URL not set — scenarios per-call / concurrent skipped.'
    );
    console.log(
      '      Set CX_BASE_URL=https://your-backend.com BENCH_REQUEST_URL=https://storefront.com/en/ and re-run.\n'
    );
  } else {
    const resolver = makeResolver({ occBaseUrl: OCC_BASE_URL, timeoutMs: 3000 });

    // ── Scenario: per-call latency (each = full OCC fetch) ──────────────────
    console.log('\nScenario: per-call (100 iterations, each a fresh OCC call)\n');
    const perCallSamples = await scenarioPerCall(resolver, 100);
    printStats('per-call', perCallSamples);

    // ── Scenario: concurrent ────────────────────────────────────────────────
    console.log('\nScenario: concurrent (10 × resolve, 3 batches)\n');
    const concurrentSamples = await scenarioConcurrent(resolver, 10, 3);
    printStats('concurrent-batch', concurrentSamples);
  }

  console.log(`\n${'═'.repeat(72)}`);
  console.log('  Done. Copy numbers into ADR section 6 (Performance numbers).');
  console.log(`${'═'.repeat(72)}\n`);
}

main().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});
