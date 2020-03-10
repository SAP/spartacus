import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectFocusUtility } from '../services/select-focus.util';
import { PersistFocusService } from './persist-focus.service';

class MockSelectFocusUtility {}

@Component({
  template: `
    <div id="a"></div>
    <div id="b" tabindex="5" data-cx-focus-group="pg"></div>
  `,
})
class MockComponent {}
describe('PersistFocusService', () => {
  let service: PersistFocusService;

  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        PersistFocusService,
        {
          provide: SelectFocusUtility,
          useClass: MockSelectFocusUtility,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(PersistFocusService);

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  }));

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should return undefined when focus hasn't been set`, () => {
    expect(service.get()).toBeFalsy();
  });

  it(`should return key when focus is set`, () => {
    const key = 'my-key';
    service.set(key);
    expect(service.get()).toEqual(key);
  });

  it(`should return undefined when focus for a group hasn't been set`, () => {
    const key = 'my-key';
    const group = 'my-group';
    service.set(key);
    expect(service.get(group)).toBeFalsy();
  });

  it(`should return key for a focus group`, () => {
    const key = 'my-key';
    const group = 'my-group';
    service.set(key, group);
    expect(service.get(group)).toEqual(key);
  });

  it(`should not return key for different focus group`, () => {
    const key = 'my-key';
    const groupA = 'group-a';
    const groupB = 'group-b';
    service.set(key, groupA);
    expect(service.get(groupB)).toBeFalsy();
  });

  it(`should not return global key for focus group`, () => {
    const key = 'my-key';
    const groupA = 'group-a';
    service.set(key, groupA);
    expect(service.get()).toBeFalsy();
  });

  describe('Persistence Group', () => {
    it('should return configured persistence group', () => {
      const el: HTMLElement = fixture.debugElement.query(By.css('#a'))
        .nativeElement;

      const group = service.getPersistenceGroup(el, { group: 'g' });
      expect(group).toEqual('g');
    });

    it('should return persisted group from attr', () => {
      const el: HTMLElement = fixture.debugElement.query(By.css('#b'))
        .nativeElement;

      const group = service.getPersistenceGroup(el, {});
      expect(group).toEqual('pg');
    });

    it('should return configured group regardless of attr', () => {
      const el: HTMLElement = fixture.debugElement.query(By.css('#b'))
        .nativeElement;

      const group = service.getPersistenceGroup(el, { group: 'g' });
      expect(group).toEqual('g');
    });
  });
});
