import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-daftar-laporan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daftar-laporan.component.html',
  styleUrl: './daftar-laporan.component.css'
})
export class DaftarLaporanComponent {
  data: any; 
  
  constructor(){
    this.getPosts();
  }

  async getPosts(){
    try{
      const response = await axios.get('/api/reportedAcc/website');
      console.log(response.data.data);
    }catch (error) {
      console.log(error);
    }
  }
}
