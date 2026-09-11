/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — performance benchmark harness.
 *
 * Run with: npx ts-node core-libs/setup/ssr/site-context/base-site-resolver.bench.ts
 *
 * Approach (b): createApplication() is CACHELESS — every resolve() boots a
 * fresh Angular app and fetches base-sites from OCC. There is no warm cache, so
 * the scenarios mirror approach (a): per-call latency, concurrent batches, and
 * slow-OCC timeout. This makes the numbers directly comparable (like-for-like).
 *
 * Required env vars:
 *   CX_BASE_URL=https://your-backend.com
 *   BENCH_REQUEST_URL=https://your-storefront.com/en/   (URL to resolve)
 *   MOCK_OCC_PORT=9999                                  (optional: mock slow OCC port)
 *
 * Scenarios:
 *   per-call    — N sequential resolve() calls, each a full boot + OCC fetch
 *   concurrent  — 10 parallel resolve() calls, 3 batches; also stresses the
 *                 platform-server singleton (renderApplication() collisions)
 *   slow-occ    — resolve() against a mock 4 s OCC with a 3 s timeout; asserts
 *                 it throws OccUnavailableError (mapped to 503 by the handler)
 *
 * Scenario slow-occ uses a local mock — runs without CX_BASE_URL.
 * Scenarios per-call / concurrent require a real OCC backend (CX_BASE_URL).
 */

/* webpackIgnore: true */
import 'reflect-metadata';
import * as http from 'node:http';
import { performance } from 'node:perf_hooks';
import {
  BaseSiteResolver,
  BaseSiteResolverConfig,
  ConcurrencyLimitError,
} from './base-site-resolver';

// ─── config ────────────────────────────────────────────────────────────────

const OCC_BASE_URL = process.env['CX_BASE_URL'] ?? '';
const REQUEST_URL =
  process.env['BENCH_REQUEST_URL'] ?? 'http://localhost:4000/en/';
const MOCK_OCC_PORT = process.env['MOCK_OCC_PORT']
  ? Number(process.env['MOCK_OCC_PORT'])
  : null;

import { AngularAppBaseSiteResolver } from './angular-app-base-site-resolver';
const APPROACH_LABEL = 'create-application (cacheless)';
function makeResolver(config: BaseSiteResolverConfig): BaseSiteResolver {
  return new AngularAppBaseSiteResolver(config);
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

function startMockOccServer(port: number, delayMs: number): http.Server {
  const server = http.createServer((_req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(MOCK_BODY);
    }, delayMs);
  });
  server.listen(port);
  return server;
}

async function startEphemeralMockOccServer(
  delayMs: number
): Promise<{ server: http.Server; port: number }> {
  const server = http.createServer((_req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(MOCK_BODY);
    }, delayMs);
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as { port: number };
  return { server, port };
}

// ─── scenarios ──────────────────────────────────────────────────────────────

async function scenarioConcurrencyCap(
  cap: number,
  extra: number
): Promise<{ resolved: number; shed: number }> {
  // A slow mock keeps the first render open long enough that the extra calls
  // arrive while inFlight is at the cap, so they are shed fail-fast.
  const mock = await startEphemeralMockOccServer(200);
  const resolver = makeResolver({
    occBaseUrl: `http://localhost:${mock.port}`,
    timeoutMs: 5000,
    maxConcurrentOccCalls: cap,
  });
  await resolver.initialize();

  const outcomes = await Promise.allSettled(
    Array.from({ length: cap + extra }, () => resolver.resolve(REQUEST_URL))
  );
  const resolved = outcomes.filter((o) => o.status === 'fulfilled').length;
  const shed = outcomes.filter(
    (o) =>
      o.status === 'rejected' &&
      (o as PromiseRejectedResult).reason instanceof ConcurrencyLimitError
  ).length;

  await resolver.destroy();
  await new Promise<void>((resolve) => mock.server.close(() => resolve()));
  return { resolved, shed };
}

