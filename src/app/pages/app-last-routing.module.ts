import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatcher } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { productRoute } from './product/product.route';

export class CustomRoute<T> {
  constructor(public format: RegExp, public matcher: UrlMatcher, public generateUrl: (props: T) => string) {}
}

const routes: Routes = [
  {
    matcher: productRoute.matcher,
    loadChildren: () => import('./product/product-page.module').then(m => m.ProductPageModule),
    canActivate: [MetaGuard],
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AppLastRoutingModule {}
