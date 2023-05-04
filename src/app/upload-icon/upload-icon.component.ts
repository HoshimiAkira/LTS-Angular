import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-upload-icon',
  templateUrl: './upload-icon.component.html',
  styleUrls: ['./upload-icon.component.css']
})
export class UploadIconComponent {
  fileControl = new FormControl();
  isLoading = false;
  imgurl:any
  icon:any

  uuid:any
  constructor(private webService:WebService,private router:Router,public dialog:MatDialog){
    const uuid=localStorage.getItem("uuid")
    this.uuid=uuid;
  }
  maxFileSize: number = 1 * 1024 * 1024;
  onFileSelected(event: any) {
    this.imgurl=null
    var file = event.target.files[0];
    if (file) {
      if (file.type.includes('image/')) {
        if (file.size > this.maxFileSize) {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: "Too large file" }
          });
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            this.imgurl = (<FileReader>event.target).result;
            this.icon=file
          }
          };
        }else {
          const dialogErrorRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Error', message: "No icon format" }
          });
        }
      } 
    }
  
  
  async upload() {
    this.isLoading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Update', message: 'Are you sure you want to uoload this icon?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.uploadIcon(this.icon,this.uuid).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
            this.router.navigate(['guide']);
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



