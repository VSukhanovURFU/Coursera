// Добавление нового продукта
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {
// Форма для ввода полей
  productForm: FormGroup;
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  updated_at: Date = new Date();
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Создание формы ввода
    this.productForm = this.formBuilder.group({
      id: [null],
      prod_name : [null, Validators.required],
      prod_desc : [null, Validators.required],
      prod_price : ['00', Validators.required],
      updated_at : [this.updated_at, Validators.required]
    });
  }
  onFormSubmit() {
    // Сохранение продукта через сервис
    this.isLoadingResults = true;
    this.api.addProduct(this.productForm.value)
      .subscribe((res: any) => {
        console.log('res = ' + res);
        // const id = res._id;
        this.isLoadingResults = false;
        console.log('addProduct')
        // this.router.navigate(['/product-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


}
