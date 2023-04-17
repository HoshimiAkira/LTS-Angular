import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { WebService } from '../web.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public webService: WebService,private router:Router) {}
  list={
    uuid:"",
    password:""
  }
  uuid=""
  password=""
  loginControl = new FormControl('');


  login(){
    this.list["uuid"]=this.uuid
    this.list["password"]=this.password
    this.webService.login(this.list)
  }
  register(){
    this.router.navigate(["register"])
  }
  ngOnInit(){
    this.webService.message=null;
  }
}
