import { Type, Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FocusTrapService } from './focus-trap.service';

@Component({
  template: `
    <button>Focusable element before trap</button>
    <div>
      <a href="/">First focusable element in trap</a>
      <area href="/" />
      <input />
      <select>
        <option></option>
      </select>
      <textarea></textarea>
      <button></button>
      <iframe>Last focusable element in trap</iframe>
      <a href="/" tabindex="-1">First unfocusable element in trap</a>
      <area href="/" tabindex="-1" />
      <input tabindex="-1" />
      <select tabindex="-1">
        <option></option>
      </select>
      <textarea tabindex="-1"></textarea>
      <button tabindex="-1"></button>
      <iframe tabindex="-1">Last unfocusable element in trap</iframe>
    </div>
    <button>Focusable element after trap</button>
  `,
})
class TestContainerComponent {}

describe('FocusTrapService', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: FocusTrapService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TestContainerComponent],
      providers: [FocusTrapService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.get(FocusTrapService as Type<FocusTrapService>);
    fixture.detectChanges();
  });

  it('should focus first element', () => {
    const trapElement: HTMLElement = fixture.nativeElement.querySelector('div');
    const firstFocusable: HTMLElement = trapElement.querySelector('a');
    service.focusFirstEl(trapElement);
    expect(document.activeElement).toBe(firstFocusable);
  });

  it('should get trap handler', () => {
    const trapElement: HTMLElement = fixture.nativeElement.querySelector('div');
    const handler: Function = service.getTrapHandler(trapElement);
    expect(handler).toEqual(jasmine.any(Function));
  });

  it('should focus first focusable element after last focusable in trap with tab key', () => {
    const trapElement: HTMLElement = fixture.nativeElement.querySelector('div');
    const handler: Function = service.getTrapHandler(trapElement);
    const event: KeyboardEvent = new KeyboardEvent('keypress', { key: 'Tab' });
    const firstFocusable: HTMLElement = trapElement.querySelector('a');
    const lastFocusable: HTMLElement = trapElement.querySelector('iframe');

    lastFocusable.focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(lastFocusable);
    handler(event);
    fixture.detectChanges();
    expect(document.activeElement).toBe(firstFocusable);
  });

  it('should focus last focusable element after first focusable in trap with shift+tab key', () => {
    const trapElement: HTMLElement = fixture.nativeElement.querySelector('div');
    const handler: Function = service.getTrapHandler(trapElement);
    const event: KeyboardEvent = new KeyboardEvent('keypress', {
      key: 'Tab',
      shiftKey: true,
    });
    const firstFocusable: HTMLElement = trapElement.querySelector('a');
    const lastFocusable: HTMLElement = trapElement.querySelector('iframe');

    firstFocusable.focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(firstFocusable);
    handler(event);
    fixture.detectChanges();
    expect(document.activeElement).toBe(lastFocusable);
  });
});
