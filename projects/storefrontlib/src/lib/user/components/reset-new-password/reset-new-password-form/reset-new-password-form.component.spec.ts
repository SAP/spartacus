import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetNewPasswordFormComponent } from './reset-new-password-form.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

describe('ResetNewPasswordFormComponent', () => {
  let component: ResetNewPasswordFormComponent;
  let fixture: ComponentFixture<ResetNewPasswordFormComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetNewPasswordFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetNewPasswordFormComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['repassword'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });
});
