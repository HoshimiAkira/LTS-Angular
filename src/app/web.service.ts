import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient,private router:Router,public dialog: MatDialog) {

    }
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
    getCourses(){
      var token:any="";
      var uuid:any=""
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      if(localStorage.getItem("uuid")!=null){
        uuid=localStorage.getItem("uuid")
      }
      return this.http.get(
          'http://localhost:8080/admin/courses',{
              params:
              {
                  "token":token,"uuid":uuid
              },
        })
    }
    getCourseInfo(list:any){
      var token:any="";
      var uuid:any=""
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      uuid=list["courseUuid"]
      return this.http.get(
          'http://localhost:8080/admin/courses/'+uuid,{
              params:
              {
                  "token":token
              },
        })
    }
    deleteStudent(list:any): Observable<any> {
      var token:any="";
      
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      var cUuid=list["courseUuid"]
      var uuid=list["studentUuid"]
      return this.http.delete(
        'http://localhost:8080/admin/courses/'+cUuid+'/'+uuid,{
          params:
          {
              "token":token
          },
        });
    }
    searchStudents(name:string){
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        return this.http.get(
            'http://localhost:8080/admin/courses/students',{
                params:
                {
                    "token":token,"name":name
                },
            })
    }
    searchTeachers(name:string){
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        return this.http.get(
            'http://localhost:8080/admin/courses/teachers',{
                params:
                {
                    "token":token,"name":name
                },
            })
    }
    addStudents(list:any,course:any): Observable<any>{
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        let postData = new FormData();
        postData.append("uuidList",list)
        postData.append("courseUuid",course)
        postData.append("token",token)
        return this.http.post('http://localhost:8080/admin/courses/students', postData);
    }
    addTeachers(list:any,course:any): Observable<any>{
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        let postData = new FormData();
        postData.append("uuidList",list)
        postData.append("courseUuid",course)
        postData.append("token",token)
        return this.http.post('http://localhost:8080/admin/courses/teachers', postData);
    }
    exit(list:any){
      var token:any="";
      
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      var cUuid=list["courseUuid"]
      var uuid=list["teacherUuid"]
      return this.http.delete(
        'http://localhost:8080/admin/courses/'+cUuid+'/'+uuid,{
          params:
          {
              "token":token
          },
        });
    }
    deleteGroup(list:any){
      var token:any="";
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      var uuid=list["courseUuid"]
      return this.http.delete(
        'http://localhost:8080/admin/courses/'+uuid,{
          params:
          {
              "token":token
          },
        });
    }
    changeInvite(invite:any,uuid:any): Observable<any>{
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        const data = { 'uuid': uuid, 'invite': invite }
        return this.http.put('http://localhost:8080/admin/courses/'+uuid+'/invite', data,{
          params:
          {
              "token":token
          },
        });
    }
    createGroup(name:any,uuid:any){
      var token:any="";
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      let postData = new FormData();
        postData.append("name",name)
        postData.append("uuid",uuid)
        postData.append("token",token)
      return this.http.post(
        'http://localhost:8080/admin/courses',postData);
    }
    updatePassword(password:any,uuid:any){
      var token:any="";
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      let postData = new FormData();
        postData.append("password",password)
        postData.append("uuid",uuid)
        postData.append("token",token)
      return this.http.post(
        'http://localhost:8080/user/password',postData);
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
