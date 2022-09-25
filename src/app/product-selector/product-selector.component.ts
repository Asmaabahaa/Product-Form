import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.sass'],
})
export class ProductSelectorComponent implements OnInit {
  products!: Product[];
  private searchTerms = '';
  selectedProduct!: Product;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute ) {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.selectedProduct = this.productService.getProduct(parseInt(routeId!, 10)) || this.selectedProduct;
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  search(term: string): void {
    this.products = this.productService.searchProducts(term);
  }
}
