import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { ApiResponse, Product } from '@medium/libs';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '@medium/ui';

@Component({
  imports: [NgFor, RouterModule, ButtonComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'products';
  productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((res: ApiResponse<Product[]>) => (this.products = res.data));
  }
}
