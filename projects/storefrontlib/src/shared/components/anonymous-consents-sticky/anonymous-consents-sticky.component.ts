import { Component, OnInit } from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  AuthService,
  ConsentTemplate,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-anonymous-consents-sticky',
  styleUrls: ['./anonymous-consents-sticky.component.scss'],
  templateUrl: './anonymous-consents-sticky.component.html',
})
export class AnonymousConsentsStickyComponent implements OnInit {
  private dialogOpen = false;

  isUserLoggedIn$: Observable<boolean>;
  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  constructor(
    private authService: AuthService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.authService.isUserLoggedIn();
    this.templates$ = this.anonymousConsentsService.getAnonymousConsentTemplates();
    this.consents$ = this.anonymousConsentsService.getAnonymousConsents();
  }

  toggleDialog(): void {
    this.dialogOpen = !this.dialogOpen;
  }
}
