import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requestcount } from '../_model/requestcount';
import { Modulewiserequest } from '../_model/modulewiserequest';
import { Projectwiserequestcount } from '../_model/projectwiserequestcount';
import { Departmentwiserequestcount } from '../_model/departmentwiserequestcount';
import { UserWiserequestcount } from '../_model/userWiserequestcount';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  baseUrl = environment.apiUrl;
  currentDate: Date;

  constructor(private http: HttpClient) {}

  getRequestCounts(): Observable<Requestcount> {
    return this.http.get<Requestcount>(this.baseUrl + 'analytics');
  }

  getModuleWiseRequestCount(): Observable<Modulewiserequest[]> {
    return this.http.get<Modulewiserequest[]>(
      this.baseUrl + 'analytics/bymodules'
    );
  }

  getProjectWiseRequestCount(): Observable<Projectwiserequestcount[]> {
    return this.http.get<Projectwiserequestcount[]>(
      this.baseUrl + 'analytics/byprojects'
    );
  }

  getDepartmentWiseRequestCount(): Observable<Departmentwiserequestcount[]> {
    return this.http.get<Departmentwiserequestcount[]>(
      this.baseUrl + 'analytics/bydepartment'
    );
  }

  getUserWiseRequestCount(): Observable<UserWiserequestcount[]> {
    return this.http.get<UserWiserequestcount[]>(
      this.baseUrl + 'analytics/byuser'
    );
  }

  getRequestCountsByDate(startDate?, endDate?): Observable<Requestcount> {

    let params = new HttpParams();
    if (startDate != null && endDate != null){
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.http.get<Requestcount>(
      // tslint:disable-next-line: object-literal-shorthand
      this.baseUrl + 'analytics/bydate', {params: params}
    );
  }

  getModuleWiseCountsByDate(startDate?, endDate?): Observable<Modulewiserequest[]> {

    let params = new HttpParams();
    if (startDate != null && endDate != null){
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.http.get<Modulewiserequest[]>(
      // tslint:disable-next-line: object-literal-shorthand
      this.baseUrl + 'analytics/bymodulesbydate', {params: params}
    );
  }

  getDepartmentWiseCountsByDate(startDate?, endDate?): Observable<Departmentwiserequestcount[]> {

    let params = new HttpParams();
    if (startDate != null && endDate != null){
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.http.get<Departmentwiserequestcount[]>(
      // tslint:disable-next-line: object-literal-shorthand
      this.baseUrl + 'analytics/bydepartmentbydate', {params: params}
    );
  }
}
