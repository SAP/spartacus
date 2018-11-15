import { Injectable } from '@angular/core';
import { PathPipeService } from './path-pipe.service';
import { PathRecognizerService } from './path-recognizer.service';

@Injectable()
export class DynamicPathPipeService {
  constructor(
    private pathService: PathPipeService,
    private pathRecognizerService: PathRecognizerService
  ) {}

  transform(path: string) {
    const {
      pageName,
      parameters
    } = this.pathRecognizerService.getPageAndParameters(path);

    if (!pageName) {
      return path;
    }
    return this.pathService.transform(pageName, parameters);
  }
}
