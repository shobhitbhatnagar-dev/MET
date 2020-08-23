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

  getRequests(projectId, page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {

    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('projectId', projectId);
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

  getRequestsbyUser(id, projectId, page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {
    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('projectId', projectId);
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

  getRequestsbyStatus(status, projectId, page?, itemsPerPage?): Observable<PaginatedResult<Request[]>> {
    const paginatedResult: PaginatedResult<Request[]> = new PaginatedResult<Request[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('projectId', projectId);
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
        return paginatedResult;
      })
    );
  }

  searchRequestsByStatus(status): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseUrl + 'requests/bystatus/' + status);
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

  getRequestByApprovalDate(startDate?, endDate?): Observable<Request[]> {

    let params = new HttpParams();
    if (startDate != null && endDate != null){
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.http.get<Request[]>(
      // tslint:disable-next-line: object-literal-shorthand
      this.baseUrl + 'requests/byapprovaldate', {params: params}
    );
  }

  getRequestByCreatedDate(startDate?, endDate?): Observable<Request[]> {

    let params = new HttpParams();
    if (startDate != null && endDate != null){
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.http.get<Request[]>(
      // tslint:disable-next-line: object-literal-shorthand
      this.baseUrl + 'requests/bycreateddate', {params: params}
    );
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
