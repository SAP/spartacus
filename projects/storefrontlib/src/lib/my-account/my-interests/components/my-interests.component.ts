import { Component, OnInit } from '@angular/core';
import { MyInterestsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AuthService } from '@spartacus/core';

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
  userId: string;

  constructor(
    private interestService: MyInterestsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserToken().subscribe(token => {
      this.userId = token.userId;
      this.interests$ = this.interestService.getInterests(
        token.userId,
        this.PAGE_SIZE
      );
    });
  }

  pageChange(page: number) {
    this.interests$ = this.interestService.getInterests(this.userId, page);
  }

  removeInterests(item: any): void {
    this.interestService
      .removeInterests(this.userId, item)
      .subscribe(
        () =>
          (this.interests$ = this.interestService.getInterests(this.userId, 0))
      );
  }
}
