import { TestBed } from '@angular/core/testing';
import { SplitViewService } from './split-view.service';

const POSITION_TWO = 2;
const EXPECTED_POSITION = 2;

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
      expect(service.generateNextPosition()).toEqual(EXPECTED_POSITION);
    });
  });

  describe('add() and remove()', () => {
    it('should add 3 views', () => {
      const EXPECTED_POS = 3;
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POS);
    });

    it('should resolve 2 for visibleViewCount$ when one view is added with hide state', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should observe 2 visibleViewCount$ when 5 views are added and 2 are removed', () => {
      let result: number;
      const EXPECTED_POS = 3;
      const POSITION_THREE = 3;
      const POSITION_FOUR = 4;
      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);
      service.add(POSITION_THREE);
      service.add(POSITION_FOUR);

      service.remove(POSITION_FOUR);
      service.remove(POSITION_THREE);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POS);
    });
  });

  describe('toggle()', () => {
    it('should add view if it doesnt exist in views array', () => {
      spyOn(service, 'add');
      service.toggle(POSITION_TWO);
      expect(service.add).toHaveBeenCalledWith(POSITION_TWO, false);
    });

    it('should resolve last value for visibleViewCount$ when forced false toggled before', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);

      service.toggle(1, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should resolve 2 for visibleViewCount$ when one view toggled', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);

      service.toggle(POSITION_TWO);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should observe 3 visibleViewCount$ when a visible view is toggled with false', () => {
      let result: number;
      const EXPECTED_POS = 3;
      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);

      service.toggle(POSITION_TWO, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POS);
    });

    it('should observe 2 visibleViewCount$ when a hidden view is toggled with true', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO, true);

      service.toggle(POSITION_TWO, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should keep visibleViewCount$ after toggling hide state', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);

      service.toggle(POSITION_TWO);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should cascade hide state for upcoming views', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(POSITION_TWO);

      service.toggle(1);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });
  });
});
