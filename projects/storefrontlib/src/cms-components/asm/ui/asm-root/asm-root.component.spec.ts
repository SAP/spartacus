import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService } from '@spartacus/core';
import { of } from 'rxjs';
import { AsmRootComponent } from './asm-root.component';
@Component({
  selector: 'cx-asm-main-ui',
  template: '',
})
class MockAsmMainUiComponent {}

class MockAsmService {
  getAsmUiState() {
    return of({});
  }
  updateAsmUiState(): void {}
}

describe('AsmRootComponent', () => {
  let component: AsmRootComponent;
  let fixture: ComponentFixture<AsmRootComponent>;
  let el: DebugElement;
  let asmService: AsmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsmRootComponent, MockAsmMainUiComponent],
      providers: [{ provide: AsmService, useClass: MockAsmService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmRootComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    asmService = TestBed.get(AsmService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the main asm UI if UI state is visisble', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ visible: true }));
    fixture.detectChanges();
    expect(el.query(By.css('cx-asm-main-ui'))).toBeTruthy();
  });

  it('should have collapsed class on collapse', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(
      of({ visible: true, expanded: false })
    );
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('cx-asm-main-ui'));
    expect(element.nativeElement.classList).toContain('collapse');
  });

  it('should have no class name on expand', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(
      of({ visible: true, expanded: true })
    );
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('cx-asm-main-ui'));
    expect(element.nativeElement.classList).not.toContain('collapse');
  });

  xdescribe('Minimize ASM UI', () => {
    it('should expand the ASM UI when the expand arrow button is clicked', () => {
      spyOn(asmService, 'getAsmUiState').and.returnValue(
        of({ visible: true, expanded: false })
      );
      spyOn(asmService, 'updateAsmUiState').and.stub();

      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('button'));

      expandBtn.nativeElement.click();
      expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
        expanded: true,
      });
    });

    it('should collapse the ASM UI when the collapse button is clicked', () => {
      spyOn(asmService, 'getAsmUiState').and.returnValue(
        of({ visible: true, expanded: true })
      );
      spyOn(asmService, 'updateAsmUiState').and.stub();

      fixture.detectChanges();

      const collapseBtn = fixture.debugElement.query(By.css('button'));

      collapseBtn.nativeElement.click();
      expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
        expanded: false,
      });
    });
  });
});
