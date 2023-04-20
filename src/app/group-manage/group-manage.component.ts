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
    this.show=null
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
  students:any
  searchStudnets(){
    this.students=this.webService.searchStudents(this.search)
  }
  add(name:String,uuid:String){
    if (this.result.some(item => item == uuid)) {
      return;
    }
    this.result.push(uuid)
    this.resultShow.push({
      "name":name,
      "uuid":uuid
    })
  }
  delete(uuid: string) {

    const index = this.result.findIndex(item => item == uuid);

    if (index !== -1) {
      this.result.splice(index, 1);
      this.resultShow.splice(index, 1);
    }

  }
  addStudents(){
    this.webService.addStudents(this.result,this.list["courseUuid"])
  }
}
