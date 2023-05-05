import { Component ,ChangeDetectorRef} from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.css']
})
export class GroupManageComponent {
  constructor(public webService: WebService,private router:Router,public dialog: MatDialog,private cdr: ChangeDetectorRef) {}
  courses:any;
  ngOnInit(){
    this.courses=this.webService.getCourses()
  }
  courseInfo0:any
  list={
    courseUuid:"",
    studentUuid:"",
    teacherUuid:"",
  }
   getCourseInfo(courseUuid:string){
    this.have=[];
    this.tHave=[];
    this.list["courseUuid"]=courseUuid
    this.courseInfo0=  this.webService.getCourseInfo(this.list)
    this.show=null
    this.courseInfo0.subscribe((responseList: Array<any>) => {
      const courseInfo = responseList[0];
      const students = courseInfo.students;
      const teachers = courseInfo.teachers;
      students.forEach((student: any) => {
        this.have.push(student.uuid)
      });
      teachers.forEach((teacher: any) => {
        this.tHave.push(teacher.uuid)
      });
      
    });
  }
  deleteStudent(studentUuid:string){
    this.list["studentUuid"]=studentUuid
    this.webService.deleteStudent(this.list)
  }
  show:any
  navigate(guide:String){
    this.show=guide;
  }
  async deleteAndFetch(studentUuid: string) {
    this.list["studentUuid"] = studentUuid;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this student?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.deleteStudent(this.list).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.updateCourseData();
          });
        },
        (error) => {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
            
          });
          dialogErrorRef.afterClosed().subscribe(result => {
            
          });
        }
      );
    }
  }
  
  async updateCourseData() {
    
    this.courses=await this.webService.getCourses()
    this.courseInfo0=await this.webService.getCourseInfo(this.list)
    
    this.search=null;
    this.result=[]
    this.resultShow=[]
    this.have=[]
    this.tSearch=null;
    this.tResult=[]
    this.tResultShow=[]
    this.tHave=[]
    this.show=null;
    this.cdr.detectChanges()
  }
  search:any
  have:any[]=[]
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
    if (this.have.some(item => item == uuid)) {
      return;
    }
    this.result.push(uuid)
    this.resultShow.push({
      "name":name,
      "uuid":uuid
    })
  }
  cancel(uuid: string) {

    const index = this.result.findIndex(item => item == uuid);

    if (index !== -1) {
      this.result.splice(index, 1);
      this.resultShow.splice(index, 1);
    }

  }
  async addStudents(){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Add', message: 'Are you sure you want to add these students?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.addStudents(this.result,this.list["courseUuid"]).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.updateCourseData();
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
  }

  tSearch:any
  tHave:any[]=[]
  tResult:any[]=[]
  tResultShow:any[]=[]
  teachers:any
  searchTeachers(){
    this.teachers=this.webService.searchTeachers(this.tSearch)
  }
  tAdd(name:String,uuid:String){
    if (this.tResult.some(item => item == uuid)) {
      return;
    }
    if (this.tHave.some(item => item == uuid)) {
      return;
    }
    this.tResult.push(uuid)
    this.tResultShow.push({
      "name":name,
      "uuid":uuid
    })
  }
  tCancel(uuid: string) {

    const index = this.tResult.findIndex(item => item == uuid);

    if (index !== -1) {
      this.tResult.splice(index, 1);
      this.tResultShow.splice(index, 1);
    }

  }
  async addTeachers(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Add', message: 'Are you sure you want to add these teachers?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.addTeachers(this.tResult,this.list["courseUuid"]).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.updateCourseData();
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
  }

  uuid=localStorage.getItem("uuid")
  async exit(teacherUuid:any){
    this.list["teacherUuid"]=teacherUuid
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to exit the group?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.exit(this.list).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.list.courseUuid=""
            this.courseInfo0=null;
            this.updateCourseData();
            this.router.navigate(["admin"])
          });
        },
        (error) => {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
            
          });
          dialogErrorRef.afterClosed().subscribe(result => {
            
          });
        }
      );
    }
  }

  async deleteGroup(){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this group?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.deleteGroup(this.list).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.list.courseUuid=""
            this.courseInfo0=null;
            this.updateCourseData();
            this.router.navigate(["admin"])
          });
        },
        (error) => {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
            
          });
          dialogErrorRef.afterClosed().subscribe(result => {
            
          });
        }
      );
    }
  }

  invite:any

  async changeInvite(){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Update', message: 'Are you sure you want to update the invite code?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.changeInvite(this.invite,this.list["courseUuid"]).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.updateCourseData();
          });
        },
        (error) => {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: JSON.stringify(error["error"]["message"]) }
            
          });
          dialogErrorRef.afterClosed().subscribe(result => {
            
          });
        }
      );
    }
  }
  
  

}
