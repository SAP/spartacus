import { Injectable, Injector } from '@angular/core';
import { SearchBoxComponentService } from '../../../storefrontlib/src/lib/cms-lib/search-box/search-box-component.service';
import { combineLatest, of } from 'rxjs';

@Injectable()
export class MySearchBoxServiceService extends SearchBoxComponentService {

  search = test$ => combineLatest(test$, of('Hello!'));

}
