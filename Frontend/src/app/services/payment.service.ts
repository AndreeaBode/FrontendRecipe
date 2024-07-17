import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://backendrecipe-production.up.railway.app';

  constructor(private http: HttpClient) {}

  canMakeRequest(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get(`${this.apiUrl}/payment/can-make-request`, { params });
  }

  createCheckoutSession(userId: number): Observable<any> {
    const url = `https://backendrecipe-production.up.railway.app/create-checkout-session?userId=${userId}`;
    return this.http.post<any>(url, {});
  }
  
  verifyPayment(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-payment/${sessionId}`);
  }


  upgradeToPremium(userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/payment/users/premium?userId=${userId}`, {});
  }
}

