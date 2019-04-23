import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ProductInterestRelation } from '@spartacus/core';
@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
  styleUrls: ['./my-interests.component.scss'],
})
export class MyInterestsComponent implements OnInit {
  sortType: string;
  sortLabels = {
    byName: 'Name',
  };
  private PAGE_SIZE = 5;

  interests$: Observable<any>;
  isLoaded$: Observable<boolean>;
  subscription: Subscription;
  user_id: string;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.auth.getUserToken().subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.interests$ = this.userService.getProdutInterestsList(
      this.user_id,
      this.PAGE_SIZE
    );
  }

  pageChange(page: number) {
    this.interests$ = this.userService.getProdutInterestsList(
      this.user_id,
      page
    );
  }

  removeInterests(result: ProductInterestRelation): void {
    if (this.user_id) {
      this.userService.deleteProdutInterest(this.user_id, result);
    }
  }
}
