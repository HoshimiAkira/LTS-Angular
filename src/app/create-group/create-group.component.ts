import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  constructor(public webService: WebService,private router:Router,public dialog: MatDialog) {
    const uuid=localStorage.getItem("uuid")
    this.uuid=uuid;
  }
  name:any
  uuid:any
  async create(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Creation', message: 'Are you sure you want to create this group?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.webService.createGroup(this.name,this.uuid).subscribe(
        (response:any) => {
          const dialogSuccessRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { title: 'Success', message: (response["message"]) }
          });
          dialogSuccessRef.afterClosed().subscribe(result => {
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
}
