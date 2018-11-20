import { Injectable } from '@angular/core';
import { PathPipeService } from './path-pipe.service';
import { DynamicUrlRecognizerService } from './dynamic-url-recognizer.service';

@Injectable()
export class DynamicUrlPipeService {
  constructor(
    private pathService: PathPipeService,
    private dynamicUrlRecognizerService: DynamicUrlRecognizerService
  ) {}

  transform(path: string) {
    const {
      pageName,
      parameters
    } = this.dynamicUrlRecognizerService.getPageAndParameters(path);

    if (!pageName) {
      return path;
    }
    return this.pathService.transform(pageName, parameters);
  }
}
