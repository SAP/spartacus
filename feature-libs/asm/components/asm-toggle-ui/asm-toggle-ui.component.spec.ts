import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService, AsmUi } from '@spartacus/asm/core';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmToggleUiComponent } from './asm-toggle-ui.component';

class MockAsmService {
  getAsmUiState(): Observable<AsmUi> {
    return of(mockAsmUi);
  }

  updateAsmUiState(_asmUi): void {}
}

const mockAsmUi: AsmUi = {
  collapsed: false,
};

describe('AsmToggleuUiComponent', () => {
  let component: AsmToggleUiComponent;
  let fixture: ComponentFixture<AsmToggleUiComponent>;
  let asmService: AsmService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [AsmToggleUiComponent],
        providers: [{ provide: AsmService, useClass: MockAsmService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmToggleUiComponent);
    component = fixture.componentInstance;
    asmService = TestBed.inject(AsmService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display expandIcon when AsmUi collapse state is true', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ collapsed: true }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.expandIcon'))).toBeTruthy();
    expect(el.query(By.css('.collapseIcon'))).toBeFalsy();
  });

  it('should display collapseIcon when AsmUi collapse state is false', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.expandIcon'))).toBeFalsy();
    expect(el.query(By.css('.collapseIcon'))).toBeTruthy();
  });

  it('should call toggleUi() and toggle the collapse value', () => {
    spyOn(asmService, 'updateAsmUiState').and.stub();

    el.query(By.css('.toggleUi')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );

    fixture.detectChanges();

    expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
      collapsed: true,
    });
  });
});
