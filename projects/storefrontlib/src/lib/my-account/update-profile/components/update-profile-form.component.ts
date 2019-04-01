import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, User } from '@spartacus/core';

@Component({
  selector: 'cx-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss'],
  // TODO:#1146 - do we need to set this manually? Search slack for Kris' message
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProfileFormComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  titles: Title[];

  @Output()
  submited = new EventEmitter<{ uid: string; form: FormGroup }>();

  form = this.fb.group({
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // TODO:#1146 - patchValue() vs setValue()?
    this.form.patchValue(this.user);
  }

  onSubmit(): void {
    this.submited.emit({ uid: this.user.uid, form: this.form });
  }
}
