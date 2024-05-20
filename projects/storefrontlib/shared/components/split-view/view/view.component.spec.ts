import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import { ViewComponent } from './view.component';

class MockSplitViewService {
  nextPosition = 0;

  getActiveView() {
    return of(0);
  }

  generateNextPosition() {
    return 0;
  }
  visibleViewCount() {
    return of(5);
  }
  add() {}
  remove() {}
  toggle() {}

  getViewState() {
    return EMPTY;
  }
}

class MockGlobalMessageService {
  add() {}
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let service: SplitViewService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ViewComponent],
        providers: [
          { provide: SplitViewService, useClass: MockSplitViewService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        ],
      })
        .overrideComponent(ViewComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SplitViewService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(service, 'add').and.stub();
    spyOn(service, 'remove').and.stub();
    spyOn(service, 'toggle').and.stub();
    spyOn(globalMessageService, 'add').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add()', () => {
    it('should add view with position 0', () => {
      component.ngOnInit();
      expect(service.add).toHaveBeenCalledWith(0, {});
    });

    it('should add view with position 3', () => {
      component.position = '3';
      component.ngOnInit();
      expect(service.add).toHaveBeenCalledWith(3, {});
    });
  });

  describe('remove()', () => {
    it('should remove view with position 0', () => {
      component.ngOnDestroy();
      expect(service.remove).toHaveBeenCalledWith(0);
    });

    it('should remove view with position 0', () => {
      component.position = '3';
      component.ngOnInit();
      component.ngOnDestroy();
      expect(service.remove).toHaveBeenCalledWith(3);
    });
  });

  describe('toggle()', () => {
    it('should delegate toggle the view', () => {
      component.toggle();
      expect(service.toggle).toHaveBeenCalledWith(0, undefined);
    });

    it('should toggle view based on hidden state', () => {
      component.position = '5';
      component.hidden = true;
      expect(service.toggle).toHaveBeenCalledWith(5, true);
    });

    it('should force show', () => {
      component.position = '0';
      component.toggle(false);
      expect(service.toggle).toHaveBeenCalledWith(0, false);
    });

    it('should force hide', () => {
      component.position = '0';
      component.toggle(true);
      expect(service.toggle).toHaveBeenCalledWith(0, true);
    });
  });

  describe('position', () => {
    it('should set position attribute to 0', () => {
      component.ngOnInit();
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.nativeElement;
      expect(el.getAttribute('position')).toEqual('0');
    });

    it('should set position attribute to given position', () => {
      component.position = '5';
      component.ngOnInit();
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.nativeElement;
      expect(el.getAttribute('position')).toEqual('5');
    });
  });

  describe('showAssistiveMessage', () => {
    it('should show assistive message on active view change', () => {
      component.viewTitle = 'test title';
      component.position = '0';
      component.ngOnInit();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        component.viewTitle,
        GlobalMessageType.MSG_TYPE_ASSISTIVE,
        500
      );
    });
  });
});
