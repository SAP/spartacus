import { Component, OnInit } from '@angular/core';
import { MyInterestsService } from '@spartacus/core';
import { AuthService, UserService, ProductInterestList } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

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

  constructor(
    private interestService: MyInterestsService,
    private auth: AuthService,
    private userService: UserService
  ) {}

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

  removeInterests(item: any): void {
    this.interestService
      .removeInterests(this.user_id, item)
      .subscribe(
        () =>
          (this.interests$ = this.interestService.removeInterests(
            this.user_id,
            0
          ))
      );
  }
}
