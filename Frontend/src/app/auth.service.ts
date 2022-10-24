import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;

  login(email: string, password: string): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      };
      return this.http.post(`http://localhost:3000/users/sign-in`, {email, password}, httpOptions).pipe(
        tap((response) => {
          if(response !== false) {
            this.isLoggedIn = true;
            localStorage.setItem("userToken", JSON.stringify(response));
          }   
        }),
        catchError((error) => { 
          console.log(error); 
          return of()
        }),
      )
  }

  logout() {
    localStorage.clear()
    this.isLoggedIn = false;
  }
}
