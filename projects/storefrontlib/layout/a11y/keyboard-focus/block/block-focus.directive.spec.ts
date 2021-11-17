import { Component, Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseFocusService } from '../base';
import { BlockFocusConfig } from '../keyboard-focus.model';
import { BlockFocusDirective } from './block-focus.directive';
@Directive({
  selector: '[cxBlockFocus]',
})
class CustomFocusDirective extends BlockFocusDirective {
  @Input('cxBlockFocus') protected config: BlockFocusConfig;
}

@Component({
  selector: 'cx-host',
  template: `
    <div id="a" cxBlockFocus tabindex="0">block</div>
    <div id="b" [cxBlockFocus]="{ block: true }" tabindex="0">block</div>
    <div id="c" [cxBlockFocus]="{ block: false }" tabindex="0">block</div>
    <div id="d" [cxBlockFocus]="{ otherConfig: true }" tabindex="0">block</div>
  `,
})
class MockComponent {}

class MockBaseFocusService {}

describe('BlockFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent, CustomFocusDirective],
        providers: [
          {
            provide: BaseFocusService,
            useClass: MockBaseFocusService,
          },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(MockComponent);
    })
  );

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should render tabindex -1 by default', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#a')
    ).nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should render tabindex -1 when config = {block: true}', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#b')
    ).nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should not render tabindex -1 when config = {block: false}', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#c')
    ).nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('0');
  });

  it('should not render tabindex -1 by default when non block config is given', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('#d')
    ).nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('0');
  });
});
