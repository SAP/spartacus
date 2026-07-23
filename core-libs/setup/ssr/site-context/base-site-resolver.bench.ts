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
 * Switch approach by commenting/uncommenting ONE resolver block below (same as server.ts).
 *
 * Required env vars:
 *   CX_BASE_URL=https://your-backend.com
 *   BENCH_REQUEST_URL=https://your-storefront.com/en/   (URL to resolve)
 *   MOCK_OCC_PORT=9999                                  (optional: use mock slow OCC server)
 *
 * Scenarios:
 *   cold-start   — time for initialize() including OCC fetch
 *   warm-resolve — time for resolve() after initialize() (cache hit), 100 iterations
 *   concurrent   — 10 parallel resolve() calls, 3 batches
 *   slow-occ     — initialize() against a mock server that delays 4 s response
 *
 * Note: Approach (c) Angular-native runs inside the Angular SSR pipeline and cannot
 * be benchmarked here. Measure it via Angular SSR render time with approach (c) active.
 */

/* webpackIgnore: true */
import * as http from 'node:http';
import { performance } from 'node:perf_hooks';
import { BaseSiteResolver, BaseSiteResolverConfig } from './base-site-resolver';

// ─── config ────────────────────────────────────────────────────────────────

const OCC_BASE_URL = process.env['CX_BASE_URL'] ?? '';
const REQUEST_URL =
  process.env['BENCH_REQUEST_URL'] ?? 'http://localhost:4000/en/';
const MOCK_OCC_PORT = process.env['MOCK_OCC_PORT']
  ? Number(process.env['MOCK_OCC_PORT'])
  : null;

// ── Approach (a): Pure Node ───────────────────────────────────────────────────
import { PureNodeBaseSiteResolver } from './pure-node-base-site-resolver';
const APPROACH_LABEL = 'pure-node';
function makeResolver(config: BaseSiteResolverConfig): BaseSiteResolver {
  return new PureNodeBaseSiteResolver(config);
}

// ── Approach (b): createApplication() ────────────────────────────────────────
// import { AngularAppBaseSiteResolver } from './angular-app-base-site-resolver';
// const APPROACH_LABEL = 'create-application';
// function makeResolver(config: BaseSiteResolverConfig): BaseSiteResolver {
//   return new AngularAppBaseSiteResolver(config);
// }

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
  const pct = (p: number) => sorted[Math.floor((p / 100) * sorted.length)] ?? sorted[sorted.length - 1];
  return { mean, p50: pct(50), p95: pct(95), p99: pct(99), max: sorted[sorted.length - 1] };
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

// ─── mock slow OCC server ───────────────────────────────────────────────────

function startMockOccServer(port: number, delayMs: number): http.Server {
  const mockBody = JSON.stringify({
    baseSites: [
      {
        uid: 'mock-site',
        urlPatterns: ['(?i)^https?://.*'],
      },
    ],
  });

  const server = http.createServer((_req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(mockBody);
    }, delayMs);
  });

  server.listen(port);
  return server;
}

// ─── scenarios ──────────────────────────────────────────────────────────────

async function scenarioColdStart(resolver: BaseSiteResolver): Promise<number> {
  await resolver.destroy();
  const t0 = performance.now();
  await resolver.initialize();
  return performance.now() - t0;
}

async function scenarioWarmResolve(
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
): Promise<number[]> {
  await resolver.initialize();
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

async function scenarioSlowOcc(
  occBaseUrl: string,
  _serverDelayMs: number,
  resolverTimeoutMs: number
): Promise<{ timedOut: boolean; elapsed: number }> {
  const resolver = makeResolver({
    occBaseUrl,
    timeoutMs: resolverTimeoutMs,
  });
  const t0 = performance.now();
  await resolver.initialize();
  const elapsed = performance.now() - t0;
  const timedOut = elapsed >= resolverTimeoutMs * 0.9;
  await resolver.destroy();
  return { timedOut, elapsed };
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\n${'═'.repeat(72)}`);
  console.log(`  BASE-SITE RESOLVER BENCHMARK`);
  console.log(`  Approach : ${APPROACH_LABEL}`);
  console.log(`  OCC URL  : ${OCC_BASE_URL || '(not set — will fail)'}`);
  console.log(`  Req URL  : ${REQUEST_URL}`);
  console.log(`${'═'.repeat(72)}\n`);

  if (!OCC_BASE_URL) {
    console.error('ERROR: CX_BASE_URL is not set. Export it before running the benchmark.');
    process.exit(1);
  }

  const resolver = makeResolver({
    occBaseUrl: OCC_BASE_URL,
    timeoutMs: 3000,
    cacheTtlMs: 60_000,
  });

  // ── Scenario 1: cold start ─────────────────────────────────────────────────
  console.log('Scenario 1: cold-start (5 iterations)\n');
  const coldSamples: number[] = [];
  for (let i = 0; i < 5; i++) {
    const ms = await scenarioColdStart(resolver);
    coldSamples.push(ms);
    console.log(`  run ${i + 1}: ${ms.toFixed(1)} ms`);
  }
  printStats('cold-start', coldSamples);

  // ── Scenario 2: warm resolve ───────────────────────────────────────────────
  console.log('\nScenario 2: warm resolve (100 iterations)\n');
  const warmSamples = await scenarioWarmResolve(resolver, 100);
  printStats('warm-resolve', warmSamples);

  // ── Scenario 3: concurrent ─────────────────────────────────────────────────
  console.log('\nScenario 3: concurrent (10 × resolve, 3 batches)\n');
  const concurrentSamples = await scenarioConcurrent(resolver, 10, 3);
  printStats('concurrent-batch', concurrentSamples);

  await resolver.destroy();

  // ── Scenario 4: slow OCC ───────────────────────────────────────────────────
  console.log('\nScenario 4: slow OCC (mock server 4 s delay, resolver timeout 3 s)\n');
  if (MOCK_OCC_PORT) {
    const mockServer = startMockOccServer(MOCK_OCC_PORT, 4000);
    const mockBaseUrl = `http://localhost:${MOCK_OCC_PORT}`;
    const result = await scenarioSlowOcc(mockBaseUrl, 4000, 3000);
    console.log(
      `  elapsed: ${result.elapsed.toFixed(1)} ms  timed-out: ${result.timedOut}`
    );
    mockServer.close();
  } else {
    console.log(
      '  Skipped — set MOCK_OCC_PORT=<port> to enable (e.g. MOCK_OCC_PORT=9999)'
    );
  }

  console.log(`\n${'═'.repeat(72)}`);
  console.log('  Done. Copy numbers into ADR section 6 (Performance numbers).');
  console.log(`${'═'.repeat(72)}\n`);
}

main().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});
