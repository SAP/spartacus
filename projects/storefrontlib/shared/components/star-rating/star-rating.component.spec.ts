import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StarRatingComponent } from './star-rating.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type;
}

describe('StarRatingComponent in product', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MockIconComponent, StarRatingComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized with zero rate', () => {
    expect(component.rating).toEqual(0);
  });

  it('should have initial css property value', () => {
    expect(component.rating).toEqual(0);
    const element: HTMLElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(element.style.getPropertyValue('--star-fill')).toEqual('0');
  });

  describe('disabled = true (default)', () => {
    it('should be disabled by default', () => {
      expect(component.disabled).toBeTruthy();
    });

    it('should not set rate', () => {
      expect(component.rating).toEqual(0);
      component.setRate(3);
      expect(component.rating).toEqual(0);
    });

    it('should not save rate', () => {
      expect(component.rating).toEqual(0);
      component.saveRate(3);
      expect(component.rating).toEqual(0);
    });
  });

  describe('disabled = false', () => {
    beforeEach(() => {
      component.disabled = false;
    });

    it('should set rate', () => {
      expect(component.rating).toEqual(0);
      component.setRate(3);
      expect(component.rating).toEqual(3);
    });

    it('should save rate', () => {
      expect(component.rating).toEqual(0);
      component.saveRate(3.5);
      expect(component.rating).toEqual(3.5);
    });

    it('should reset rate to 0', () => {
      component.reset();
      expect(component.rating).toEqual(0);
    });

    it('should reset rate to saved value', () => {
      component.saveRate(3);
      component.reset();
      expect(component.rating).toEqual(3);
    });

    it('should emit change event', () => {
      spyOn(component.change, 'emit');
      component.saveRate(3);
      expect(component.change.emit).toHaveBeenCalledWith(3);
    });
  });

  describe('UI', () => {
    const event = {
      preventDefault: () => {},
    };

    beforeEach(() => {
      component.disabled = false;
    });

    it('should have css property value', () => {
      component.rating = 3.5;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement;
      expect(element.style.getPropertyValue('--star-fill')).toEqual('3.5');
    });

    it('should change rate on mouseover third cx-icon', () => {
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(By.css('cx-icon'));
      icons[2].triggerEventHandler('mouseover', event);
      expect(component.rating).toEqual(3);
    });

    it('should set rate on click', () => {
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(By.css('cx-icon'));
      icons[2].triggerEventHandler('click', event);
      expect(component.rating).toEqual(3);
    });

    it('should set rate on space', () => {
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(By.css('cx-icon'));
      icons[2].triggerEventHandler('keydown.space', event);
      expect(component.rating).toEqual(3);
    });

    it('should reset rate on mouseout', () => {
      spyOn(component, 'reset').and.callThrough();
      fixture.detectChanges();
      fixture.debugElement.triggerEventHandler('mouseout', event);
      expect(component.reset).toHaveBeenCalled();
      expect(component.rating).toEqual(0);
    });

    it('should keep rate on mouseout after click', () => {
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(By.css('cx-icon'));
      icons[2].triggerEventHandler('click', event);
      fixture.debugElement.triggerEventHandler('mouseout', event);
      expect(component.rating).toEqual(3);
    });

    it('should keep rate on mouseout after keydown.space', () => {
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(By.css('cx-icon'));
      icons[2].triggerEventHandler('keydown.space', event);
      fixture.debugElement.triggerEventHandler('mouseout', event);
      expect(component.rating).toEqual(3);
    });
  });
});
