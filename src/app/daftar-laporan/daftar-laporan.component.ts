import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';


interface report {
  reported_account_id: number;
  account_number: string;
  reports_count: number;
  status: number;
  admin: string
}

@Component({
  selector: 'app-daftar-laporan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './daftar-laporan.component.html',
  styleUrl: './daftar-laporan.component.css'
})

export class DaftarLaporanComponent {
  constructor(private authService: AuthService) {
    this.getReport();
  }

  report_list: report[] = [];

  async getReport(){
    try{
      const token = this.authService.getToken();
      const response = await axios.get('/api/reportedAcc/website', {headers: {"Authorization": "Bearer " + token}});
      console.log(response.data.data);
      this.report_list = response.data.data;
    }catch (error) {
      console.log(error);
    }
  }
}
