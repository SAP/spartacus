import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CsAgentAuthService } from '@spartacus/core';

@Component({
  selector: 'cx-csagent-login-form',
  templateUrl: './csagent-login-form.component.html',
  styleUrls: ['./csagent-login-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CSAgentLoginFormComponent implements OnInit {
  csAgentLoginForm: FormGroup;

  @Input()
  csAgentTokenLoading = false;

  @Output()
  submitEvent = new EventEmitter<{ userId: string; password: string }>();

  constructor(
    private fb: FormBuilder,
    private csAgentAuthService: CsAgentAuthService
  ) {}

  ngOnInit(): void {
    this.csAgentLoginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.csAgentLoginForm.valid) {
      this.submitEvent.emit({
        userId: this.csAgentLoginForm.get('userId').value,
        password: this.csAgentLoginForm.get('password').value,
      });
    } else {
      this.csAgentLoginForm.markAllAsTouched();
    }
  }

  loginWithImplicitFlow() {
    this.csAgentAuthService.authorizeCustomerSupportAgent();
  }
}
