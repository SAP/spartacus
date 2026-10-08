/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { strict as assert } from 'node:assert';
import { AddressInfo } from 'node:net';
import { createServer, Server } from 'node:http';
import { performance } from 'node:perf_hooks';
import {
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { DefaultBaseSiteResolver } from './default-base-site-resolver';

const LOAD_ROUNDS = 10;
const WARMUP_ROUNDS = 10;
const COLD_SAMPLES = 20;
const WARM_SAMPLES = 100;
const CONCURRENCY_REQUESTS = 20;
const CONCURRENCY_LIMIT = 4;
const TIMEOUT_SAMPLES = 10;
const MEMORY_LIMIT_BYTES = 5 * 1024 * 1024;
const REQUEST_URL = 'https://storefront.example/electronics-spa/en/USD/';
const OCC_RESPONSE = JSON.stringify({
  baseSites: [
    {
      uid: 'electronics-spa',
      urlPatterns: ['.*electronics-spa.*'],
    },
  ],
});

interface ScenarioStatistics {
  samples: number;
  p50: number;
  p95: number;
  p99: number;
}

interface LoadRound {
  cold: ScenarioStatistics;
  warm: ScenarioStatistics;
  concurrencyLimit: ScenarioStatistics;
  timeout: ScenarioStatistics;
}

interface MockOccServer {
  baseUrl: string;
  close(): Promise<void>;
}

async function startMockOccServer(delayMs: number): Promise<MockOccServer> {
  const timers = new Set<NodeJS.Timeout>();
  const server = createServer((request, response) => {
    if (!request.url?.startsWith('/occ/v2/basesites?fields=FULL')) {
      response.statusCode = 404;
      response.end();
      return;
    }

    const sendResponse = () => {
      if (response.destroyed) {
        return;
      }
      response.setHeader('Content-Type', 'application/json');
      response.end(OCC_RESPONSE);
    };

    if (delayMs === 0) {
      sendResponse();
      return;
    }

    const timer = setTimeout(() => {
      timers.delete(timer);
      sendResponse();
    }, delayMs);
    timers.add(timer);
    response.once('close', () => {
      clearTimeout(timer);
      timers.delete(timer);
    });
  });

  await listen(server);
  const address = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    async close(): Promise<void> {
      for (const timer of timers) {
        clearTimeout(timer);
      }
      timers.clear();
      await closeServer(server);
    },
  };
}

function listen(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
    server.closeAllConnections();
  });
}

async function measureCold(baseUrl: string): Promise<ScenarioStatistics> {
  const durations: number[] = [];

  for (let index = 0; index < COLD_SAMPLES; index++) {
    const resolver = new DefaultBaseSiteResolver({ occBaseUrl: baseUrl });
    durations.push(
      await measure(async () => {
        assert.equal(await resolver.resolve(REQUEST_URL), 'electronics-spa');
      })
    );
  }

  return statistics(durations);
}

async function measureWarm(baseUrl: string): Promise<ScenarioStatistics> {
  const resolver = new DefaultBaseSiteResolver({ occBaseUrl: baseUrl });
  assert.equal(await resolver.resolve(REQUEST_URL), 'electronics-spa');
  const durations: number[] = [];

  for (let index = 0; index < WARM_SAMPLES; index++) {
    durations.push(
      await measure(async () => {
        assert.equal(await resolver.resolve(REQUEST_URL), 'electronics-spa');
      })
    );
  }

  return statistics(durations);
}

async function measureConcurrencyLimit(
  baseUrl: string
): Promise<ScenarioStatistics> {
  const resolver = new DefaultBaseSiteResolver({
    occBaseUrl: baseUrl,
    concurrencyLimit: CONCURRENCY_LIMIT,
    timeoutMs: 1_000,
  });

  const outcomes = await Promise.all(
    Array.from({ length: CONCURRENCY_REQUESTS }, async () => {
      const startedAt = performance.now();
      try {
        const baseSite = await resolver.resolve(REQUEST_URL);
        return { duration: performance.now() - startedAt, baseSite };
      } catch (error) {
        return { duration: performance.now() - startedAt, error };
      }
    })
  );

  const successes = outcomes.filter(
    (outcome) => outcome.baseSite === 'electronics-spa'
  );
  const shed = outcomes.filter(
    (outcome) => outcome.error instanceof ConcurrencyLimitError
  );
  assert.equal(successes.length, CONCURRENCY_LIMIT);
  assert.equal(shed.length, CONCURRENCY_REQUESTS - CONCURRENCY_LIMIT);
  assert.equal(successes.length + shed.length, CONCURRENCY_REQUESTS);

  return statistics(outcomes.map(({ duration }) => duration));
}

