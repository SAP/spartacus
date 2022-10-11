import { Observable } from 'rxjs';

export class Customer360SectionData<Data> {
  constructor(public data: Observable<Data>) {}
}
