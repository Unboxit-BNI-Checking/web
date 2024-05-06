import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { AuthService } from '../auth.service';
import axios from 'axios';
import { DashboardService } from '../dashboard.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
constructor(private dashboardService: DashboardService) {
}

  total_laporan: number=0;
  total_investigate: number = 0;
  total_laporan_sosmed: number = 0;
  avg_waktu_penanganan_laporan: number = 0;
  total_laporan_selesai: number = 0;
  total_laporan_belum_selesai: number = 0;
  chartData: { x: string, y: number }[] = [];

  getMonthName(month: number): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return monthNames[month - 1];
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.dashboardService.getDataDashboard();
      this.total_laporan = data.total_laporan;
      this.total_investigate = data.total_investigate;
      this.total_laporan_sosmed = data.total_laporan_sosmed;
      this.avg_waktu_penanganan_laporan = data.avg_waktu_penanganan_laporan;
      this.total_laporan_selesai = data.total_laporan_selesai;
      this.total_laporan_belum_selesai = data.total_laporan_belum_selesai;

      const data2= await this.dashboardService.getLaporanSelesaiPerBulan();
      this.chartData = data2.map((item) => ({
        x: this.getMonthName(item.bulan),
        y: item.jumlah
      })
      ).filter((item: any) => item !== null);
    } catch (error) {
      console.error("Error:", error);
    }

    const chartPerbulan = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        {
          name: "Laporan Selesai",
          color: "#F37548",
          data: this.chartData
          ,
        },
      ],
      chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    }
    
    if (document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("column-chart"), chartPerbulan);
      chart.render();
    }
    

    const getChartOptions = () => {
      return {
        series: [this.total_laporan_selesai, this.total_laporan_belum_selesai],
        colors: ["#F37548", "#FEEEE9"],
        chart: {
          height: 320,
          width: "100%",
          type: "donut",
        },
        stroke: {
          colors: ["transparent"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: 18,
                },
                value: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: -18,
                  formatter: function (value: string) {
                    return value + " Laporan"
                  },
                },
              },
              size: "70%",
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        labels: ["Selesai", "Belum Selesai"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          position:"right",
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value: string) {
              return value + "Laporan"
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value: string) {
              return value + "Laporan"
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      }
    }

    if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
      chart.render();
    }

  }
}
