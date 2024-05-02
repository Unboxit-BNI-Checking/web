import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLaporanClearComponent } from './detail-laporan-clear.component';

describe('DetailLaporanClearComponent', () => {
  let component: DetailLaporanClearComponent;
  let fixture: ComponentFixture<DetailLaporanClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLaporanClearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailLaporanClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
