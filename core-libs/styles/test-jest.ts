/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// sass-true uses @prettier/sync, whose worker can retain an open MessagePort.
// Keep the real formatter and dispose its workers after the Sass assertions.
jest.mock('node:worker_threads', () => {
  const threads = jest.requireActual('node:worker_threads');
  const workers = [];

  globalThis.afterAll(async () => {
    await Promise.all(workers.map((worker) => worker.terminate()));
  });

  return {
    ...threads,
    Worker: class extends threads.Worker {
      constructor(filename, options) {
        super(filename, options);
        workers.push(this);
      }
    },
  };
});
