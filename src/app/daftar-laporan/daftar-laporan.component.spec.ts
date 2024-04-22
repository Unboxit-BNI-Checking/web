import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarLaporanComponent } from './daftar-laporan.component';

describe('DaftarLaporanComponent', () => {
  let component: DaftarLaporanComponent;
  let fixture: ComponentFixture<DaftarLaporanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaftarLaporanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaftarLaporanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
