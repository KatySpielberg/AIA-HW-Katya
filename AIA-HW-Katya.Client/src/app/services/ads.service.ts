import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

    // (dotnet run) הזנה ל API
  private readonly baseUrl = 'http://localhost:5283/api/ads';

  constructor(private http: HttpClient) {}

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.baseUrl);
  }

  getAdById(id: number): Observable<Ad> {
    return this.http.get<Ad>(`${this.baseUrl}/${id}`);
  }

  createAd(ad: Partial<Ad>): Observable<Ad> {
    return this.http.post<Ad>(this.baseUrl, ad);
  }

  updateAd(id: number, ad: Partial<Ad>): Observable<Ad> {
    return this.http.put<Ad>(`${this.baseUrl}/${id}`, ad);
  }

  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
