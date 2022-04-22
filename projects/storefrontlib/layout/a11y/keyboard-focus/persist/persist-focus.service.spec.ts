import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

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
  describe('clear()', () => {
    it(`should clear the global persisted value`, () => {
      const key = 'my-key';
      service.set(key);
      expect(service.get()).toEqual('my-key');
      service.clear();
      expect(service.get()).toBeUndefined();
    });

    it(`should clear a value for a specific group`, () => {
      const key = 'my-key';
      const group = 'group-a';
      service.set(key, group);
      expect(service.get(group)).toEqual('my-key');
      service.clear(group);
      expect(service.get(group)).toBeUndefined();
    });

    it(`should not clear the global group if a specific group is cleared`, () => {
      const keyA = 'my-key-1';
      const keyB = 'my-key-2';
      const group = 'group-a';
      service.set(keyA);
      service.set(keyB, group);
      service.clear(group);
      expect(service.get()).toEqual('my-key-1');
    });

    it(`should not clear the group if the global group is cleared`, () => {
      const globalKey = 'my-key-1';
      const groupKey = 'my-key-2';
      const group = 'group-a';
      service.set(globalKey);
      service.set(groupKey, group);
      service.clear();
      expect(service.get(group)).toEqual(groupKey);
      expect(service.get()).toBeUndefined();
    });
  });

  describe('Persistence Group', () => {
    it('should return configured persistence group', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#a')
      ).nativeElement;

      const group = service.getPersistenceGroup(el, { group: 'g' });
      expect(group).toEqual('g');
    });

    it('should return falsy if no config is added', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#a')
      ).nativeElement;

      const group = service.getPersistenceGroup(el);
      expect(group).toBeFalsy();
    });

    it('should return persisted group from attr', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#b')
      ).nativeElement;

      const group = service.getPersistenceGroup(el);
      expect(group).toEqual('pg');
    });

    it('should return configured group regardless of attr', () => {
      const el: HTMLElement = fixture.debugElement.query(
        By.css('#b')
      ).nativeElement;

      const group = service.getPersistenceGroup(el, { group: 'g' });
      expect(group).toEqual('g');
    });
  });
});
