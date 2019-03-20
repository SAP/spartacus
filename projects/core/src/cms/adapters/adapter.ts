import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class Adapter<S, T> {
  abstract convert(source: S, target: T): void;
}
