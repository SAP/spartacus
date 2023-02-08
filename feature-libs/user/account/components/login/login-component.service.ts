import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginComponentService {
  isCdpEnabled: string = "false";

  constructor() { }
}
