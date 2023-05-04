import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(public webService: WebService,private router:Router,private route: ActivatedRoute) {}
  folders=[
    {
      name: 'Group Management',
      context: "Check the class group",
      guide:"groupManage"
    },
    {
      name: 'Create Student Group',
      context: "Auto add Student",
      guide:"createGroup"
    },
  ];
  show:any
  navigate(guide:String){
    this.show=guide;
  }
  ngOnInit() {
    
  }
}


