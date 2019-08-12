import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserToken } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm.component.html',
})
export class AsmComponent implements OnInit {
  loginForm: FormGroup;
  csAgentToken$: Observable<UserToken>;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.csAgentToken$ = this.auth.getCustomerSupportAgentToken();
  }

  loginCustomerSupportAgent(): void {
    console.log(
      'Login asm agent:',
      this.loginForm.controls.userId.value,
      this.loginForm.controls.password.value
    );
    this.auth.authorizeCustomerSupporAgent(
      this.loginForm.controls.userId.value,
      this.loginForm.controls.password.value
    );
  }

  logoutCustomerSupportAgent(): void {
    console.log('Logut asm agent.');
  }
}
