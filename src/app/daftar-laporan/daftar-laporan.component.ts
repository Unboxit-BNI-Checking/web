import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';


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
  imports: [CommonModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './daftar-laporan.component.html',
  styleUrl: './daftar-laporan.component.css'
})

export class DaftarLaporanComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.getReport();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  report_list: report[] = [];
  searchText = '';

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
