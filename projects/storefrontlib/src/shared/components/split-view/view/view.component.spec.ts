import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import { ViewComponent } from './view.component';

class MockSplitViewService {
  generateNextPosition() {
    return 0;
  }
  visibleViewCount() {
    const VISIBLE_VIEW_COUNT = 5;
    return of(VISIBLE_VIEW_COUNT);
  }
  add() {}
  remove() {}
  toggle() {}
}

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let service: SplitViewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewComponent],
      providers: [
        { provide: SplitViewService, useClass: MockSplitViewService },
      ],
    })
      .overrideComponent(ViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SplitViewService);

    spyOn(service, 'add').and.stub();
    spyOn(service, 'remove').and.stub();
    spyOn(service, 'toggle').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add()', () => {
    it('should add view with position 0', () => {
      component.ngOnInit();
      expect(service.add).toHaveBeenCalledWith(0, undefined);
    });

    it('should add view with position 3', () => {
      const INPUT_POSITION = 3;
      const EXPECTED_POSITION = 3;
      component.position = INPUT_POSITION;
      component.ngOnInit();
      expect(service.add).toHaveBeenCalledWith(EXPECTED_POSITION, undefined);
    });
  });

  describe('remove()', () => {
    it('should remove view with position 0', () => {
      component.ngOnDestroy();
      expect(service.remove).toHaveBeenCalledWith(0);
    });

    it('should remove view with position 0', () => {
      const INPUT_POSITION = 3;
      const EXPECTED_POSITION = 3;
      component.position = INPUT_POSITION;
      component.ngOnInit();
      component.ngOnDestroy();
      expect(service.remove).toHaveBeenCalledWith(EXPECTED_POSITION);
    });
  });

  describe('toggle()', () => {
    it('should toggle view based on hidden state', () => {
      const INPUT_POSITION = 5;
      const EXPECTED_POSITION = 5;
      component.position = INPUT_POSITION;
      component.hidden = true;
      expect(service.toggle).toHaveBeenCalledWith(EXPECTED_POSITION, true);
    });

    it('should delegate toggle the view', () => {
      component.toggle();
      expect(service.toggle).toHaveBeenCalledWith(0, undefined);
    });

    it('should force show', () => {
      component.toggle(false);
      expect(service.toggle).toHaveBeenCalledWith(0, false);
    });

    it('should force hide', () => {
      component.toggle(true);
      expect(service.toggle).toHaveBeenCalledWith(0, true);
    });
  });

  describe('position', () => {
    it('should set position attribute to 0', () => {
      const el: HTMLElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(el.getAttribute('position')).toEqual('0');
    });

    it('should set position attribute to given position', () => {
      const INPUT_POSITION = 5;
      component.position = INPUT_POSITION;
      component.ngOnInit();
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.nativeElement;
      expect(el.getAttribute('position')).toEqual('5');
    });
  });
});
