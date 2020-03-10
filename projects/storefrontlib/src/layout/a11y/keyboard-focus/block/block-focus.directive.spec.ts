import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseFocusService } from '../base';
import { BlockFocusDirective } from './block-focus.directive';

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
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let service: BaseFocusService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, BlockFocusDirective],
      providers: [
        {
          provide: BaseFocusService,
          useClass: MockBaseFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BaseFocusService);

    fixture.detectChanges();
  }));

  it('should render tabindex -1 by default', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#a'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should render tabindex -1 when config = {block: true}', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#b'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should not render tabindex -1 when config = {block: false}', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#c'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('0');
  });

  it('should not render tabindex -1 by default when non block config is given', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#d'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('0');
  });
});
