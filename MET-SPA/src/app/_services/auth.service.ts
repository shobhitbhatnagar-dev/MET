import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl = environment.apiUrl + 'auth/';
 jwtHelper = new JwtHelperService();
 decodedToken: any;
 userRole: string;
 userId: any;
 userName: any;
 projectAccess: any;
 projectId: any = 0;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl  + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user)
      {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    })
  );
}

register(model: any) {
 return this.http.post(this.baseUrl + 'register', model);
}

changePass(id: number, model: any) {
  return this.http.put(this.baseUrl + 'changepass/' + id , model);
 }

loggedIn() {
  const token  = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

checkRole(role: string) {
  this.userRole = this.decodedToken.role;
  if ( this.userRole === role) {
    return true;
 }return false;
}

getUserId() {
 this.userId = this.decodedToken.nameid;
 return this.userId;
}

getUsername() {
  this.userName = this.decodedToken.unique_name;
  return this.userName;
 }

getProjectAccess() {
  this.projectAccess = this.decodedToken.groupsid;
  if (this.projectAccess === 'all')
  {
    this.projectId = 0;
  }
  else
  {
    this.projectId = this.projectAccess;
  }
  return this.projectId;
 }

}
