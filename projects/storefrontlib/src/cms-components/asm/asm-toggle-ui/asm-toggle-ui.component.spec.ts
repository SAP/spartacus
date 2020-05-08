import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AsmToggleUiComponent } from './asm-toggle-ui.component';

describe('AsmToggleuUiComponent', () => {
  let component: AsmToggleUiComponent;
  let fixture: ComponentFixture<AsmToggleUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsmToggleUiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmToggleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
