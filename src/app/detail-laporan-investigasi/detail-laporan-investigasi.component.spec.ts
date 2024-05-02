import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLaporanInvestigasiComponent } from './detail-laporan-investigasi.component';

describe('DetailLaporanInvestigasiComponent', () => {
  let component: DetailLaporanInvestigasiComponent;
  let fixture: ComponentFixture<DetailLaporanInvestigasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLaporanInvestigasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailLaporanInvestigasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
