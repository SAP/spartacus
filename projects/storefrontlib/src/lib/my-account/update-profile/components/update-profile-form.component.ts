import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, User } from '@spartacus/core';

@Component({
  selector: 'cx-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss'],
})
export class UpdateProfileFormComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  titles: Title[];

  @Output()
  submited = new EventEmitter<{ uid: string; userUpdates: User }>();

  @Output()
  cancelled = new EventEmitter<void>();

  form = this.fb.group({
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  private submitClicked = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  isNotValid(formControlName: string): boolean {
    return (
      this.form.get(formControlName).invalid &&
      (this.submitClicked ||
        (this.form.get(formControlName).touched &&
          this.form.get(formControlName).dirty))
    );
  }

  onSubmit(): void {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }

    this.submited.emit({
      uid: this.user.uid,
      userUpdates: { ...this.form.value },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
