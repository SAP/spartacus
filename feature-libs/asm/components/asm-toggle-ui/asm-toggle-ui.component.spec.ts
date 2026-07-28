import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService } from '@spartacus/asm/core';
import { AsmUi } from '@spartacus/asm/root';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmToggleUiComponent } from './asm-toggle-ui.component';

class MockAsmService {
  getAsmUiState(): Observable<AsmUi> {
    return of(mockAsmUi);
  }

  updateAsmUiState(_asmUi: unknown): void {}
}

const mockAsmUi: AsmUi = {
  collapsed: false,
};

describe('AsmToggleuUiComponent', () => {
  let component: AsmToggleUiComponent;
  let fixture: ComponentFixture<AsmToggleUiComponent>;
  let asmService: AsmService;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AsmToggleUiComponent],
      providers: [{ provide: AsmService, useClass: MockAsmService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmToggleUiComponent);
    component = fixture.componentInstance;
    asmService = TestBed.inject(AsmService);
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display expandIcon when AsmUi collapse state is true', () => {
    vi.spyOn(asmService, 'getAsmUiState').mockReturnValue(of({ collapsed: true }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.expandIcon'))).toBeTruthy();
    expect(el.query(By.css('.collapseIcon'))).toBeFalsy();
  });

  it('should display collapseIcon when AsmUi collapse state is false', () => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('.expandIcon'))).toBeFalsy();
    expect(el.query(By.css('.collapseIcon'))).toBeTruthy();
  });

  it('should call toggleUi() and toggle the collapse value', () => {
    fixture.detectChanges();
    vi.spyOn(asmService, 'updateAsmUiState').mockImplementation(() => {});

    el.query(By.css('.toggleUi')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );

    fixture.detectChanges();

    expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
      collapsed: true,
    });
  });
});
