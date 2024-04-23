import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DaftarLaporanComponent } from './daftar-laporan/daftar-laporan.component';
import { DaftarSelesaiComponent } from './daftar-selesai/daftar-selesai.component';
import { LoginComponent } from './login/login.component';

export const routes:  Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  { path: 'daftar-laporan', component: DaftarLaporanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'daftar-selesai', component: DaftarSelesaiComponent },
];