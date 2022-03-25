import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { ResponseCountries } from 'src/app/model/response-countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl = 'https://api.worldbank.org/v2/country';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCountries(): Observable<ResponseCountries[]> {
    return this.http.get<ResponseCountries[]>(this.countryUrl + "?format=json")
    .pipe(
      tap(_ => this.log('fetched country')),
      catchError(this.handleError<ResponseCountries[]>('getCountries', []))
    );
  }

  getCountry(id: string): Observable<any[]> {
    const url = `${this.countryUrl}/${id}/indicators/SI.POV.DDAY?format=json&per_page=10`;
    console.log(url)
    return this.http.get<any[]>(url)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<any[]>('getCountry', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CountryService: ${message}`);
  }
}
