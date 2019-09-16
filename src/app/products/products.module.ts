import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';
import { ProductsResolver } from './products.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    resolve: {
      data: ProductsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsPage],
  providers: [
    ProductsResolver
  ]
})
export class ProductsPageModule {}
