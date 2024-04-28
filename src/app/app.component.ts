import { Component, DoCheck, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ContainerComponent } from './container/container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ContainerComponent,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck, OnInit{
  title = 'web-app';
  showNav = true
  ismenurequired=false;                   //menentukan apakah menu diperlukan atau tidak, dimana nilai nya adalah false yang artinya menu tidak diperlukan
  
  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Check if it's a redirection
        const navigationStart = event as NavigationStart;
        if (navigationStart.navigationTrigger === 'imperative') {
          // Redirection happened
          console.log('Redirection occurred.');
          // You can handle redirection logic here
        }
      }
      if (event instanceof NavigationEnd) {
        // Update navigation visibility based on the final URL
        const navigationEnd = event as NavigationEnd;
        console.log(navigationEnd.url, ": ", !navigationEnd.url.includes('/login'))
        this.showNav = !navigationEnd.url.includes('/login');
        this.cd.detectChanges();
      }
    });
  }
  
  ngDoCheck(): void {                       //metode ini digunakan untuk memeriksa URL saat ini dan menyesuaikan nilai ismenurequired berdasarkan URL tersebut
    let currenturl=this.router.url;
    if(currenturl=='/login'){               //Ini adalah pernyataan kondisional yang memeriksa apakah URL saat ini adalah '/login'. Jika ya, maka ismenurequired disetel ke false, yang berarti menu tidak diperlukan pada halaman login
      this.ismenurequired=false;
      
    }else{
      this.ismenurequired=true;
      console.log('ini else');
      
    }
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
}
