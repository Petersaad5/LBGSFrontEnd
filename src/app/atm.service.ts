import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtmProfile } from './atm-profile';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  private apiUrl = 'https://localhost:7104/api/Atm/GetAtmProfile'; 

  constructor(private http: HttpClient) { }

  getAtmProfile(cardNumber: string): Observable<AtmProfile> {
    const params = new HttpParams().set('CardNumber', cardNumber);
    return this.http.get<AtmProfile>(this.apiUrl, { params });
  }
}