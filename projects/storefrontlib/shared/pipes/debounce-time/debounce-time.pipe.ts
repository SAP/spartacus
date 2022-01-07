import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Pipe({
  name: 'cxDebounceTime',
})
export class DebounceTimePipe<T> implements PipeTransform {
  transform(observable: Observable<T>, time = 430): Observable<T> {
    return observable.pipe(debounceTime(time));
  }
}
