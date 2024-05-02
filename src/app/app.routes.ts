import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DaftarLaporanComponent } from './daftar-laporan/daftar-laporan.component';
import { DaftarSelesaiComponent } from './daftar-selesai/daftar-selesai.component';
import { LoginComponent } from './login/login.component';
import { TweetsComponent } from './tweets/tweets.component';
import { DetailLaporanComponent } from './detail-laporan/detail-laporan.component';
import { DetailLaporanClearComponent } from './detail-laporan-clear/detail-laporan-clear.component';
import { DetailLaporanInvestigasiComponent } from './detail-laporan-investigasi/detail-laporan-investigasi.component';

export const routes:  Routes = [
  // TODO: Later make sure to add "authenticated" logic for this base path 
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'daftar-laporan', component: DaftarLaporanComponent },
  { path: 'detail-laporan-clear', component: DetailLaporanClearComponent },
  { path: 'detail-laporan-investigasi', component: DetailLaporanInvestigasiComponent },
  { path: 'daftar-selesai', component: DaftarSelesaiComponent },
  { path: 'detail-laporan', component: DetailLaporanComponent },
  { path: 'tweets', component: TweetsComponent }
];