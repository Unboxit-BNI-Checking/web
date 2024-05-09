import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink, SearchPipe, FormsModule, NgFor],
  templateUrl: './daftar-laporan.component.html',
  styleUrl: './daftar-laporan.component.css'
})

export class DaftarLaporanComponent implements OnInit {

  statusList: string[] = ["Dilaporkan", "Investigasi"];
  selectedStatus: number = 0;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      if (param['filter'] == 'investigate') this.selectedStatus = 2;
    });
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
      //console.log(response.data.data);
      this.report_list = response.data.data;
      if (this.selectedStatus != 0) {
        this.filterData();
      } else {
        this.filtered_report = this.report_list;
      }

    } catch (error) {
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
