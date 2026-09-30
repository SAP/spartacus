/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { CxRovingTabindexDirective } from './roving-tabindex.directive';

@Component({
  template: `
    <div
      [cxRovingTabindex]="itemSelector"
      [cxRovingTabindexAxis]="axis"
      [cxRovingTabindexActivate]="activate"
      (itemActivated)="activated = $event"
    >
      <div cxRovingTabindexItem *ngFor="let i of items" tabindex="-1">
        Item {{ i }}
      </div>
    </div>
  `,
  imports: [CxRovingTabindexDirective, NgFor],
})
class TestHostComponent {
  items = [1, 2, 3];
  axis: 'vertical' | 'horizontal' = 'vertical';
  activate = true;
  itemSelector = '[cxRovingTabindexItem]';
  activated: number | null = null;
}

@Component({
  template: `
    <div cxRovingTabindex="a" cxRovingTabindexAxis="horizontal">
      <a *ngFor="let i of items" tabindex="-1">Link {{ i }}</a>
    </div>
  `,
  imports: [CxRovingTabindexDirective, NgFor],
})
class TestCustomSelectorHostComponent {
  items = [1, 2, 3];
}

@Component({
  template: `
    <div [cxRovingTabindex]="'[data-item]'">
      <div data-item tabindex="-1">
        <a href="#">Child link</a>
      </div>
      <div data-item tabindex="-1">
        <button type="button">Child button</button>
      </div>
      <div data-item tabindex="-1">Item 3</div>
    </div>
  `,
  imports: [CxRovingTabindexDirective],
})
class TestChildFocusHostComponent {}

@Component({
  template: `
    <div [cxRovingTabindex]="'[data-guard-item]'">
      <div data-guard-item tabindex="-1">Row 1</div>
      <div data-guard-item tabindex="-1">Row 2</div>
    </div>
  `,
  imports: [CxRovingTabindexDirective],
})
class TestNativeInputHostComponent {}

@Component({
  template: `
    <div
      [cxRovingTabindex]="'[data-fwd-item]'"
      [cxRovingTabindexForwardSecondaryAxis]="true"
    >
      <div data-fwd-item tabindex="-1">
        <a href="#" (keydown)="forwardedKeys.push($event.key)">
          <button type="button" tabindex="-1">toggle</button>
          Link 1
        </a>
      </div>
      <div data-fwd-item tabindex="-1">
        <a href="#">Link 2</a>
      </div>
    </div>
  `,
  imports: [CxRovingTabindexDirective],
})
class TestForwardHostComponent {
  forwardedKeys: string[] = [];
}

