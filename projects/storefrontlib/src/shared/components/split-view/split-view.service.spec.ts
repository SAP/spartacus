import { TestBed } from '@angular/core/testing';
import { SplitViewService } from './split-view.service';

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
      const EXPECTED_POSITION = 2;
      service.add(0);
      service.add(1);
      expect(service.generateNextPosition()).toEqual(EXPECTED_POSITION);
    });
  });

  describe('add() and remove()', () => {
    it('should add 3 views', () => {
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 3;
      let result: number;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should resolve 2 for visibleViewCount$ when one view is added with hide state', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should observe 2 visibleViewCount$ when 5 views are added and 2 are removed', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 3;
      const POSITION_ADD = 3;
      const POSITION_ANOTHER_ADD = 4;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service.add(POSITION_ADD);
      service.add(POSITION_ANOTHER_ADD);

      service.remove(POSITION_ANOTHER_ADD);
      service.remove(POSITION_ADD);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });
  });

  describe('toggle()', () => {
    it('should add view if it doesnt exist in views array', () => {
      const TOGGLED_POSITION = 2;
      const EXPECTED_POSITION = 2;

      spyOn(service, 'add');
      service.toggle(TOGGLED_POSITION);
      expect(service.add).toHaveBeenCalledWith(EXPECTED_POSITION, false);
    });

    it('should resolve last value for visibleViewCount$ when forced false toggled before', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(1, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should resolve 2 for visibleViewCount$ when one view toggled', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const TOGGLED_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(TOGGLED_POSITION);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should observe 3 visibleViewCount$ when a visible view is toggled with false', () => {
      let result: number;
      const EXPECTED_POSITION = 3;
      const TOGGLED_POSITION = 2;
      const INPUT_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(TOGGLED_POSITION, false);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should observe 2 visibleViewCount$ when a hidden view is toggled with true', () => {
      let result: number;
      const TOGGLED_POSITION = 2;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION, true);

      service.toggle(TOGGLED_POSITION, true);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should keep visibleViewCount$ after toggling hide state', () => {
      let result: number;
      const TOGGLED_POSITION = 2;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(TOGGLED_POSITION);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should cascade hide state for upcoming views', () => {
      let result: number;
      const INPUT_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(1);
      service
        .visibleViewCount()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });
  });
});
