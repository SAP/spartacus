import { Component, OnInit } from '@angular/core';

import { UserService } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  error$: Observable<boolean>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;

  constructor(private userService: UserService) {
    console.log(`update profile component constructor`);
  }

  ngOnInit() {
    console.log(`update profile component ngOnInit`);

    this.userService.updatePersonalDetails('xxx@xxx.xxx', {
      firstName: 'New N',
      lastName: 'New Z'
    });

    this.error$ = this.userService.getUpdatePersonalDetailsResultError();
    this.loading$ = this.userService.getUpdatePersonalDetailsResultLoading();
    this.success$ = this.userService.getUpdatePersonalDetailsResultSuccess();
  }
}
