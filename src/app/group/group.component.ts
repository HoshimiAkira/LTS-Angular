import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { interval, Subscription } from 'rxjs';
import { WebsocketService } from '../webSocket.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnDestroy {
  uuid: any;
  message:any;
  online:string[]=[];
  constructor(
    public webService: WebService,
    private router: Router,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private websocketService: WebsocketService
  ) {
    const uuid = localStorage.getItem('uuid');
    this.uuid = uuid;
    
  }
  ngOnInit(){
    this.courses=this.webService.getCourses()
    this.websocketService.message$.subscribe((message) => {
      console.log(message)
      if(message["type"]=="newInfo"){
        this.online=message["content"]
        console.log(this.online)
      }
      if(message["type"]=="online"){
        if(!this.online.includes(message["content"])){
          this.online.push(message["content"])
        }
        console.log(this.online)
      }
      if(message["type"]=="offline"){
        if(this.online.includes(message["content"])){
          const index = this.online.findIndex(item => item == message["content"]);
          if (index !== -1) {
            this.online.splice(index, 1);
          }
        }
        console.log(this.online)
      }
    });
  }
  ngOnDestroy() {
    
  }

  courses: any;
  courseInfo0: any;
  list = {
    courseUuid: '',
  };

  getCourseInfo(courseUuid: string) {
    this.list['courseUuid'] = courseUuid;
    this.courseInfo0 = this.webService.getCourseInfo(this.list);

    this.courseInfo0.subscribe((responseList: Array<any>) => {
      const courseInfo = responseList[0];
      const students = courseInfo.students;
      const teachers = courseInfo.teachers;
    });
    const message = { 'type': 'watch', 'data': courseUuid };
    this.websocketService.send(message);
  }

  check(uuid:any) {
    if(this.online.includes(uuid)){
      return true;
    }else{
      return false;
    }
    
  }
  sendMessage(uuid:any,name:any){
    this.router.navigate(["msg"], { queryParams: { "receive": uuid,"name":name} });
  }

 
}