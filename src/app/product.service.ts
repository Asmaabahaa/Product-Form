import { MessageService } from './message.service';
import { PRODUCTS } from './mock-products';
import { Product } from './product';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private notifierService: NotifierService) {
    this.notifierService = notifierService;
  }

  getProducts(): Product[] {
    let localProducts = localStorage.getItem('products');
    let products: Product[] = localProducts
      ? JSON.parse(localProducts)
      : PRODUCTS;
    return products;
  }

  getProduct(id: number): Product | null {
    let products = this.getProducts();
    return products.find((product) => product.id === id) || null;
  }
  /** POST: add a new product to local storage */
  addProduct(product: Product): Product {
    let products = this.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    this.notifierService.notify('success', 'Product added successfully');
    return product;
  }

  /** DELETE: delete the product from local storage */
  deleteProduct(id: number): boolean {
    let products = this.getProducts();
    products = products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    this.notifierService.notify('success', 'Product deleted successfully');
    return true;
  }

  /** PUT: update the product on local storage */
  updateProduct(product: Product): Product {
    let products: Product[] = this.getProducts();
    products = products.map(
      (p: Product): Product => (p.id === product.id ? product : p)
    );
    localStorage.setItem('products', JSON.stringify(products));
    
    this.notifierService.notify('success', 'Product updated successfully');
    return product;
  }

  searchProducts(term: string): Product[] {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return this.getProducts();
    }
    return this.getProducts().filter((product) =>
      product.name.toLowerCase().includes(term.trim().toLowerCase())
    );
  }

}
