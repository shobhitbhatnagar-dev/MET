import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../_model/request';
import { Approval } from '../_model/approval';
import { Timeline } from '../_model/timeline';
import { Release } from '../_model/release';
import { map } from 'rxjs/operators';
import { Uat } from '../_model/uat';
import { PaginatedResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRequests(page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {

    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Request[]>(this.baseUrl + 'requests', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getRequestsbyUser(id, page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {
    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Request[]>(this.baseUrl + 'requests/byuser/' + id, {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getRequestsbyStatus(status, page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {
    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Request[]>(
      this.baseUrl + 'requests/bystatus/' + status, {observe: 'response', params})
      .pipe(
       map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        console.log(paginatedResult);
        return paginatedResult;
      })
    );
  }

  getRequest(id): Observable<Request> {
    return this.http.get<Request>(this.baseUrl + 'requests/' + id);
  }

  addRequest(model: any) {
    return this.http.post(this.baseUrl + 'requests/add', model);
  }

  UpdateEfforts(id: number, model: any) {
    return this.http.put(this.baseUrl + 'requests/effort/' + id, model);
  }

  UpdateApproval(id: number, approval: Approval) {
    console.log('Service' + this.baseUrl + 'requests/approval/' + id, approval);
    return this.http.put(this.baseUrl + 'requests/approval/' + id, approval);
  }

  UpdateTimeline(id: number, timeline: Timeline) {
    return this.http.put(this.baseUrl + 'requests/timeline/' + id, timeline);
  }

  UpdateRelease(id: number, release: Release) {
    return this.http.put(this.baseUrl + 'requests/release/' + id, release);
  }

  UpdateUat(id: number, uat: Uat) {
    return this.http.put(this.baseUrl + 'requests/uat/' + id, uat);
  }

  UploadAttachment(fileRecived: FormData) {
    return this.http.post(this.baseUrl + 'attachments/', fileRecived).pipe(
      map((response: any) => {
        const attachment = response;
        if (attachment) {
          localStorage.setItem('attachmentTitle', attachment.title);
          localStorage.setItem('attachmentUrl', attachment.url);
          localStorage.setItem('publicId', attachment.publicId);
        }
      })
    );
  }

  ClearAttachment() {
    localStorage.removeItem('attachmentTitle');
    localStorage.removeItem('attachmentUrl');
    localStorage.removeItem('publicId');
  }
}
