import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

const mockTemplateName = 'LandingPage2Template';
class MockPageLayoutService {
  get templateName$(): Observable<string> {
    return of(mockTemplateName);
  }
}

@Component({
  template: `
    <div id="host1" cxPageTemplateStyle></div>

    <div id="host2">
      <ng-template cxPageTemplateStyle> </ng-template>
    </div>

    <div
      id="host3"
      class="existing-cls"
      cxPageTemplateStyle="customClass1"
    ></div>

    <div id="host4">
      <ng-template cxPageTemplateStyle="customClass2"> </ng-template>
    </div>

    <div id="host5">
      <ng-template>
        <ng-template cxPageTemplateStyle> </ng-template>
      </ng-template>
    </div>

    <div
      id="host6"
      class="existing-cls ssr-template-cls"
      data-current-template="ssr-template-cls"
      cxPageTemplateStyle
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplateComponent {}

class MockWindowRef implements Partial<WindowRef> {
  isBrowser(): boolean {
    return true;
  }
}

describe('PageTemplateDirective', () => {
  let hostComponent: MockTemplateComponent;
  let fixture: ComponentFixture<MockTemplateComponent>;
  let windowRef: WindowRef;

  const ssrPersistenceAttributeName = 'data-current-template';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockTemplateComponent, PageTemplateDirective],
      providers: [
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    }).compileComponents();

    windowRef = TestBed.inject(WindowRef);
  });

  describe('when in CSR', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MockTemplateComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(hostComponent).toBeTruthy();
    });

    it('should add page template to element classList', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host1');
      expect(el.classList).toContain(mockTemplateName);
    });

    it('should add page template to ng-template host element', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host2');
      expect(el.classList).toContain(mockTemplateName);
    });

    it('should add custom style class to element classList', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host3');
      expect(el.classList).toContain('customClass1');
    });

    it('should not remove static style class', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host3');
      expect(el.classList).toContain('customClass1');
      expect(el.classList).toContain('existing-cls');
    });

    it('should add custom style class to ng-template host element', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host4');
      expect(el.classList).toContain('customClass2');
    });

    it('should not page template for inner ng-templates', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host5');
      expect(el.classList.length).toEqual(0);
    });

    it('should remote the class from ssr', () => {
      const classFromSsr = 'ssr-template-cls';

      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host6');
      expect(Array.from<string>(el.classList)).not.toContain(classFromSsr);
    });

    it('should remote the ssr data attribute', () => {
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('#host6');
      expect(el.getAttribute(ssrPersistenceAttributeName)).toBeNull();
    });
  });

  describe('when in SSR mode', () => {
    beforeEach(() => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);

      fixture = TestBed.createComponent(MockTemplateComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should write template name to data attribute', () => {
      const compiled = fixture.debugElement.nativeElement as HTMLElement;

      expect(
        compiled
          .querySelector('#host1')
          ?.getAttribute(ssrPersistenceAttributeName)
      ).toEqual(mockTemplateName);
      expect(
        compiled
          .querySelector('#host2')
          ?.getAttribute(ssrPersistenceAttributeName)
      ).toEqual(mockTemplateName);
      expect(
        compiled
          .querySelector('#host3')
          ?.getAttribute(ssrPersistenceAttributeName)
      ).toEqual('customClass1');
      expect(
        compiled
          .querySelector('#host4')
          ?.getAttribute(ssrPersistenceAttributeName)
      ).toEqual('customClass2');
    });

    it('should not write template name to data attribute when class is not written', () => {
      const compiled = fixture.debugElement.nativeElement as HTMLElement;

      expect(
        compiled
          .querySelector('#host5')
          ?.getAttribute(ssrPersistenceAttributeName)
      ).toBeFalsy();
    });
  });
});
