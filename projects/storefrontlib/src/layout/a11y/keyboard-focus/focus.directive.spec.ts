import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusDirective } from './focus.directive';
import { KeyboardFocusService } from './services';

@Component({
  selector: 'cx-host',
  template: ` <div id="a" cxFocus></div> `,
})
class MockComponent {}

class MockKeyboardFocusService {
  get() {}
  set() {}
  shouldFocus() {}
  getPersistenceGroup() {}
}

describe('FocusDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FocusDirective, MockComponent],
      providers: [
        {
          provide: KeyboardFocusService,
          useClass: MockKeyboardFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should default tabindex to -1', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#a'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });
});
