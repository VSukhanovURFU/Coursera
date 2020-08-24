import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
// @ts-ignore
import { Product } from '../product';
import {DateAdapter, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../product-edit/product-edit.component';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filterForm: FormGroup;
  dateFrom: Date = null;
  dateTo: Date = null;
  matcher = new MyErrorStateMatcher();

  displayedColumns: string[] = ['id', 'prod_name', 'prod_price', 'updated_at'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  data: Product[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  // tslint:disable-next-line:variable-name
  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource<Product>();
    this.filterForm = this.formBuilder.group({
      dateFrom : [null, Validators.required],
      dateTo : [null, Validators.required]
    });

    this.filterForm.setValue({
      dateFrom: formatDate(new Date(),'dd.MM.yyyy', 'en-EN' ),
      dateTo:   formatDate(new Date(),'dd.MM.yyyy', 'en-EN' )
    });

    this.api.getProducts()
      .subscribe((res: Product[]) => {
        this.dataSource.data = res;
        this.data = res;
        console.log('this.dataSource = ', this.dataSource.data);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  onFormSubmit() {
    console.log('this.filterForm.value = ', this.filterForm.value);
    console.log('filterForm.dateFrom = ', this.filterForm.get('dateFrom'));
    console.log('filterForm.dateTo =   ', this.filterForm.get('dateTo'));
    this.dateFrom = new Date(this.filterForm.get('dateFrom').value);
    this.dateTo   = new Date(this.filterForm.get('dateTo').value);
    // this.dateFrom = formatDate(this.dateFrom,'dd.MM.yyyy', 'en-EN' );
    // this.dateTo = formatDate(this.dateTo,'dd.MM.yyyy', 'en-EN' );

    this.isLoadingResults = true;
    console.log('this.dateFrom = ', this.dateFrom);
    console.log('this.dateTo = ', this.dateTo);
    // this.api.getProducts()
    this.api.getProductsFromDates(this.dateFrom, this.dateTo)
      .subscribe(res => {
        this.dataSource.data = res;
        this.data = res;
        console.log('res = ', res);
        console.log('this.dataSource = ', this.dataSource);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
