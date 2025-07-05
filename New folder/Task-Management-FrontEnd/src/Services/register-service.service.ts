import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterPayload } from '../Model/register-payload';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  // API URL
  private apiUrl = 'http://localhost:8081/auth/register';

  constructor(private http: HttpClient) {}

  // Method to register a user
  registerUser(payload: RegisterPayload): Observable<any> {
    console.log("service payload", payload);

    const headers = new HttpHeaders({
      'Accept': 'text/plain',  // Expecting plain text response
      'Content-Type': 'application/json'
    });

    //Telling Angular to treat text response as JSON to avoid parsing error
    return this.http.post(this.apiUrl, payload, {
      headers,
      responseType: 'text' as 'json'
    });
  }
}
