/* SPDX-License-Identifier: Apache-2.0 */
import { DestroyRef, PendingTasks } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { auditTime, debounceTime } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { bufferDebounceTime } from './buffer-debounce-time';
import { withPendingTask } from './with-pending-task';

describe('withPendingTask', () => {
  let active: number;
  let registrations: number;
  let pending: PendingTasks;
  let destroyed: boolean;
  let destroyRef: DestroyRef;
  let scheduler: TestScheduler;

  beforeEach(() => {
    active = registrations = 0;
    destroyed = false;
    pending = {
      add: () => {
        active++;
        registrations++;
        let released = false;
        return () => {
          if (!released) {
            active--;
            released = true;
          }
        };
      },
    } as PendingTasks;
    destroyRef = {
      get destroyed() {
        return destroyed;
      },
    } as DestroyRef;
    scheduler = new TestScheduler(() => {});
  });

  for (const mode of ['debounce', 'audit']) {
    it(`${mode}: tracks scheduling and releases after downstream receives data`, () => {
      const source = new Subject<string>();
      const values: string[] = [];
      source
        .pipe(
          withPendingTask(
            mode === 'debounce'
              ? debounceTime(5, scheduler)
              : auditTime(5, scheduler),
            pending,
            destroyRef
          )
        )
        .subscribe((value) => {
          expect(active).toBe(1);
          values.push(value);
        });
      source.next('first');
      source.next('last');
      expect(active).toBe(1);
      expect(registrations).toBe(1);
      scheduler.flush();
      expect(values).toEqual(['last']);
      expect(active).toBe(0);
    });
  }

  it('releases on error without requiring a nonempty result', () => {
    const source = new Subject<string>();
    const errors: unknown[] = [];
    source
      .pipe(withPendingTask(debounceTime(5, scheduler), pending, destroyRef))
      .subscribe({ error: (error) => errors.push(error) });
    source.next('pending');
    source.error('failed');
    scheduler.flush();
    expect(errors).toEqual(['failed']);
    expect(active).toBe(0);
  });

  it('releases an empty completion without registering work', () => {
    EMPTY.pipe(
      withPendingTask(debounceTime(5, scheduler), pending, destroyRef)
    ).subscribe();
    expect(registrations).toBe(0);
    expect(active).toBe(0);
  });

  it('preserves a normal completion flush while the injector is alive', () => {
    const source = new Subject<string>();
    const values: string[] = [];
    source
      .pipe(
        withPendingTask(bufferDebounceTime(5, scheduler), pending, destroyRef)
      )
      .subscribe((value) => values.push(...value));
    source.next('queued');
    source.complete();
    expect(values).toEqual(['queued']);
    expect(active).toBe(0);
  });

  it('drops the NgRx completion flush after injector destruction', () => {
    const source = new Subject<string>();
    const values: string[][] = [];
    source
      .pipe(
        withPendingTask(bufferDebounceTime(5, scheduler), pending, destroyRef)
      )
      .subscribe((value) => values.push(value));
    source.next('queued');
    destroyed = true;
    source.complete();
    scheduler.flush();
    expect(values).toEqual([]);
    expect(active).toBe(0);
  });

  it('drops a scheduled audit callback after injector destruction', () => {
    const source = new Subject<string>();
    const values: string[] = [];
    source
      .pipe(withPendingTask(auditTime(5, scheduler), pending, destroyRef))
      .subscribe((value) => values.push(value));
    source.next('queued');
    destroyed = true;
    scheduler.flush();
    expect(values).toEqual([]);
    expect(active).toBe(0);
  });

  it('cancels a batch and does not retain it on resubscription', () => {
    const source = new Subject<string>();
    const values: string[][] = [];
    const batched = source.pipe(
      withPendingTask(bufferDebounceTime(5, scheduler), pending, destroyRef)
    );
    const first = batched.subscribe((value) => values.push(value));
    source.next('cancelled');
    first.unsubscribe();
    expect(active).toBe(0);
    const second = batched.subscribe((value) => values.push(value));
    source.next('new');
    scheduler.flush();
    second.unsubscribe();
    expect(values).toEqual([['new']]);
    expect(active).toBe(0);
  });

  it('gives independent subscribers independent buffers', () => {
    const source = new Subject<string>();
    const a: string[][] = [];
    const b: string[][] = [];
    const batched = source.pipe(
      withPendingTask(bufferDebounceTime(5, scheduler), pending, destroyRef)
    );
    batched.subscribe((value) => a.push(value));
    batched.subscribe((value) => b.push(value));
    source.next('one');
    source.next('two');
    expect(active).toBe(2);
    scheduler.flush();
    expect(a).toEqual([['one', 'two']]);
    expect(b).toEqual(a);
    expect(active).toBe(0);
  });

  it('keeps a reentrant next batch pending', () => {
    const source = new Subject<string>();
    const values: string[] = [];
    source
      .pipe(withPendingTask(debounceTime(5, scheduler), pending, destroyRef))
      .subscribe((value) => {
        values.push(value);
        if (value === 'first') {
          source.next('second');
        }
      });
    source.next('first');
    scheduler.schedule(() => expect(active).toBe(1), 6);
    scheduler.flush();
    expect(values).toEqual(['first', 'second']);
    expect(registrations).toBe(2);
    expect(active).toBe(0);
  });

  it('does not subscribe or schedule work in an already destroyed injector', () => {
    const source = new Subject<string>();
    destroyed = true;
    source
      .pipe(withPendingTask(debounceTime(5, scheduler), pending, destroyRef))
      .subscribe();
    source.next('late');
    scheduler.flush();
    expect(source.observed).toBe(false);
    expect(registrations).toBe(0);
  });
});
