import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap, map, filter} from 'rxjs/operators';
// @ts-ignore
import { Product } from './product';
import {formatDate} from '@angular/common';
// import {fromArray} from 'rxjs/internal/observable/fromArray';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpResult: Observable<Product[]>;
  res: Product[] = [];
  result: Product[] = [];
  dfrom = '';
  dto   = '';

  constructor(private http: HttpClient) {
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        // map(prods => prods.map(prod => {
        //  prod.updated_at = new Date(prod.updated_at);
        //  return prod;
        // })),
        tap(product => console.log('getProducts=', product)),
        catchError(this.handleError('getProducts', []))
      );
  }

  // @ts-ignore
  getProductsDates(fromD: Date, toD: Date): Observable<Product[]> {
    console.log('getProductsDate start ' + fromD + ' / ' + toD);
    this.httpResult = this.getProducts();
    console.log('this.httpResult = ', this.httpResult);
    return this.httpResult.pipe(
      map(products =>
        products.filter(prod => prod.updated_at.getTime() >= fromD.getTime() && prod.updated_at.getTime() <= toD.getTime())));
  }

  // @ts-ignore
  getProductsFromDates(fromD: Date, toD: Date): Observable<Product[]> {
    this.dfrom = formatDate(fromD, 'dd.MM.yyyy', 'en');
    this.dto  =  formatDate(toD, 'dd.MM.yyyy', 'en');
    //  this.dfrom = fromD | date: 'dd.MM.yyyy';
    // this.dto  =  formatDate(toD, 'dd.MM.yyyy', 'US');
    console.log('getProductsDate start ', fromD, ' / ', toD);
    this.httpResult = this.http.get<Product[]>(apiUrl +
      '/interval?fromD=' + this.dfrom + '&toD=' + this.dto);
    console.log('this.httpResult = ', this.httpResult);
    return this.httpResult;
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((prod: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(id: any, product: Product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id: any): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}