async function measureTimeout(baseUrl: string): Promise<ScenarioStatistics> {
  const durations: number[] = [];

  for (let index = 0; index < TIMEOUT_SAMPLES; index++) {
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: baseUrl,
      timeoutMs: 5,
    });
    durations.push(
      await measure(async () => {
        await assert.rejects(
          resolver.resolve(REQUEST_URL),
          OccUnavailableError
        );
      })
    );
  }

  return statistics(durations);
}

async function measure(operation: () => Promise<void>): Promise<number> {
  const startedAt = performance.now();
  await operation();
  return performance.now() - startedAt;
}

function statistics(durations: number[]): ScenarioStatistics {
  const sorted = [...durations].sort((left, right) => left - right);
  return {
    samples: sorted.length,
    p50: percentile(sorted, 50),
    p95: percentile(sorted, 95),
    p99: percentile(sorted, 99),
  };
}

function percentile(sorted: number[], value: number): number {
  const index = Math.max(0, Math.ceil((value / 100) * sorted.length) - 1);
  return sorted[index];
}

async function runLoadRound(
  immediateBaseUrl: string,
  concurrencyBaseUrl: string,
  timeoutBaseUrl: string
): Promise<LoadRound> {
  return {
    cold: await measureCold(immediateBaseUrl),
    warm: await measureWarm(immediateBaseUrl),
    concurrencyLimit: await measureConcurrencyLimit(concurrencyBaseUrl),
    timeout: await measureTimeout(timeoutBaseUrl),
  };
}

async function collectHeapUsage(): Promise<number> {
  const garbageCollect = (
    globalThis as typeof globalThis & {
      gc?: () => void;
    }
  ).gc;
  assert.ok(garbageCollect, 'Run the benchmark with Node --expose-gc');
  await new Promise<void>((resolve) => setImmediate(resolve));
  performance.clearResourceTimings();
  garbageCollect();
  await new Promise<void>((resolve) => setImmediate(resolve));
  garbageCollect();
  return process.memoryUsage().heapUsed;
}

function formatStatistics(name: string, value: ScenarioStatistics): string {
  return `${name}: samples=${value.samples} p50=${value.p50.toFixed(3)}ms p95=${value.p95.toFixed(3)}ms p99=${value.p99.toFixed(3)}ms`;
}

function mebibytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

async function main(): Promise<void> {
  const servers: MockOccServer[] = [];

  try {
    servers.push(await startMockOccServer(0));
    servers.push(await startMockOccServer(20));
    servers.push(await startMockOccServer(50));
    const [immediate, concurrency, timeout] = servers;

    process.stdout.write(
      `Warming all scenarios (${WARMUP_ROUNDS} rounds)...\n`
    );
    for (let round = 0; round < WARMUP_ROUNDS; round++) {
      await runLoadRound(
        immediate.baseUrl,
        concurrency.baseUrl,
        timeout.baseUrl
      );
    }
    const baselineHeap = await collectHeapUsage();
    const heapSamples: number[] = [];
    let latestStatistics: LoadRound | undefined;

    for (let round = 1; round <= LOAD_ROUNDS; round++) {
      latestStatistics = await runLoadRound(
        immediate.baseUrl,
        concurrency.baseUrl,
        timeout.baseUrl
      );
      const heapUsed = await collectHeapUsage();
      heapSamples.push(heapUsed);
      process.stdout.write(
        `round ${round}/${LOAD_ROUNDS}: heap=${mebibytes(heapUsed)}\n`
      );
    }

    assert.ok(latestStatistics);
    process.stdout.write(
      `${formatStatistics('cold', latestStatistics.cold)}\n`
    );
    process.stdout.write(
      `${formatStatistics('warm', latestStatistics.warm)}\n`
    );
    process.stdout.write(
      `${formatStatistics(
        'concurrency-limit',
        latestStatistics.concurrencyLimit
      )}\n`
    );
    process.stdout.write(
      `${formatStatistics('timeout', latestStatistics.timeout)}\n`
    );
    process.stdout.write(
      `memory: baseline=${mebibytes(baselineHeap)} samples=${heapSamples
        .map(mebibytes)
        .join(', ')}\n`
    );

    const finalHeap = heapSamples[heapSamples.length - 1];
    assert.ok(
      finalHeap <= baselineHeap + MEMORY_LIMIT_BYTES,
      `Final heap ${mebibytes(finalHeap)} exceeded baseline by more than 5 MiB`
    );

    const lastFive = heapSamples.slice(-5);
    const increasesMonotonically = lastFive.every(
      (sample, index) => index === 0 || sample > lastFive[index - 1]
    );
    assert.equal(
      increasesMonotonically,
      false,
      `Last five heap samples increased monotonically: ${lastFive
        .map(mebibytes)
        .join(', ')}`
    );
  } finally {
    for (const server of servers.reverse()) {
      await server.close();
    }
  }
}

void main().catch((error: unknown) => {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`
  );
  process.exitCode = 1;
});
