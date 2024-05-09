import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Modal } from 'flowbite';

interface Report {
  account_number_reported: string;
  account_username_reported: string;
  status: number;
  reported_id: number;
  reports_created_at: Date;
  account_number: string;
  account_username: string;
  transaction_created_at: Date;
  transaction_note: String;
  amount: number;
  chronology: string;
  attachment: string[];
  twitter_reports_count: number;
}

@Component({
  selector: 'app-detail-laporan-investigasi',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-laporan-investigasi.component.html',
  styleUrl: './detail-laporan-investigasi.component.css'
})
export class DetailLaporanInvestigasiComponent {
  reportedAccountId: number = 0;
  reportList: Report[] = [];
  datePipe: DatePipe;
  currentIndex: number = 0;
  account_number_reported: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private injector: Injector, private router: Router) {
    this.datePipe = this.injector.get(DatePipe);
  }

  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  action: string = '';
  private modals = new Map<string, any>();

  openModal(modal: string) {
    const modalElement = document.getElementById(modal);
    const modalInstance = new Modal(modalElement);
    modalInstance.init();
    modalInstance.show();
    this.modals.set(modal, modalInstance);
  }

  closeModal(modal: string) {
    const modalInstance = this.modals.get(modal);
    modalInstance.hide();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportedAccountId = +params['reported_account_id'] || 0;
      if (this.reportedAccountId !== 0) {
        this.getReport();
      }
    });
  }

  async getReport() {
    try {
      const token = this.authService.getToken();
      const response = await axios.get('/api/reportedAcc/website/reports/' + this.reportedAccountId, {
        headers: { "Authorization": "Bearer " + token }
      });
      // this.reportList = response.data.data;
      this.reportList = response.data.data.map((report: Report) => {
        this.account_number_reported = report.account_number_reported;
        if (typeof report.attachment === 'string') {
          // Jika attachment adalah string tunggal, kita akan buat array dengan satu elemen
          return { ...report, attachment: [report.attachment] };
        } else {
          return report; // Jika attachment sudah array, kita biarkan seperti itu
        }
      });
      console.log(this.reportList)
      // Ubah format tanggal menggunakan DatePipe
      this.reportList.forEach(report => {
        // Periksa apakah nilai tanggal tidak null
        if (report.reports_created_at !== null) {
          report.reports_created_at = new Date(report.reports_created_at);
        }
        if (report.transaction_created_at !== null) {
          report.transaction_created_at = new Date(report.transaction_created_at);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  nextReport() {
    if (this.currentIndex < this.reportList.length - 1) {
      this.currentIndex++;
    }
  }

  previousReport() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  blokir(){
    // alert("Yakin?");
    const body = {"status": 3}
    axios.patch('/api/reportedAcc/reports/'+ this.reportedAccountId +'/status', body, {headers: { "Authorization": "Bearer " + this.authService.getToken() }}).then(() => {
      this.router.navigateByUrl("/daftar-selesai");
    })
    this.closeModal('blokir-modal');
  }

  bebasAduan(){
    // alert("Yakin?");
    const body = {"status": 4}
    axios.patch('/api/reportedAcc/reports/'+ this.reportedAccountId +'/status', body, {headers: { "Authorization": "Bearer " + this.authService.getToken() }}).then(() => {
      this.router.navigateByUrl("/daftar-selesai");
    })
    this.closeModal('bebasAduan-modal');
  }

  getCurrentReport() {
    return this.reportList[this.currentIndex];
  }

  getCurrentIndex(){
    return this.currentIndex;
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }
  formatTime(date: Date): string {
    const adjustedDate = new Date(date.getTime() + (7 * 60 * 60 * 1000));
    const hours = adjustedDate.getHours();
    const minutes = adjustedDate.getMinutes();
    const seconds = adjustedDate.getSeconds();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
