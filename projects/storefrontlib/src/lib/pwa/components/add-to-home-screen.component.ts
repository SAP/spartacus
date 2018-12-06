import { OnInit } from '@angular/core';
import { AddToHomeScreenService } from './../services/add-to-home-screen.service';
import { Observable } from 'rxjs';

export abstract class AddToHomeScreenComponent implements OnInit {
  canPrompt$: Observable<boolean>;
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {}

  ngOnInit() {
    this.canPrompt$ = this.addToHomeScreenService.canPrompt$;
  }

  prompt(): void {
    this.addToHomeScreenService.firePrompt();
  }
}
