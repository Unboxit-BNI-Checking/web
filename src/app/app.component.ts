import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ContainerComponent } from './container/container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ContainerComponent,
    NavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck, OnInit{
  title = 'web-app';
  ismenurequired=false;                   //menentukan apakah menu diperlukan atau tidak, dimana nilai nya adalah false yang artinya menu tidak diperlukan
  constructor(private router:Router){       //Ini memungkinkan kita untuk menggunakan layanan Router

  }
  ngDoCheck(): void {                       //metode ini digunakan untuk memeriksa URL saat ini dan menyesuaikan nilai ismenurequired berdasarkan URL tersebut
    let currenturl=this.router.url;
    if(currenturl=='/login'){               //Ini adalah pernyataan kondisional yang memeriksa apakah URL saat ini adalah '/login'. Jika ya, maka ismenurequired disetel ke false, yang berarti menu tidak diperlukan pada halaman login
      this.ismenurequired=false;
      console.log('ini if');
      
    }else{
      this.ismenurequired=true;
      console.log('ini else');
      
    }
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
}
