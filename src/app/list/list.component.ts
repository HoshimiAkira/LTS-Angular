import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  username:any;
  type:any;
  uuid:any;

  head:string="https://ltscapicon.blob.core.windows.net/icon/"
  url:any
  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {
    const username=localStorage.getItem("username")
    const type=localStorage.getItem("type")
    const uuid=localStorage.getItem("uuid")
    const icon=localStorage.getItem("icon")
    this.username=username;
    this.type=type;
    this.uuid=uuid;
    this.url=this.head+icon
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  identityCheck=false

  
}
