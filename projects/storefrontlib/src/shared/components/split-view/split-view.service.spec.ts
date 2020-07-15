import { TestBed } from '@angular/core/testing';
import { SplitViewService } from './split-view.service';

const NUM_2 = 2;
const NUM_3 = 3;
const NUM_4 = 4;

describe('SplitViewService', () => {
  let service: SplitViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplitViewService],
    });
    service = TestBed.inject(SplitViewService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('nextViewNum()', () => {
    it('should return 0 for the next view number', () => {
      expect(service.generateNextPosition()).toEqual(0);
    });

    it('should return 3 for the next view number', () => {
      service.add(0);
      service.add(1);
      expect(service.generateNextPosition()).toEqual(NUM_2);
    });
  });

  describe('add() and remove()', () => {
    it('should add 3 views', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_3);
    });

    it('should resolve 2 for visibleViewCount$ when one view is added with hide state', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_2);
    });

    it('should observe 2 visibleViewCount$ when 5 views are added and 2 are removed', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);
      service.add(NUM_3);
      service.add(NUM_4);

      service.remove(NUM_4);
      service.remove(NUM_3);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_3);
    });
  });

  describe('toggle()', () => {
    it('should add view if it doesnt exist in views array', () => {
      spyOn(service, 'add');
      service.toggle(NUM_2);
      expect(service.add).toHaveBeenCalledWith(NUM_2, false);
    });

    it('should resolve last value for visibleViewCount$ when forced false toggled before', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);

      service.toggle(1, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_2);
    });

    it('should resolve 2 for visibleViewCount$ when one view toggled', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);

      service.toggle(NUM_2);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_2);
    });

    it('should observe 3 visibleViewCount$ when a visible view is toggled with false', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);

      service.toggle(NUM_2, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_3);
    });

    it('should observe 2 visibleViewCount$ when a hidden view is toggled with true', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2, true);

      service.toggle(NUM_2, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_2);
    });

    it('should keep visibleViewCount$ after toggling hide state', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);

      service.toggle(NUM_2);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(NUM_2);
    });

    it('should cascade hide state for upcoming views', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(NUM_2);

      service.toggle(1);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });
  });
});
