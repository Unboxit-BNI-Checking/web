import { CommonModule, DatePipe, NgFor } from '@angular/common';
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

  constructor(private authService: AuthService, private datePipe: DatePipe) {
    this.getReport();
  }
  ngOnInit(): void {
    this.getReport();
  }

  report_list: report[] = [];
  filtered_report: report[] = [];
  searchText = '';
  sortDirection: string = 'asc';
  total_laporan_selesai: number = 0;
  account_number: string = '';

  async getReport(){
    try{
      const token = this.authService.getToken();
      const response = await axios.get('/api/reportedAcc/website', {headers: {"Authorization": "Bearer " + token}});
      console.log(response.data.data);
      this.report_list = response.data.data.map((item: any) => {
        try {
          this.account_number = item.account_number;
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
      this.report_list = this.report_list.sort((a, b) => b.time_finished.getTime() - a.time_finished.getTime());  
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
  formatDate(timestamp: string): string {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
    // Adjust for GMT +7 timezone offset
    date.setHours(date.getHours() + 7);
    // Format the date using DatePipe
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  pagination = {
    currentPage: 1,
    entriesPerPage: 10,
    startIndex: 1,
    endIndex: 10,
    totalPages: 10
  };

  // Assuming filtered_report is your array of data
  // Initialize this array with your actual data

  // Function to update pagination indexes
  paginatedData(): any[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.entriesPerPage;
    const endIndex = startIndex + this.pagination.entriesPerPage;
    return this.filtered_report.slice(startIndex, endIndex);
  }

  // Function to update pagination indexes
  updatePaginationIndexes(): void {
    this.pagination.startIndex = (this.pagination.currentPage - 1) * this.pagination.entriesPerPage + 1;
    this.pagination.endIndex = Math.min(this.pagination.currentPage * this.pagination.entriesPerPage, this.filtered_report.length);
  }

  // Function to go to previous page
  prevPage(): void {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.updatePaginationIndexes();
    }
  }

  // Function to go to next page
  nextPage(): void {
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pagination.currentPage++;
      this.updatePaginationIndexes();
    }
  }

}
