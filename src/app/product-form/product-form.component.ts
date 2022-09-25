import { ProductService } from './../product.service';
import { Product } from './../product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 1,
    name: 'New Product',
    type: 1,
    category: '',
    subCategory: false,
    password: ''
  };

  isNewProduct: boolean = false;
  afterSaving!: boolean;
  constructor(
    private route: ActivatedRoute,
    private routerService: Router,
    private productService: ProductService,
    private modalService: NgbModal,
  ) {
   }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.isNewProduct = routeId === 'new';
    if (!this.isNewProduct) {
      this.product =
        this.productService.getProduct(parseInt(routeId!, 10)) || this.product;
    }
  }

  save(saveUpdates: any) {
    if (this.isNewProduct) {
      console.log("ana new product", this.isNewProduct)
      this.product.id = this.genId();
      this.productService.addProduct(this.product);
      this.routerService.navigate(['/']) 
      .then(() => {
        setTimeout(function(){
          window.location.reload();
       }, 1000);
      });
    } else {
      this.modalService.open(saveUpdates);
    }
  }

  SaveUpdates() {
    this.productService.updateProduct(this.product);
    this.modalService.dismissAll();
    this.routerService.navigate(['/'])
    .then(() => {
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    });
  }
  deleteRequest(content: any) {
    this.modalService.open(content, { centered: true });
  }
  modalDeleteBtn() {
    this.productService.deleteProduct(this.product.id);
    this.modalService.dismissAll();
    this.routerService.navigate(['/'])
    .then(() => {
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    });
  
  }
  genId(): number {
    let products = this.productService.getProducts()
    return products.length > 0
      ? Math.max(...products.map((product: Product) => product.id)) + 1
      : 11;
  }
}
