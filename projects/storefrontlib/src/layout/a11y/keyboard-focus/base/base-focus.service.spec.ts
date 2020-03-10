import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseFocusService } from './base-focus.service';

@Component({ template: '<div id="a"></div><div id="b" tabindex="5"></div>' })
class MockComponent {}
describe('BaseFocusService', () => {
  let service: BaseFocusService;

  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [BaseFocusService],
    }).compileComponents();

    service = TestBed.inject(BaseFocusService);

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  }));

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });
});
