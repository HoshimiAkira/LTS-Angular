import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient,private router:Router) {}
    message:any;
    check:any;
    login(list: any) {
      this.message = null;
      let postData = new FormData();
      postData.append("uuid", list["uuid"]);
      postData.append("password", list["password"]);
      return this.http.post('http://localhost:8080/login', postData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.message = (error["error"]["message"]);
            return throwError(error); 
          })
        )
        .subscribe((response: any) => {
          localStorage.setItem("token", response["token"]);
          localStorage.setItem("username", response["username"]);
          localStorage.setItem("type", response["type"]);
          localStorage.setItem("uuid", response["uuid"]);
          this.router.navigate(["guide"]);
        });
    }
    test(){
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        console.log(token)
        return this.http.get(
            'http://localhost:8080/admin/users',{
                params:
                {
                    "token":token
                },
            })
    }
}
