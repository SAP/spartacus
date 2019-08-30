import {
  Component,
  DebugElement,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmRootComponent } from './asm-root.component';

@Component({
  selector: 'cx-asm-main-ui',
  template: '',
})
class MockAsmMainUiComponent {}

@Directive({
  selector: '[cxFeature]',
})
class MockFeatureLevelDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(_feature: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

fdescribe('AsmRootComponent', () => {
  let component: AsmRootComponent;
  let fixture: ComponentFixture<AsmRootComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AsmRootComponent,
        MockAsmMainUiComponent,
        MockFeatureLevelDirective,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the asm main ui', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-asm-main-ui'))).toBeTruthy();
  });
});
