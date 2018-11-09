import { Component, OnInit } from '@angular/core';
import { AddToHomeScreenService } from './../../../../pwa/services/add-to-home-screen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-add-to-home-screen-banner',
  styleUrls: ['./add-to-home-screen-banner.component.scss'],
  templateUrl: './add-to-home-screen-banner.component.html'
})
export class AddToHomeScreenBannerComponent implements OnInit {
  canPrompt$: Observable<boolean>;
  constructor(private addToHomeScreenService: AddToHomeScreenService) {}

  ngOnInit() {
    this.canPrompt$ = this.addToHomeScreenService.canPrompt$;
  }

  prompt() {
    this.addToHomeScreenService.firePrompt();
  }
}
