import { ProductFormComponent } from './product-form/product-form.component';
import {ProductSelectorComponent } from './product-selector/product-selector.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products/:id', component: ProductFormComponent },
  { path: ' ', component:  ProductSelectorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
