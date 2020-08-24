import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {formatCurrency, formatDate} from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  productForm: FormGroup;   // Форма для ввода данных
  // id = 1;
  // tslint:disable-next-line:variable-name
  prodName = '';
  // tslint:disable-next-line:variable-name
  prodDesc = '';
  // tslint:disable-next-line:variable-name
  prod_price: number = null;
  // tslint:disable-next-line:variable-name
  updatedAt: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  getProduct(id: any) {
    // Запрос продукта у сервиса
    console.log('getProduct id= ' + id);
    this.api.getProduct(id).subscribe((data: any) => {
      this.id = data.id;
      // Заполнение формы ввода данных
      this.productForm.setValue({
        prod_name: data.prod_name,
        prod_desc: data.prod_desc,
        prod_price: formatCurrency(data.prod_price, 'en-EN', '', 'RUB'),
        updated_at: formatDate(data.updated_at,'yyyy-MM-dd', 'en-EN' )
      });
      console.log('data.prodName = ' + data.prod_name);
    });
  }

  onFormSubmit() {
    // Прием данных с заполненной формы добавления продукта
    console.log(this.productForm.value);
    this.prod_price = this.productForm.get('prod_price').value;
    // Приведение формата для цены
    this.productForm.patchValue({prod_price: this.prod_price});
    // console.log('onFormSubmit product price = ' + this.productForm.get('prodPrice').value);
    // console.log('onFormSubmit product updated = ' + this.productForm.get('updatedAt').value);
    console.log('this.prodPrice = ' + this.prod_price);
    console.log(this.productForm.value);
    this.isLoadingResults = true;
    // Сохранение данных на сервисе
    this.api.updateProduct(this.id, this.productForm.value)
      .subscribe((res: any) => {
          // const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/product-details', this.id]);
          console.log('onFormSubmit id= ' + this.id);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this.id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    console.log('Edit OnInit id = ' + this.id);
    this.getProduct(this.id);
    // this.getProduct(this.route.snapshot.params[this.id]);
    // Создание формы ввода данных
    this.productForm = this.formBuilder.group({
      prod_name : [null, Validators.required],
      prod_desc : [null, Validators.required],
      prod_price : [null, Validators.required],
      updated_at : [null, Validators.required]
    });
  }

}
