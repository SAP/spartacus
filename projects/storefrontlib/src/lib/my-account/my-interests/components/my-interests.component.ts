import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserService, ProductInterestList } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ProductInterestRelation } from '@spartacus/core';
@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
  styleUrls: ['./my-interests.component.scss'],
})
export class MyInterestsComponent implements OnInit, OnDestroy {
  interests$: Observable<ProductInterestList>;
  loaded$: Observable<boolean>;
  subscription: Subscription;
  userId: string;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.auth.getUserToken().subscribe(userData => {
      if (userData && userData.userId) {
        this.userId = userData.userId;
      }
    });
    this.interests$ = this.userService.getProdutInterests(this.userId, 100);
    this.loaded$ = this.userService.getProdutInterestsLoaded();
  }

  removeInterests(result: ProductInterestRelation): void {
    if (this.userId) {
      this.userService.deleteProdutInterest(this.userId, result);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.userService.clearProductInterests();
  }
}
