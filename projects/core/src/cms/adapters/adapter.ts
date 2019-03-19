import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class Adapter {
  abstract convert(source): void;
}
