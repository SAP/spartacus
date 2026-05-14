import { Subject } from 'rxjs';
import { MergingSubject } from './merging-subject';

describe('MergingSubject', () => {
  it('should allow for add, remove and subscribe', () => {
    const mergingSubject = new MergingSubject();

    const sourceA = new Subject();
    const sourceB = new Subject();

    const results1 = [];
    const results2 = [];
    let sub1 = mergingSubject.output$.subscribe((x) => results1.push(x));
    let sub2 = mergingSubject.output$.subscribe((x) => results2.push(x));

    expect(results1).toEqual([]);
    expect(results2).toEqual([]);

    // add source A
    mergingSubject.add(sourceA);
    sourceA.next('a1');
    sourceB.next('b1');
    expect(results1).toEqual(['a1']);
    expect(results2).toEqual(['a1']);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(false);

    // add source B
    mergingSubject.add(sourceB);
    sourceA.next('a2');
    sourceB.next('b2');
    expect(results1).toEqual(['a1', 'a2', 'b2']);
    expect(results2).toEqual(['a1', 'a2', 'b2']);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // remove source A
    mergingSubject.remove(sourceA);
    sourceA.next('a3');
    sourceB.next('b3');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3']);
    expect(results2).toEqual(['a1', 'a2', 'b2', 'b3']);
    expect(mergingSubject.has(sourceA)).toBe(false);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // remove source B
    mergingSubject.remove(sourceB);
    sourceA.next('a4');
    sourceB.next('b4');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3']);
    expect(results2).toEqual(['a1', 'a2', 'b2', 'b3']);
    expect(mergingSubject.has(sourceA)).toBe(false);
    expect(mergingSubject.has(sourceB)).toBe(false);

    // add again source A an source B
    mergingSubject.add(sourceA);
    mergingSubject.add(sourceB);
    sourceA.next('a5');
    sourceB.next('b5');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5']);
    expect(results2).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5']);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // unsubscribe results1
    sub1.unsubscribe();
    sourceA.next('a6');
    sourceB.next('b6');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5']);
    expect(results2).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5', 'a6', 'b6']);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // unsubscribe results2
    sub2.unsubscribe();
    sourceA.next('a7');
    sourceB.next('b7');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5']);
    expect(results2).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5', 'a6', 'b6']);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // re-subscribe results1 and results2
    sub1 = mergingSubject.output$.subscribe((x) => results1.push(x));
    sub2 = mergingSubject.output$.subscribe((x) => results2.push(x));
    sourceA.next('a8');
    sourceB.next('b8');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5', 'a8', 'b8']);
    expect(results2).toEqual([
      'a1',
      'a2',
      'b2',
      'b3',
      'a5',
      'b5',
      'a6',
      'b6',
      'a8',
      'b8',
    ]);
    expect(mergingSubject.has(sourceA)).toBe(true);
    expect(mergingSubject.has(sourceB)).toBe(true);

    // cleanup all
    mergingSubject.remove(sourceA);
    mergingSubject.remove(sourceB);
    sub1.unsubscribe();
    sub2.unsubscribe();
    sourceA.next('a9');
    sourceB.next('b9');
    expect(results1).toEqual(['a1', 'a2', 'b2', 'b3', 'a5', 'b5', 'a8', 'b8']);
    expect(results2).toEqual([
      'a1',
      'a2',
      'b2',
      'b3',
      'a5',
      'b5',
      'a6',
      'b6',
      'a8',
      'b8',
    ]);
    expect(mergingSubject.has(sourceA)).toBe(false);
    expect(mergingSubject.has(sourceB)).toBe(false);
  });
});
