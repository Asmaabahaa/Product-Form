import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = PRODUCTS;
    return { products };
  }

  genId(products: Product[]): number {
    return products.length > 0
      ? Math.max(...products.map((product: Product) => product.id)) + 1
      : 11;
  }
}
