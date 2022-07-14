import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';


describe('ConfiguratorConflictSolverDialogComponent', () => {
  let component: ConfiguratorConflictSolverDialogComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSolverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorConflictSolverDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorConflictSolverDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
