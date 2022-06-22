import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { AsmUi, StateWithAsm } from '@spartacus/asm/core';
import { AsmFacade } from '@spartacus/asm/root';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromReducers from '../../core/store/reducers/index';
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
  let asmFacade: AsmFacade;
  let el: DebugElement;
  let store: Store<StateWithAsm>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature('asm', fromReducers.getReducers()),
        ],
        declarations: [AsmToggleUiComponent],
        providers: [{ provide: AsmFacade, useClass: MockAsmService }],
      }).compileComponents();

      store = TestBed.inject(Store);
      spyOn(store, 'dispatch').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmToggleUiComponent);
    component = fixture.componentInstance;
    asmFacade = TestBed.inject(AsmFacade);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display expandIcon when AsmUi collapse state is true', () => {
    spyOn(asmFacade, 'getAsmUiState').and.returnValue(of({ collapsed: true }));

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
    spyOn(asmFacade, 'updateAsmUiState').and.stub();

    el.query(By.css('.toggleUi')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );

    fixture.detectChanges();

    expect(asmFacade.updateAsmUiState).toHaveBeenCalledWith({
      collapsed: true,
    });
  });
});
