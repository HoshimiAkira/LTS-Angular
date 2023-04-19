import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.css']
})
export class GroupManageComponent {
  constructor(public webService: WebService,private router:Router) {}
  courses:any;
  ngOnInit(){
    this.courses=this.webService.getCourses()
  }
  courseInfo0:any
  list={
    courseUuid:"",
    studentUuid:"",
  }
  getCourseInfo(courseUuid:string){
    this.list["courseUuid"]=courseUuid
    this.courseInfo0=this.webService.getCourseInfo(this.list)
  }
  deleteStudent(studentUuid:string){
    this.list["studentUuid"]=studentUuid
    this.webService.deleteStudent(this.list)
  }
  show:any
  navigate(guide:String){
    this.show=guide;
  }

  search:any
  result:any[]=[]
  resultShow:any[]=[]

  searchStudnet(){
    
  }
}
