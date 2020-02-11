import { UrlMatchResult, UrlSegment } from '@angular/router';

import { CategoryView } from 'ish-core/models/category-view/category-view.model';
import { ProductView } from 'ish-core/models/product-view/product-view.model';

import { CustomRoute } from '../app-last-routing.module';

function generateProductSlug(product: ProductView) {
  return product && product.name ? product.name.replace(/[^a-zA-Z0-9-]+/g, '-').replace(/-+$/g, '') : undefined;
}

/**
 * Generate a product detail route with optional category context.
 * @param product   The Product to genereate the route for
 * @param category  The optional Category that should be used as context for the product route
 * @returns         Product route string
 */

export function generateClassicUrl(props: { product: ProductView; category?: CategoryView }): string {
  const product = props.product;
  const category = props.category;

  if (!(product && product.sku)) {
    return '/';
  }
  let route = '/product/' + product.sku;
  const productSlug = generateProductSlug(product);
  if (productSlug) {
    route += '/' + productSlug;
  }

  if (category) {
    route = `/category/${category.uniqueId}${route}`;
  } else {
    // TODO: add defaultCategory to route once this information is available with the products REST call
  }
  return route;
}

const classicFormat = new RegExp('^/(category/([^/]+)/)?product/([^/]+)(/(.*))?$');

export function matchClassicUrl(segments: UrlSegment[]): UrlMatchResult {
  const url = '/' + segments.join('/');
  if (classicFormat.test(url)) {
    const match = classicFormat.exec(url);

    const posParams: { [id: string]: UrlSegment } = {};
    if (match[2]) {
      posParams.categoryUniqueId = new UrlSegment(match[2], {});
    }
    if (match[3]) {
      posParams.sku = new UrlSegment(match[3], {});
    }
    if (match[5]) {
      posParams.slug = new UrlSegment(match[5], {});
    }

    return {
      consumed: segments,
      posParams,
    };
  }
  return;
}

export const classicProductRoute: CustomRoute<{ product: ProductView; category?: CategoryView }> = {
  format: classicFormat,
  generateUrl: generateClassicUrl,
  matcher: matchClassicUrl,
};

const newFormat = new RegExp('^/?(.*)?/(.*)?/sku([^/]+).*$');

export function matchNewUrl(segments: UrlSegment[]): UrlMatchResult {
  const url = '/' + segments.join('/');
  if (newFormat.test(url)) {
    const match = newFormat.exec(url);
    const posParams: { [id: string]: UrlSegment } = {};
    if (match[1]) {
      posParams.categoryUniqueId = new UrlSegment(match[1].replace(/\//g, '.'), {});
    }
    if (match[3]) {
      posParams.sku = new UrlSegment(match[3], {});
    }
    if (match[2]) {
      posParams.slug = new UrlSegment(match[2], {});
    }
    return {
      consumed: segments,
      posParams,
    };
  }
  return;
}

export function generateNewUrl(props: { product: ProductView; category?: CategoryView }): string {
  const product = props.product;

  if (!(product && product.sku)) {
    return '/';
  }
  let route = '/';
  if (props.category) {
    route += props.category.uniqueId.replace(/\./g, '/');
  }

  route += `/${generateProductSlug(product)}/sku${product.sku}`;
  return route;
}

export const newProductRoute: CustomRoute<{ product: ProductView; category?: CategoryView }> = {
  format: newFormat,
  generateUrl: generateNewUrl,
  matcher: matchNewUrl,
};

// tslint:disable-next-line: no-commented-out-code
// export const productRoute = classicProductRoute;
export const productRoute = newProductRoute;
