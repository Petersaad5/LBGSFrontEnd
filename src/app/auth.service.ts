// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7104/api/Atm/login'; 

  constructor(private http: HttpClient) { }

  login(cardNumber: string, csv: number): Observable<void> {
    return this.http.post<{ token: string }>(`${this.apiUrl}`, { cardNumber, csv })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
      }));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getCardNumberFromToken(): string | undefined {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.sub;
    }
    return undefined;
  }
}
