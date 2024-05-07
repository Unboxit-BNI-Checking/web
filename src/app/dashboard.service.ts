import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private authService: AuthService) { }
  async getDataDashboard(): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response = await axios.get('/api/reports/dashboard', { headers: { "Authorization": "Bearer " + token } });
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getLaporanSelesaiPerBulan(): Promise<any[]> {
    try {
      const token = this.authService.getToken();

      const response = await axios.get('/api/reports/total-reports-by-month', { headers: { "Authorization": "Bearer " + token } });
      return response.data.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }



}
