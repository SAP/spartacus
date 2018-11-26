import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlSegmentGroup, PRIMARY_OUTLET } from '@angular/router';

@Injectable()
export class UrlParser {
  constructor(private router: Router) {}

  getPrimarySegments(url: string): string[] {
    const urlTree = this.router.parseUrl(url);
    return this._getPrimarySegmentsFromUrlTree(urlTree.root);
  }

  private _getPrimarySegmentsFromUrlTree(tree: UrlSegmentGroup): string[] {
    const segments = tree.segments.map(s => s.path);
    const childrenSegments = tree.children[PRIMARY_OUTLET]
      ? this._getPrimarySegmentsFromUrlTree(tree.children[PRIMARY_OUTLET])
      : [];
    return segments.concat(childrenSegments);
  }
}
