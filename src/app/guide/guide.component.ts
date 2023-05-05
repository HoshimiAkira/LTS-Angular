import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebsocketService } from '../webSocket.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent {
  constructor(private router:Router,private websocketService: WebsocketService) {}
  token=localStorage.getItem("token")
  logout(){
    localStorage.clear()
    this.router.navigate(["login"])
    this.websocketService.close();
  }
  login(){
    this.router.navigate(["login"])
  }
}