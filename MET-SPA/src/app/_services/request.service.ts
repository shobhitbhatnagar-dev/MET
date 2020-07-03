import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../_model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getRequests(): Observable<Request[]> {
  return this.http.get<Request[]> (this.baseUrl + 'requests');
}

getRequest(id): Observable<Request> {
  return this.http.get<Request> (this.baseUrl + 'requests/' + id);
}

}
