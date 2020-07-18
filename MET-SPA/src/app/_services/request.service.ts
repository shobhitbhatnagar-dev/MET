import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../_model/request';
import { Effort } from '../_model/effort';
import { Approval } from '../_model/approval';
import { Timeline } from '../_model/timeline';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getRequests(): Observable<Request[]> {
  return this.http.get<Request[]> (this.baseUrl + 'requests');
}

getRequestsbyUser(id): Observable<Request[]> {
  return this.http.get<Request[]> (this.baseUrl + 'requests/byuser/' + id);
}

getRequestsbyStatus(status): Observable<Request[]> {
  return this.http.get<Request[]> (this.baseUrl + 'requests/bystatus/' + status);
}

getRequest(id): Observable<Request> {
  return this.http.get<Request> (this.baseUrl + 'requests/' + id);
}

addRequest(model: any) {
  return this.http.post(this.baseUrl + 'requests/add', model);
 }

UpdateEfforts(id: number, effort: Effort) {
  return this.http.put(this.baseUrl + 'requests/effort/' + id, effort);
 }

 UpdateApproval(id: number, approval: Approval) {
  return this.http.put(this.baseUrl + 'requests/approval/' + id, approval);
 }

 UpdateTimeline(id: number, timeline: Timeline) {
  return this.http.put(this.baseUrl + 'requests/timeline/' + id, timeline);
 }


}
