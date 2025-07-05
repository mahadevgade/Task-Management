import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from '../Model/login-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8081/auth/login'; // Backend API URL

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<string> {
    console.log("userrrr", payload.userName, payload.userPassword);
  
    return this.http.post(this.apiUrl, payload, {
      responseType: 'text' as const  //  this ensures proper typing
    });
  }
  
}