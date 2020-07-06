import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })

export class TruncateTextService {
    isShow = false;

    paragraphLimiter(desc: string, defaultCharacters: number) {
        let formatDesc = (this.isShow) ? desc : desc.substring(0, defaultCharacters);
        return formatDesc;
    }

    toggleDesc() {
        this.isShow = !this.isShow;
    }
}