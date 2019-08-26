import { Pipe, PipeTransform } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { UrlCommands } from './url-command';

@Pipe({
  name: 'cxUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlService: SemanticPathService) {}

  transform(commands: UrlCommands): any[] {
    return this.urlService.transform(commands);
  }
}
