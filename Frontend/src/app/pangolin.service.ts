import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pangolin } from './pangolin';

@Injectable({
  providedIn: 'root'
})
export class PangolinService {

  API_Url: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  addPangolin(pangolin: Pangolin): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(`${this.API_Url}/users/sign-up`, pangolin, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, {}))
    )
  };

  getPangolinsList(token: string): Observable<Pangolin[]> {
    return this.http.get<Pangolin[]>(`${this.API_Url}/users/pangolins-list/${token}`).pipe(
      tap((pangolinsList => this.log(pangolinsList))),
      catchError((error) => 
        this.handleError(error, [])
      )
    );
  };

  getPangolinDetail(token: string): Observable<Pangolin> {
    return this.http.get<Pangolin>(`${this.API_Url}/users/pangolin-detail/${token}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, {}))
    );
  };

  updatePangolin(pangolin: Pangolin): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<{}>(`${this.API_Url}/users/edit-pangolin`, pangolin, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  };

  addFriendFromList(tokens: {}): Observable<Pangolin[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<Pangolin[]>(`${this.API_Url}/users/add-friend`, tokens, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  };

  getFriendList(token: string): Observable<Pangolin[]> {
    return this.http.get<Pangolin[]>(`${this.API_Url}/users/friends-list/${token}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  };

  deleteFriend(tokens: {}): Observable<Pangolin[]> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<Pangolin[]>(`${this.API_Url}/users/delete-friend`, tokens, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  };
  
  getPangolinRolesList(): string[] {
    return [
      "Guerrier",
      "Alchimiste",
      "Sorcier",
      "Espion",
      "Enchanteur",
    ]
  };

    getPangolinTypeList(): string[] {
      return [
        "Le Classique",
        "Le Géant",
        "Le Javanais",
        "Le Grand de l'inde",
        "Celui à longue queue",
        "Celui à queue courte",
        "De Temminck",
        "A écailles tricuspides"
      ]
  };

  private log(response: any) {
    console.table(response)
  };
 
  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue)
  };

}
