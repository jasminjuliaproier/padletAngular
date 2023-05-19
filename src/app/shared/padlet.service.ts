import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";
import {Entrie} from "./entrie";
import {Rating} from "./rating";
import {Comment} from "./comment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PadletService {
  private api = 'http://padlet.s2010456040.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  getPadlets(): Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  findPadletByPadletID(id:number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  getEntries() : Observable<Array<Entrie>>{
    return this.http.get<Array<Entrie>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  findEntrieByPadletId(id:number, entrie_id:number) : Observable<Entrie>{
    return this.http.get<Entrie>(`${this.api}/padlets/${id}/entries/${entrie_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  findRatingsByEntrieID(id: number) : Observable<Array<Rating>> {
    return this.http.get<Array<Rating>>(`${this.api}/entries/${id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  findCommentsByEntrieID(id: number) : Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.api}/entries/${id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //Padlet erstellen
  create(padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Padlet löschen
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Entrie erstellen
  createEntrie(id:number, entrie: Entrie): Observable<any> {
    return this.http.post(`${this.api}/padlets/${id}entries`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //Entrie löschen
  removeEntrie(id: number): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
