import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from "../search.pipe";
import { FormsModule } from '@angular/forms';


interface report {
  reported_account_id: number;
  account_number: string;
  reports_count: number;
  status: number;
  admin: string;
  time_finished: Date;
}

@Component({
    selector: 'app-daftar-selesai',
    standalone: true,
    templateUrl: './daftar-selesai.component.html',
    styleUrl: './daftar-selesai.component.css',
    imports: [CommonModule, RouterLink, SearchPipe, FormsModule]
})
export class DaftarSelesaiComponent {
  constructor(private authService: AuthService) {
    this.getReport();
  }

  report_list: report[] = [];

  async getReport(){
    try{
      const token = this.authService.getToken();
      const response = await axios.get('/api/reportedAcc/website', {headers: {"Authorization": "Bearer " + token}});
      console.log(response.data.data);
      this.report_list = response.data.data.map((item: any) => {
        try {
          return {
            reported_account_id: item.reported_account_id,
            account_number: item.account_number,
            reports_count: item.reports_count,
            status: item.status,
            admin: item.admin,
            // Konversi timestamp string ke objek Date
            time_finished: new Date(item.time_finished),
          };
        } catch (error) {
          console.error("Error converting timestamp:", error);
          console.log("Invalid timestamp value:", item.time_finished);
          // Jika terjadi kesalahan, kembalikan null atau nilai default 
          return null; // atau nilai default lainnya
        }
      }).filter((item: any) => item !== null); // Filter nilai yang null  
    }catch (error) {
      console.log(error);
    }
  }

  searchText = '';
}