async function scenarioPerCall(
  resolver: BaseSiteResolver,
  iterations: number
): Promise<number[]> {
  await resolver.initialize();
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
): Promise<{ batchSamples: number[]; failures: number }> {
  await resolver.initialize();
  const batchSamples: number[] = [];
  let failures = 0;
  for (let b = 0; b < batches; b++) {
    const t0 = performance.now();
    const results = await Promise.allSettled(
      Array.from({ length: concurrency }, () => resolver.resolve(REQUEST_URL))
    );
    failures += results.filter((r) => r.status === 'rejected').length;
    batchSamples.push(performance.now() - t0);
  }
  return { batchSamples, failures };
}

async function scenarioSlowOcc(
  occBaseUrl: string,
  resolverTimeoutMs: number
): Promise<{ threw: boolean; errorName: string; elapsed: number }> {
  const resolver = makeResolver({ occBaseUrl, timeoutMs: resolverTimeoutMs });
  await resolver.initialize();
  const t0 = performance.now();
  let threw = false;
  let errorName = '';
  try {
    await resolver.resolve(REQUEST_URL);
  } catch (err) {
    threw = true;
    errorName = (err as Error).name;
  }
  const elapsed = performance.now() - t0;
  await resolver.destroy();
  return { threw, errorName, elapsed };
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\n${'═'.repeat(72)}`);
  console.log(`  BASE-SITE RESOLVER BENCHMARK`);
  console.log(`  Approach : ${APPROACH_LABEL}`);
  console.log(`  OCC URL  : ${OCC_BASE_URL || '(not set — will fail)'}`);
  console.log(`  Req URL  : ${REQUEST_URL}`);
  console.log(`${'═'.repeat(72)}\n`);

  // ── concurrency cap (mock — no CX_BASE_URL needed) ───────────────────────
  console.log('Scenario concurrency-cap (cap 1, fire 5 concurrent)\n');
  const capResult = await scenarioConcurrencyCap(1, 4);
  const capPass = capResult.resolved === 1 && capResult.shed === 4;
  console.log(
    `  resolved: ${capResult.resolved}  shed(ConcurrencyLimitError): ${capResult.shed}  cap: ${capPass ? 'PASS' : 'FAIL — expected 1 resolved / 4 shed'}`
  );
  if (!capPass) {
    process.exitCode = 1;
  }

  // ── slow OCC (mock — no CX_BASE_URL needed) ──────────────────────────────
  console.log('\nScenario slow-occ (mock 4 s OCC, resolver timeout 3 s)\n');
  {
    const port = MOCK_OCC_PORT ?? 9999;
    const mockServer = startMockOccServer(port, 4000);
    const result = await scenarioSlowOcc(`http://localhost:${port}`, 3000);
    const pass = result.threw && result.errorName === 'OccUnavailableError';
    console.log(
      `  resolve: ${result.elapsed.toFixed(1)} ms  threw: ${result.errorName || 'none'}  timeout-503: ${pass ? 'PASS' : 'FAIL — expected OccUnavailableError'}`
    );
    if (!pass) {
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

    // ── per-call (each resolve = full boot + OCC fetch) ──────────────────────
    console.log('\nScenario per-call (100 iterations)\n');
    const perCallSamples = await scenarioPerCall(resolver, 100);
    printStats('per-call', perCallSamples);

    // ── concurrent — probes the platform-server singleton ────────────────────
    // Raise the cap so renders actually overlap; the default cap of 1 would
    // shed them fail-fast before they reach the singleton. Rejections here are
    // the platform-singleton collisions the ADR flags as an unknown.
    console.log('\nScenario concurrent (10 × resolve, 3 batches, cap raised)\n');
    const concurrentResolver = makeResolver({
      occBaseUrl: OCC_BASE_URL,
      timeoutMs: 3000,
      maxConcurrentOccCalls: 10,
    });
    const { batchSamples, failures } = await scenarioConcurrent(
      concurrentResolver,
      10,
      3
    );
    printStats('concurrent-batch', batchSamples);
    console.log(
      `  rejected resolves: ${failures} / 30  ${failures > 0 ? '⚠ platform-singleton collisions under overlap' : '(no collisions observed)'}`
    );
    await concurrentResolver.destroy();

    await resolver.destroy();
  }

  console.log(`\n${'═'.repeat(72)}`);
  console.log('  Done. Copy numbers into ADR §5 (performance).');
  console.log(`${'═'.repeat(72)}\n`);
}

main().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});
