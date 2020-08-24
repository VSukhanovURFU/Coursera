// Просмотр детали в отдельном окне
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
// @ts-ignore
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = { id: '', prod_name: '', prod_desc: '', prod_price: null, updated_at: null };
  isLoadingResults = true;
  private id: any;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getProductDetails(id: any) {
    // Запрос детали по ключу у сервиса
    this.api.getProduct(id)
      .subscribe((data: any) => {
        this.product = data;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id: any) {
    // Удаление детали через сервис
    this.isLoadingResults = true;
    this.id = id;
    this.api.deleteProduct(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params.id);
  }

}
