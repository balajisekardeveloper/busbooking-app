import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Bookingservice } from '../pages/service/bookingservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Busbooking-app');
  private route = inject(Router);
  private bookserv = inject(Bookingservice);

  username: string | null = null;
   userloggedins = false; 
  logout() {
    localStorage.removeItem('refresh');   // ✅ remove token
    localStorage.removeItem('username');  // ✅ remove username
    this.username = null;
    this.route.navigate(['login']);
  }

  ngOnInit(): void {
    
   this.bookserv.UserValue$.subscribe(name => this.username = name);
  this.bookserv.LoginTokens$.subscribe(status => this.userloggedins = status);
  }

  // displayUser() {
  //   const uname = localStorage.getItem('username'); // ✅ use localStorage here too
  //   this.bookserv.UserValue$.subscribe((name: any) => {
  //     this.username = name || uname;
  //     console.log(this.username);
  //   });
  // }
}
