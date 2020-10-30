import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, User } from '@spartacus/core';

@Component({
  selector: 'cx-update-profile-form',
  templateUrl: './update-profile-form.component.html',
})
export class UpdateProfileFormComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  titles: Title[];

  @Output()
  submitted = new EventEmitter<{ userUpdates: User }>();

  @Output()
  cancelled = new EventEmitter<void>();

  updateProfileForm: FormGroup = this.fb.group({
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    customerId: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.user) {
      this.updateProfileForm.patchValue(this.user);
    }
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      this.submitted.emit({
        userUpdates: { ...this.updateProfileForm.value },
      });
    } else {
      this.updateProfileForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
