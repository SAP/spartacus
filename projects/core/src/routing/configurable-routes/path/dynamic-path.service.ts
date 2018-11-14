import { Injectable } from '@angular/core';
import { PathService } from './path.service';
import { PathRecognizerService } from './path-recognizer.service';

@Injectable()
export class DynamicPathService {
  constructor(
    private pathService: PathService,
    private pathRecognizerService: PathRecognizerService
  ) {}

  transform(path: string) {
    const {
      pageName,
      parameters
    } = this.pathRecognizerService.getMatchingPageAndParameters(path);

    if (!pageName) {
      return path;
    }
    return this.pathService.transform(pageName, parameters);
  }
}
