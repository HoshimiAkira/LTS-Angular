import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  constructor(public webService: WebService,private router:Router,private route:ActivatedRoute) {}
  folders=[
    {
      name: 'Upload icon',
      context: "Upload your headshot",
      guide:"icon"
    },
    {
      name: 'Update password',
      context: "Change your password",
      guide:"password"
    },
  ];
  show:any
  navigate(guide:String){
    this.show=guide;
  }
  ngOnInit() {
    
  }
}
