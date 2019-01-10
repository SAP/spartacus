import { Component, OnInit } from '@angular/core';
import { CmsBreadcrumbsComponent } from '@spartacus/core';
import { BreadCrumb } from './breadcrumb';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CMSComponentDataImpl } from '../../cms/components/cms-component-data-impl';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: CmsBreadcrumbsComponent[];

  constructor(
    public component: CMSComponentDataImpl<CmsBreadcrumbsComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    const breadcrumb: CmsBreadcrumbsComponent = {
      label: 'Home',
      url: ''
    };

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        // set breadcrumbs
        console.log(event);
        const root: ActivatedRoute = this.route.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
        this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      });
  }
  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: CmsBreadcrumbsComponent[] = []
  ): CmsBreadcrumbsComponent[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      // append route URL to URL
      url += `/${routeURL}`;

      // call splitRoute and save updated url in urlParams
      const urlParam = this.splitRoute(child);
      // create map for key value pair of params
      const map = new Map();
      Object.keys(child.snapshot.params).forEach(k => {
        map.set(k, child.snapshot.params[k]);
      });
      // create label to display on breadcrumb with/without dynamic values
      let breadcrumbLabel: string;
      if (map.get(urlParam) !== undefined) {
        breadcrumbLabel =
          child.snapshot.data[ROUTE_DATA_BREADCRUMB] +
          ' / ' +
          map.get(urlParam);
      } else {
        breadcrumbLabel = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      }
      // add breadcrumb
      const breadcrumb: BreadCrumb = {
        label: breadcrumbLabel,
        url: url
      };
      breadcrumbs.push(breadcrumb);
      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  // split route if dynamic attributes exist
  splitRoute(child: ActivatedRoute): any {
    let urlParam;
    if (child.snapshot.routeConfig.path.includes(':')) {
      urlParam = child.snapshot.routeConfig.path.split(':')[1];

      if (urlParam.includes('/')) {
        urlParam = urlParam.slice(0, urlParam.indexOf('/'));
      }
    }
    return urlParam;
  }
}
