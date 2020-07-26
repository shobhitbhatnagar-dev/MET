import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, identity } from 'rxjs';
import { Module } from '../_model/module';
import { Project } from '../_model/project';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getProjects(): Observable<Project[]> {
  return this.http.get<Project[]> (this.baseUrl + 'projects');
}

getModulesbyProject(id): Observable<Module[]> {
  return this.http.get<Module[]> (this.baseUrl + 'modules/byproject/' + id);
}

addProject(model: any) {
  return this.http.post(this.baseUrl + 'projects', model);
 }

addModule(model: any) {
  return this.http.post(this.baseUrl + 'modules', model);
}

}
