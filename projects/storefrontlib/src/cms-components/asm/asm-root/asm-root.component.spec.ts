import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AsmService, AsmUi } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmRootComponent } from './asm-root.component';
@Component({
  selector: 'cx-asm-main-ui',
  template: '',
})
class MockAsmMainUiComponent {}

class MockAsmService {
  getAsmUiState(): Observable<AsmUi> {
    return of({} as AsmUi);
  }
  updateAsmUiState(): void {}
}

const mockQueryParamMap = {
  get(): string {
    return '';
  },
};
const activatedRouteMock = {
  queryParamMap: of(mockQueryParamMap),
};

describe('AsmRootComponent', () => {
  let component: AsmRootComponent;
  let fixture: ComponentFixture<AsmRootComponent>;
  let el: DebugElement;
  let asmService: AsmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsmRootComponent, MockAsmMainUiComponent],
      providers: [
        { provide: AsmService, useClass: MockAsmService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    asmService = TestBed.get(AsmService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the main asm UI if UI state is visisble', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ visible: true }));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-asm-main-ui'))).toBeTruthy();
  });

  it('should update UI visible state if the activated route has query param ?asm=true', () => {
    spyOn(asmService, 'updateAsmUiState').and.stub();
    spyOn(mockQueryParamMap, 'get').and.returnValue('true');
    component.ngOnInit();
    fixture.detectChanges();
    expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
      visible: true,
    });
  });

  it('should not show the main asm UI if UI state is not visisble', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ visible: false }));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-asm-main-ui'))).toBeFalsy();
  });

  describe('Minimize ASM UI', () => {
    it('should expand the ASM UI when the expand arrow button is clicked', () => {
      spyOn(asmService, 'updateAsmUiState').and.stub();
      component.ngOnInit();
      fixture.detectChanges();
      const expandBtn = fixture.debugElement.query(By.css('button'));
      expandBtn.nativeElement.click();
      expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
        expanded: true,
      });
    });

    it('should collapse the ASM UI when the collapse button is clicked', () => {
      spyOn(asmService, 'updateAsmUiState').and.stub();
      component.ngOnInit();
      component.expanded = true;
      fixture.detectChanges();
      const collapseBtn = fixture.debugElement.query(By.css('button'));
      collapseBtn.nativeElement.click();
      expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
        expanded: false,
      });
    });
  });
});
