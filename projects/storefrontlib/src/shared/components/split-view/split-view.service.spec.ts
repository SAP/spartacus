import { TestBed } from '@angular/core/testing';
import { SplitViewService } from './split-view.service';
import { SplitViewState } from './split/split-view.model';

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

  describe('nextPosition', () => {
    it('should return 0 for the next view number', () => {
      expect(service.nextPosition).toEqual(0);
    });

    it('should return 2 for the next view number', () => {
      const EXPECTED_POSITION = 2;
      service.add(0);
      service.add(1);
      expect(service.nextPosition).toEqual(EXPECTED_POSITION);
    });

    it('should return 1 for the next view number', () => {
      service.add(0);
      service.add(1);
      service.remove(1);
      expect(service.nextPosition).toEqual(1);
    });

    it('should return nextPosition "0" when the first position is removed', () => {
      service.add(0);
      service.add(1);
      service.remove(0);
      expect(service.nextPosition).toEqual(0);
    });
  });

  describe('add', () => {
    it('should add a new view', () => {
      let result: number;
      service.add(0);
      service
        .getActiveView()
        .subscribe((view) => (result = view))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should add 2 new visible views', () => {
      service.defaultHideMode = false;
      let result: number;
      service.add(0);
      service.add(1);
      service
        .getActiveView()
        .subscribe((view) => (result = view))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should add views in random order', () => {
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.defaultHideMode = false;
      let result: number;
      service.add(1);
      service.add(INPUT_POSITION);
      service.add(0);
      service
        .getActiveView()
        .subscribe((view) => (result = view))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should add view with explicit hidden state', () => {
      const INPUT_POSITION = 2;
      let result: number;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(INPUT_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should avoid explicit hidden state for first view', () => {
      let result: number;
      const INPUT_POSITION = 2;

      service.add(0, { hidden: true });
      service.add(1);
      service.add(INPUT_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should activate last view if all view are added with visible state = true', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1, { hidden: false });
      service.add(INPUT_POSITION, { hidden: false });
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should activate first view if defaultHideMode = true', () => {
      service.defaultHideMode = true;
      let result: number;
      const INPUT_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should defaultHideMode set to true by default', () => {
      let result: number;
      const INPUT_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should activate last view if defaultHideMode = false', () => {
      service.defaultHideMode = false;
      const TOGGLED_POSITION = 2;
      const EXPECTED_POSITION = 2;
      let result: number;
      service.add(0);
      service.add(1);
      service.add(TOGGLED_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });
  });

  describe('remove', () => {
    it('should change active after views are removed', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const INPUT_POSITION_ANOTHER = 3;
      const INPUT_POSITION_ADD = 4;

      service.add(0);
      service.add(1, { hidden: false });
      service.add(INPUT_POSITION);
      service.add(INPUT_POSITION_ANOTHER);
      service.add(INPUT_POSITION_ADD);

      service.remove(INPUT_POSITION_ADD);
      service.remove(INPUT_POSITION_ANOTHER);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should remove all subsequential views', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const INPUT_POSITION_ANOTHER = 3;
      const INPUT_POSITION_ADD = 4;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service.add(INPUT_POSITION_ANOTHER);
      service.add(INPUT_POSITION_ADD, { hidden: false });

      service.remove(INPUT_POSITION_ANOTHER);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should change the active view if the view is removed  the same active when a the removed view does not effect the view', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const INPUT_POSITION_ANOTHER = 3;
      const INPUT_POSITION_ADD = 4;
      const EXPECTED_POSITION = 3;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service.add(INPUT_POSITION_ANOTHER);
      service.add(INPUT_POSITION_ADD, { hidden: false });

      service.remove(INPUT_POSITION_ADD);

      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should keep the same active when a the removed view does not effect the view', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const INPUT_POSITION_ANOTHER = 3;
      const INPUT_POSITION_ADD = 4;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);
      service.add(INPUT_POSITION_ANOTHER);
      service.add(INPUT_POSITION_ADD);

      service.remove(INPUT_POSITION_ADD);

      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });
  });

  describe('toggle()', () => {
    it('should add view during toggling if it was not added before', () => {
      const TOGGLED_POSITION = 2;
      const EXPECTED_TIMES_CALLED = 2;
      spyOn(service, 'add');
      service.toggle(TOGGLED_POSITION);
      expect(service.add).toHaveBeenCalledWith(EXPECTED_TIMES_CALLED, {
        hidden: false,
      });
    });

    it('should change activeView after toggling', () => {
      let result: number;
      const INPUT_POSITION = 2;
      const TOGGLED_POSITION = 2;
      const EXPECTED_POSITION = 2;

      service.add(0);
      service.add(1);
      service.add(INPUT_POSITION);

      service.toggle(TOGGLED_POSITION);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(EXPECTED_POSITION);
    });

    it('should drop activeView for the position if it was already active', () => {
      let result: number;
      const INPUT_POSITION = 2;

      service.add(0);
      service.add(1, { hidden: false });
      service.add(INPUT_POSITION);

      service.toggle(1);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should keep the activeView for the position if hide is forced', () => {
      let result: number;
      const INPUT_POSITION = 2;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(INPUT_POSITION);

      service.toggle(1, false);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });
  });

  describe('view state', () => {
    it('should emit the ViewState for the position 0', () => {
      let result: SplitViewState;
      service.add(0);
      service
        .getViewState(0)
        .subscribe((state) => (result = state))
        .unsubscribe();

      expect(result).toEqual({ hidden: false });
    });

    it('should emit the ViewState for the position 1', () => {
      let result: SplitViewState;
      service.add(0);
      service.add(1, { hidden: true });
      service
        .getViewState(1)
        .subscribe((state) => (result = state))
        .unsubscribe();

      expect(result).toEqual({ hidden: true });
    });
  });
});