describe('CxRovingTabindexDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let container: HTMLElement;
  let directive: CxRovingTabindexDirective;

  function getItems(): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>('[cxRovingTabindexItem]')
    );
  }

  function dispatchKeydown(key: string, target?: HTMLElement): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    (target ?? container).dispatchEvent(event);
    return event;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    container = fixture.debugElement.query(
      By.directive(CxRovingTabindexDirective)
    ).nativeElement as HTMLElement;
    directive = fixture.debugElement
      .query(By.directive(CxRovingTabindexDirective))
      .injector.get(CxRovingTabindexDirective);
  });

  describe('initTabindexes', () => {
    it('should set tabindex=0 on the first item and -1 on all others', () => {
      const items = getItems();
      expect(items[0].getAttribute('tabindex')).toBe('0');
      expect(items[1].getAttribute('tabindex')).toBe('-1');
      expect(items[2].getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('vertical axis (default)', () => {
    it('should focus the next item on ArrowDown', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[1], 'focus');

      dispatchKeydown('ArrowDown');

      expect(focusSpy).toHaveBeenCalled();
      expect(items[1].getAttribute('tabindex')).toBe('0');
      expect(items[0].getAttribute('tabindex')).toBe('-1');
    });

    it('should focus the previous item on ArrowUp', () => {
      directive.focusedIndex = 1;
      const items = getItems();
      items[1].focus();
      const focusSpy = vi.spyOn(items[0], 'focus');

      dispatchKeydown('ArrowUp');

      expect(focusSpy).toHaveBeenCalled();
      expect(items[0].getAttribute('tabindex')).toBe('0');
    });

    it('should not move focus past the last item on ArrowDown', () => {
      directive.focusedIndex = 2;
      const items = getItems();
      items[2].focus();
      const focusSpy = vi.spyOn(items[2], 'focus');

      dispatchKeydown('ArrowDown');

      expect(focusSpy).not.toHaveBeenCalled();
      expect(directive.focusedIndex).toBe(2);
    });

    it('should not move focus before the first item on ArrowUp', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[0], 'focus');

      dispatchKeydown('ArrowUp');

      expect(focusSpy).not.toHaveBeenCalled();
      expect(directive.focusedIndex).toBe(0);
    });

    it('should preventDefault on ArrowDown even at boundary', () => {
      directive.focusedIndex = 2;
      const items = getItems();
      items[2].focus();
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      container.dispatchEvent(event);
      expect(preventSpy).toHaveBeenCalled();
    });

    it('should not respond to ArrowRight/ArrowLeft on vertical axis', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[1], 'focus');

      dispatchKeydown('ArrowRight');
      dispatchKeydown('ArrowLeft');

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('horizontal axis', () => {
    beforeEach(() => {
      component.axis = 'horizontal';
      fixture.changeDetectorRef.detectChanges();
    });

    it('should focus the next item on ArrowRight', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[1], 'focus');

      dispatchKeydown('ArrowRight');

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should focus the previous item on ArrowLeft', () => {
      directive.focusedIndex = 1;
      const items = getItems();
      items[1].focus();
      const focusSpy = vi.spyOn(items[0], 'focus');

      dispatchKeydown('ArrowLeft');

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should not respond to ArrowDown/ArrowUp on horizontal axis', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[1], 'focus');

      dispatchKeydown('ArrowDown');
      dispatchKeydown('ArrowUp');

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('Home / End', () => {
    it('should jump to the first item on Home', () => {
      directive.focusedIndex = 2;
      const items = getItems();
      items[2].focus();
      const focusSpy = vi.spyOn(items[0], 'focus');

      dispatchKeydown('Home');

      expect(focusSpy).toHaveBeenCalled();
      expect(directive.focusedIndex).toBe(0);
    });

    it('should jump to the last item on End', () => {
      const items = getItems();
      items[0].focus();
      const focusSpy = vi.spyOn(items[2], 'focus');

      dispatchKeydown('End');

      expect(focusSpy).toHaveBeenCalled();
      expect(directive.focusedIndex).toBe(2);
    });
  });

  describe('activation (Enter / Space)', () => {
    it('should emit itemActivated with the current index on Enter', () => {
      directive.focusedIndex = 1;
      const items = getItems();
      items[1].focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      container.dispatchEvent(event);

      expect(preventSpy).toHaveBeenCalled();
      expect(component.activated).toBe(1);
    });

    it('should NOT emit on Space keydown but should suppress scroll', () => {
      directive.focusedIndex = 2;
      const items = getItems();
      items[2].focus();

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      container.dispatchEvent(event);

      // Scroll suppressed — but activation is deferred to keyup.
      expect(preventSpy).toHaveBeenCalled();
      expect(component.activated).toBeNull();
    });

    it('should emit itemActivated on Space keyup', () => {
      directive.focusedIndex = 2;
      const items = getItems();
      items[2].focus();

      container.dispatchEvent(
        new KeyboardEvent('keyup', { key: ' ', bubbles: true })
      );

      expect(component.activated).toBe(2);
    });

    it('should NOT emit or preventDefault on Enter when cxRovingTabindexActivate=false', () => {
      component.activate = false;
      fixture.changeDetectorRef.detectChanges();
      const items = getItems();
      items[0].focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      container.dispatchEvent(event);

      expect(preventSpy).not.toHaveBeenCalled();
      expect(component.activated).toBeNull();
    });

    it('should NOT emit but should still call preventDefault on Space keydown when cxRovingTabindexActivate=false', () => {
      component.activate = false;
      fixture.changeDetectorRef.detectChanges();
      const items = getItems();
      items[0].focus();

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      container.dispatchEvent(event);

      // Scroll is always suppressed on Space keydown — even when activation is off.
      expect(preventSpy).toHaveBeenCalled();
      expect(component.activated).toBeNull();
    });

    it('should NOT emit on Space keyup when cxRovingTabindexActivate=false', () => {
      component.activate = false;
      fixture.changeDetectorRef.detectChanges();
      const items = getItems();
      items[0].focus();

      container.dispatchEvent(
        new KeyboardEvent('keyup', { key: ' ', bubbles: true })
      );

      expect(component.activated).toBeNull();
    });
  });

  describe('custom itemSelector', () => {
    it('should discover items by the overridden selector', () => {
      let customFixture: ComponentFixture<TestCustomSelectorHostComponent>;
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TestCustomSelectorHostComponent],
      }).compileComponents();

      customFixture = TestBed.createComponent(TestCustomSelectorHostComponent);
      customFixture.detectChanges();

      const customContainer = customFixture.debugElement.query(
        By.directive(CxRovingTabindexDirective)
      ).nativeElement as HTMLElement;
      const links = Array.from(
        customContainer.querySelectorAll<HTMLElement>('a')
      );

      expect(links[0].getAttribute('tabindex')).toBe('0');
      expect(links[1].getAttribute('tabindex')).toBe('-1');
      expect(links[2].getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('focusin sync and child-focus resolution', () => {
    let childFixture: ComponentFixture<TestChildFocusHostComponent>;
    let childContainer: HTMLElement;
    let childDirective: CxRovingTabindexDirective;

    beforeEach(() => {
      childFixture = TestBed.createComponent(TestChildFocusHostComponent);
      childFixture.detectChanges();
      childContainer = childFixture.debugElement.query(
        By.directive(CxRovingTabindexDirective)
      ).nativeElement as HTMLElement;
      childDirective = childFixture.debugElement
        .query(By.directive(CxRovingTabindexDirective))
        .injector.get(CxRovingTabindexDirective);
    });

    it('should update focusedIndex when Tab moves focus to a child inside a roving item', () => {
      const items = Array.from(
        childContainer.querySelectorAll<HTMLElement>('[data-item]')
      );
      // Simulate Tab landing on the <a> inside item 0 (row 1)
      const childLink = items[0].querySelector('a') as HTMLElement;
      childLink.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

      expect(childDirective.focusedIndex).toBe(0);
    });

    it('should resume arrow navigation from the correct row after Tab into a child', () => {
      const items = Array.from(
        childContainer.querySelectorAll<HTMLElement>('[data-item]')
      );
      // Start on item 0, arrow down to item 1
      items[0].focus();
      childContainer.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      expect(childDirective.focusedIndex).toBe(1);

      // Simulate Tab landing on the <button> inside item 1
      const childButton = items[1].querySelector('button') as HTMLElement;
      childButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      expect(childDirective.focusedIndex).toBe(1);

      // Arrow down from item 1 → should move to item 2, not item 0
      const focusSpy = vi.spyOn(items[2], 'focus');
      childButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      expect(focusSpy).toHaveBeenCalled();
      expect(childDirective.focusedIndex).toBe(2);
    });
  });

  describe('MutationObserver / focusedIndex clamping', () => {
    it('should clamp focusedIndex when items are removed', async () => {
      directive.focusedIndex = 2;
      component.items = [1, 2]; // drop third item
      fixture.changeDetectorRef.detectChanges();

      // Let the MutationObserver fire
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(directive.focusedIndex).toBe(1);
      const items = getItems();
      expect(items[1].getAttribute('tabindex')).toBe('0');
    });
  });

  describe('native interactive target guard', () => {
    let guardFixture: ComponentFixture<TestNativeInputHostComponent>;
    let guardContainer: HTMLElement;
    let guardDirective: CxRovingTabindexDirective;

    beforeEach(() => {
      guardFixture = TestBed.createComponent(TestNativeInputHostComponent);
      guardFixture.detectChanges();
      guardContainer = guardFixture.debugElement.query(
        By.directive(CxRovingTabindexDirective)
      ).nativeElement as HTMLElement;
      guardDirective = guardFixture.debugElement
        .query(By.directive(CxRovingTabindexDirective))
        .injector.get(CxRovingTabindexDirective);
    });

    it.each([
      ['INPUT', (): HTMLElement => document.createElement('input')],
      ['TEXTAREA', (): HTMLElement => document.createElement('textarea')],
      ['SELECT', (): HTMLElement => document.createElement('select')],
      [
        'contenteditable',
        (): HTMLElement => {
          const el = document.createElement('div');
          el.contentEditable = 'true';
          return el;
        },
      ],
    ])(
      'should NOT call preventDefault or move focus when ArrowDown originates from %s',
      (_label, createElement) => {
        const items = Array.from(
          guardContainer.querySelectorAll<HTMLElement>('[data-guard-item]')
        );
        const interactiveEl = createElement();
        items[0].appendChild(interactiveEl);
        items[0].focus();
        guardDirective.focusedIndex = 0;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        });
        const preventSpy = vi.spyOn(event, 'preventDefault');
        interactiveEl.dispatchEvent(event);

        expect(preventSpy).not.toHaveBeenCalled();
        expect(guardDirective.focusedIndex).toBe(0);
      }
    );

    it('should move focus when ArrowDown originates from the roving item itself', () => {
      const items = Array.from(
        guardContainer.querySelectorAll<HTMLElement>('[data-guard-item]')
      );
      items[0].focus();
      const focusSpy = vi.spyOn(items[1], 'focus');

      guardContainer.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );

      expect(focusSpy).toHaveBeenCalled();
      expect(guardDirective.focusedIndex).toBe(1);
    });
  });

  describe('secondary-axis forwarding', () => {
    let fwdFixture: ComponentFixture<TestForwardHostComponent>;
    let fwdComponent: TestForwardHostComponent;
    let fwdContainer: HTMLElement;

    beforeEach(() => {
      fwdFixture = TestBed.createComponent(TestForwardHostComponent);
      fwdComponent = fwdFixture.componentInstance;
      fwdFixture.detectChanges();
      fwdContainer = fwdFixture.debugElement.query(
        By.directive(CxRovingTabindexDirective)
      ).nativeElement as HTMLElement;
    });

    function fwdItems(): HTMLElement[] {
      return Array.from(
        fwdContainer.querySelectorAll<HTMLElement>('[data-fwd-item]')
      );
    }

    it("should forward a secondary-axis key to the focused item's first focusable descendant and suppress the default", () => {
      const items = fwdItems();
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      items[0].dispatchEvent(event);

      expect(preventSpy).toHaveBeenCalled();
      // Forwarded to the wrapping <a>, not its inner tabindex=-1 button.
      expect(fwdComponent.forwardedKeys).toEqual(['ArrowRight']);
    });

    it('should not re-forward the synthesized event that originates from a descendant', () => {
      const items = fwdItems();
      // A single ArrowRight on the row must reach the link exactly once — the
      // re-dispatched event bubbles back to the host but its target is the link
      // (not a roving item), so it is not forwarded again.
      items[0].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );

      expect(fwdComponent.forwardedKeys).toEqual(['ArrowRight']);
    });

    it('should not forward a primary-axis key', () => {
      const items = fwdItems();
      items[0].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );

      expect(fwdComponent.forwardedKeys).toEqual([]);
    });
  });
});
