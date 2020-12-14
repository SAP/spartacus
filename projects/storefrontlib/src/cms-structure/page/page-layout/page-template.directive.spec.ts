import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

class MockPageLayoutService {
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockTemplateComponent {}

describe('PageTemplateDirective', () => {
  let hostComponent: MockTemplateComponent;
  let fixture: ComponentFixture<MockTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MockTemplateComponent, PageTemplateDirective],
      providers: [
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
      ],
    }).compileComponents();

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
    expect(el.classList).toContain('LandingPage2Template');
  });

  it('should add page template to ng-template host element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const el = compiled.querySelector('#host2');
    expect(el.classList).toContain('LandingPage2Template');
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
});
