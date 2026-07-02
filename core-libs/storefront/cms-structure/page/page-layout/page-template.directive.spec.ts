import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Type,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DirectiveStateTransferService } from '../../../utils';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

const storageKey = 'tmpl';

const mockTemplateName = 'LandingPage2Template';
class MockPageLayoutService {
  get templateName$(): Observable<string> {
    return of(mockTemplateName);
  }
}

@Directive({})
class MockTemplateComponent {}

@Component({
  template: ` <div id="host1" cxPageTemplateStyle></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate1Component extends MockTemplateComponent {}

@Component({
  template: `
    <div id="host2">
      <ng-template cxPageTemplateStyle> </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate2Component extends MockTemplateComponent {}

@Component({
  template: `
    <div
      id="host3"
      class="existing-cls"
      cxPageTemplateStyle="customClass1"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate3Component extends MockTemplateComponent {}

@Component({
  template: `
    <div id="host4">
      <ng-template cxPageTemplateStyle="customClass2"> </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate4Component extends MockTemplateComponent {}

@Component({
  template: `
    <div id="host5">
      <ng-template>
        <ng-template cxPageTemplateStyle> </ng-template>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate5Component extends MockTemplateComponent {}

const oldClass = 'ssr-template-cls';
@Component({
  template: `
    <div
      id="host6"
      class="existing-cls ssr-template-cls"
      data-tmpl="ssr-template-cls"
      cxPageTemplateStyle
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageTemplateDirective],
})
class MockTemplate6Component extends MockTemplateComponent {}

class MockDirectiveStateTransferService
  implements Partial<DirectiveStateTransferService>
{
  _data: Record<string, string> = {};

  get(_el: HTMLElement, key: string): string | undefined {
    return this._data[key];
  }
  set(_el: HTMLElement, key: string, value: string): void {
    this._data[key] = value;
  }
  clear(_el: HTMLElement, key: string): void {
    delete this._data[key];
  }
}

describe('PageTemplateDirective', () => {
  let hostComponent: MockTemplateComponent;
  let fixture: ComponentFixture<MockTemplateComponent>;
  let directiveStateTransferService: DirectiveStateTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockTemplateComponent, PageTemplateDirective],
      providers: [
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
        {
          provide: DirectiveStateTransferService,
          useClass: MockDirectiveStateTransferService,
        },
      ],
    }).compileComponents();

    directiveStateTransferService = TestBed.inject(
      DirectiveStateTransferService
    );
    spyOn(directiveStateTransferService, 'get').and.callThrough();
    spyOn(directiveStateTransferService, 'set').and.callThrough();
    spyOn(directiveStateTransferService, 'clear').and.callThrough();
  });

  type HostID = '#host1' | '#host2' | '#host3' | '#host4' | '#host5' | '#host6';
  function createHostComponent(id: HostID) {
    const componentMap: Record<HostID, Type<Component>> = {
      '#host1': MockTemplate1Component,
      '#host2': MockTemplate2Component,
      '#host3': MockTemplate3Component,
      '#host4': MockTemplate4Component,
      '#host5': MockTemplate5Component,
      '#host6': MockTemplate6Component,
    };

    fixture = TestBed.createComponent(componentMap[id]);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const el = compiled.querySelector(id);
    return el as HTMLElement;
  }

  it('should be created', () => {
    createHostComponent('#host1');

    expect(hostComponent).toBeTruthy();
  });

  it('should add page template to element classList', () => {
    const el = createHostComponent('#host1');
    expect(el.classList).toContain(mockTemplateName);
  });

  it('should store template for state transfer', () => {
    const el = createHostComponent('#host1');

    expect(directiveStateTransferService.set).toHaveBeenCalledWith(
      el,
      storageKey,
      mockTemplateName
    );
  });

  it('should add page template to ng-template host element', () => {
    const el = createHostComponent('#host2');
    expect(el.classList).toContain(mockTemplateName);
  });

  it('should add custom style class to element classList', () => {
    const el = createHostComponent('#host3');
    expect(el.classList).toContain('customClass1');
  });

  it('should not remove static style class', () => {
    const el = createHostComponent('#host3');
    expect(el.classList).toContain('customClass1');
    expect(el.classList).toContain('existing-cls');
  });

  it('should add custom style class to ng-template host element', () => {
    const el = createHostComponent('#host4');
    expect(el.classList).toContain('customClass2');
  });

  it('should not page template for inner ng-templates', () => {
    const el = createHostComponent('#host5');
    expect(el.classList.length).toEqual(0);
  });

  it('should not set transfer state when there is no template class', () => {
    createHostComponent('#host5');

    expect(directiveStateTransferService.set).not.toHaveBeenCalled();
  });

  it('should remove the transfer state class', () => {
    (directiveStateTransferService.get as jasmine.Spy).and.returnValue(
      oldClass
    );

    const el = createHostComponent('#host6');

    expect(Array.from<string>(el.classList)).not.toContain(oldClass);
  });

  it('should clear the transfer state on initialization', () => {
    (directiveStateTransferService.get as jasmine.Spy).and.returnValue(
      oldClass
    );

    const el = createHostComponent('#host6');

    expect(directiveStateTransferService.clear).toHaveBeenCalledWith(
      el,
      storageKey
    );
  });
});
