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
      service.add(0);
      service.add(1);
      expect(service.nextPosition).toEqual(2);
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
      service.defaultHideMode = false;
      let result: number;
      service.add(1);
      service.add(2);
      service.add(0);
      service
        .getActiveView()
        .subscribe((view) => (result = view))
        .unsubscribe();

      expect(result).toEqual(2);
    });

    it('should add view with explicit hidden state', () => {
      let result: number;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(2);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should avoid explicit hidden state for first view', () => {
      let result: number;
      service.add(0, { hidden: true });
      service.add(1);
      service.add(2);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should activate last view if all view are added with visible state = true', () => {
      let result: number;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(2, { hidden: false });
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(2);
    });

    it('should activate first view if defaultHideMode = true', () => {
      service.defaultHideMode = true;
      let result: number;
      service.add(0);
      service.add(1);
      service.add(2);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should defaultHideMode set to true by default', () => {
      let result: number;
      service.add(0);
      service.add(1);
      service.add(2);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });

    it('should activate last view if defaultHideMode = false', () => {
      service.defaultHideMode = false;
      let result: number;
      service.add(0);
      service.add(1);
      service.add(2);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(2);
    });
  });

  describe('remove', () => {
    it('should change active after views are removed', () => {
      let result: number;

      service.add(0);
      service.add(1, { hidden: false });
      service.add(2);
      service.add(3);
      service.add(4);

      service.remove(4);
      service.remove(3);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should remove all subsequential views', () => {
      let result: number;
      service.updateSplitView(2);

      service.add(0);
      service.add(1);
      service.add(2);
      service.add(3);
      service.add(4, { hidden: false });

      service.remove(3);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(2);
    });

    it('should change the active view if the view is removed the same active when a the removed view does not effect the view', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(2);
      service.add(3);
      service.add(4, { hidden: false });

      service.remove(4);

      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(3);
    });

    it('should keep the same active when a the removed view does not effect the view', () => {
      let result: number;

      service.add(0);
      service.add(1);
      service.add(2);
      service.add(3);
      service.add(4);

      service.remove(4);

      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(0);
    });
  });

  describe('toggle()', () => {
    it('should add view during toggling if it was not added before', () => {
      spyOn(service, 'add');
      service.toggle(2);
      expect(service.add).toHaveBeenCalledWith(2, { hidden: false });
    });

    it('should change activeView after toggling', () => {
      let activeView: number;
      service.add(0);
      service.add(1);
      service.add(2);

      service.toggle(2);
      service
        .getActiveView()
        .subscribe((visible) => (activeView = visible))
        .unsubscribe();

      expect(activeView).toEqual(2);
    });

    it('should drop activeView for the position if it was already active', () => {
      let result: number;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(2);

      service.toggle(1);
      service
        .getActiveView()
        .subscribe((visible) => (result = visible))
        .unsubscribe();

      expect(result).toEqual(1);
    });

    it('should keep the activeView for the position if hide is forced', () => {
      let result: number;
      service.add(0);
      service.add(1, { hidden: false });
      service.add(2);

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
