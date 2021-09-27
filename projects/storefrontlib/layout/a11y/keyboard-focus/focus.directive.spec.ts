import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusDirective } from './focus.directive';
import { KeyboardFocusService } from './services';

@Component({
  selector: 'cx-host',
  template: ` <div
    id="a"
    [cxFocus]="{ autofocus: true, refreshFocus: modelA }"
  ></div>`,
})
class MockComponent {
  modelA = '';
  modelB = '';
}

class MockKeyboardFocusService {
  get() {}
  set() {}
  shouldFocus() {}
  getPersistenceGroup() {}
  findFirstFocusable() {}
  hasPersistedFocus() {}
}

describe('FocusDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let keyboardFocusService: KeyboardFocusService;

  beforeEach(
    waitForAsync(() => {
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

      component = fixture.componentInstance;
      keyboardFocusService = TestBed.inject(KeyboardFocusService);
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should default tabindex to -1', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#a')
    ).nativeElement;
    fixture.detectChanges();

    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should focus element marked with autofocus = true', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#a')
    ).nativeElement;
    spyOn(keyboardFocusService, 'findFirstFocusable').and.returnValue(el);
    fixture.detectChanges();

    expect(document.activeElement.id).toEqual('a');
  });

  it('should refresh focus with change on configured attribute', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#a')
    ).nativeElement;

    let spiedFirstFocusable = spyOn(
      keyboardFocusService,
      'findFirstFocusable'
    ).and.returnValue(el);

    component.modelA = '1';
    fixture.detectChanges();

    expect(document.activeElement.id).toEqual('a');
    expect(spiedFirstFocusable).toHaveBeenCalled();
  });

  it('should NOT refresh focus with change on non-configured attribute', () => {
    // to trigger ngAfterViewInit hook manually
    fixture.detectChanges();

    let spiedFirstFocusable = spyOn(keyboardFocusService, 'findFirstFocusable');

    component.modelB = '1';
    fixture.detectChanges();

    expect(spiedFirstFocusable).not.toHaveBeenCalled();
  });
});
