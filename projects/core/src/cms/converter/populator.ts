import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class Populator {
  abstract populate(source): void;
}
