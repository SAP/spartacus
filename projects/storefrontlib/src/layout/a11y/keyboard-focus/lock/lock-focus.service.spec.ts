import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFocusUtility } from '../services';
import { LockFocusService } from './lock-focus.service';

@Component({
  template: `
    <div id="a"></div>
    <div id="b">
      <button id="b1"></button>
      <button id="b2"></button>
      <button id="b3" data-cx-focus="b3"></button>
      <button id="b4"></button>
      <button id="b5"></button>
    </div>
    <div id="c"></div>
  `,
})
class MockComponent {}

class MockSelectFocusUtility {
  findFirstFocusable() {}
  findFocusable() {
    return [];
  }
}

describe('LockFocusService', () => {
  let service: LockFocusService;
  let focusUtility: SelectFocusUtility;

  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        LockFocusService,
        {
          provide: SelectFocusUtility,
          useClass: MockSelectFocusUtility,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(LockFocusService);
    focusUtility = TestBed.inject(SelectFocusUtility);

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  }));

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });
});
