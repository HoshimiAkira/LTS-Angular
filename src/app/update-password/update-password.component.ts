import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,private webService:WebService,private router:Router,public dialog: MatDialog) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', [Validators.required, matchValues('password')]]
    });
    const uuid=localStorage.getItem("uuid")
    this.uuid=uuid;
  }
  uuid:any
  getPasswordErrorMessage() {
    const PasswordControl = this.passwordForm.get('password');
    if (PasswordControl && PasswordControl.hasError('required')) {
      return 'You must enter a password';
    }
    if (PasswordControl && PasswordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    if (PasswordControl && PasswordControl.hasError('pattern')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');
    if (confirmPasswordControl && confirmPasswordControl.hasError('required')) {
      return 'You must confirm your password';
    }
    if (confirmPasswordControl && confirmPasswordControl.hasError('matchValues')) {
      return 'Passwords do not match';
    }
    return '';
  }



  get password() {
    return this.passwordForm.get('password');
  }
  
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
  async updatePassword(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Update', message: 'Are you sure you want to update your password?' }
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const passwordValue = this.passwordForm.get('password')?.value
      this.webService.updatePassword(passwordValue,this.uuid).subscribe(
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

function matchValues(matchTo: string) {
  return (control: AbstractControl) => {
    const parent = control.parent;
    if (!parent) {
      return null;
    }

    const matchingControl = parent.get(matchTo);
    if (!matchingControl) {
      return null;
    }

    return control.value === matchingControl.value ? null : { notMatching: true };
  };
}