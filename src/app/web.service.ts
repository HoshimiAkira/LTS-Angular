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
    deleteStudent(list:any){
      var token:any="";
      this.message = null;
      if(localStorage.getItem("token")!=null){
        token=localStorage.getItem("token")
      }
      var cUuid=list["courseUuid"]
      var sUuid=list["studentUuid"]
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this student?' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.http.delete(
            'http://localhost:8080/admin/courses/'+cUuid+'/'+sUuid,{
              params:
              {
                  "token":token
              },
            }).subscribe(
              (response:any) => {
                const dialogSuccessRef = this.dialog.open(DialogComponent, {
                  width: '400px',
                  data: { title: 'Success', message: (response["message"]) }
                });
                dialogSuccessRef.afterClosed().subscribe(result => {
                  window.location.reload();
                });
              },
              (error) => {
                const dialogErrorRef = this.dialog.open(DialogComponent, {
                  width: '400px',
                  data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
                });
              }
            );
        }
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
    addStudents(list:any,course:any){
      var token:any="";
        if(localStorage.getItem("token")!=null){
            token=localStorage.getItem("token")
        }
        let postData = new FormData();
        postData.append("uuidList",list)
        postData.append("courseUuid",course)
        postData.append("token",token)
        return this.http.post('http://localhost:8080/admin/courses/students', postData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            const dialogErrorRef = this.dialog.open(DialogComponent, {
              width: '400px',
              data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
            });
            return throwError(error); 
          })
        )
        .subscribe((response: any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
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
