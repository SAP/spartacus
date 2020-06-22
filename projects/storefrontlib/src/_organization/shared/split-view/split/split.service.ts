import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplitService {
  level: BehaviorSubject<number> = new BehaviorSubject(0);

  get level$(): Observable<number> {
    return this.level;
  }

  levelUp() {
    this.level.next(this.level.value + 1);
  }

  levelDown() {
    this.level.next(this.level.value - 1);
  }
}
