import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    imports: [CommonModule, RouterLink, SearchPipe, FormsModule, NgFor]
})
export class DaftarSelesaiComponent implements OnInit {

  statusList: string[] = ["Blokir", "Bebas Aduan"];
  selectedStatus: number = 0;

  constructor(private authService: AuthService) {
    this.getReport();
  }
  ngOnInit(): void {
    this.getReport();
  }

  report_list: report[] = [];
  filtered_report: report[] = [];
  searchText = '';
  sortDirection: string = 'asc';

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
      this.filtered_report = this.report_list;
    }catch (error) {
      console.log(error);
    }
  }

  filterData() {
    this.filtered_report = this.report_list.filter(item => (this.selectedStatus == 0 || item.status == this.selectedStatus));
    console.error(this.selectedStatus);
  }

  onChangeStatus() {
    this.filterData();
    //console.error(this.report_list);
  }

  sortDataByReportCounts(key: number) {
    let aValue: number, bValue: number;

    this.filtered_report.sort((a, b) => {
      if (key === 0) {
        aValue = a.reported_account_id;
        bValue = b.reported_account_id;
      } else if (key === 1) {
        aValue = parseInt(a.account_number);
        bValue = parseInt(b.account_number);
      } else if (key === 2) {
        aValue = a.reports_count;
        bValue = b.reports_count;
      } else if (key === 3) {
        aValue = a.status;
        bValue = b.status;
      }
      return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
