import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonText,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trendingUpOutline, layersOutline, timerOutline, barChartOutline } from 'ionicons/icons';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import moment from 'moment';
import { MetricSwitcherComponent } from './components/metric-switcher.component';
import { ButtonBarComponent } from '../../widgets/button-bar/button-bar.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

echarts.use([LineChart, GridComponent, CanvasRenderer, TooltipComponent]);

@Component({
  selector: 'app-progress-line-chart-demo',
  templateUrl: './progress-line-chart-demo.page.html',
  styleUrls: ['./progress-line-chart-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonText,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    NgxEchartsDirective,
    MetricSwitcherComponent,
    ButtonBarComponent
  ],
  providers: [provideEchartsCore({ echarts })]
})
export class ProgressLineChartDemoPage {
  @ViewChild(NgxEchartsDirective) chart!: NgxEchartsDirective;
  private chartInstance!: echarts.ECharts;

  chartOptions: any;
  selectedRange = '1M';
  total: number = 0;
  private totalSubject: Subject<number> = new Subject<number>();
  metric: string = 'weight';
  percentageChange: number = 0;
  percentageChangeDirection: string = 'up';

  buttonBarConfig = {
    buttons: [
      {label: '1W', value: '1W'},
      {label: '1M', value: '1M'},
      {label: '3M', value: '3M'},
      {label: '6M', value: '6M'},
      {label: '1Y', value: '1Y'},
      {label: 'All', value: 'All'}
    ]
  };

  constructor() {
    addIcons({ trendingUpOutline, layersOutline, timerOutline, barChartOutline });
    
    this.totalSubject.pipe(debounceTime(100)).subscribe((total) => {
      this.total = total;
    });
  }

  ngOnInit() {
    this.loadChartData();
  }

  onDateRangeChange(range: string) {
    this.selectedRange = range;
    this.loadChartData();
  }

  onMetricChange(metric: string) {
    this.metric = metric;
    this.loadChartData();
  }

  loadChartData() {
    const mockData = this.generateMockData(this.selectedRange, this.metric);
    this.chartOptions = this.getChartOptions(mockData);
    this.calcPercentageChange(mockData);
    this.setAxisPointerToLeft();
  }

  generateMockData(range: string, metric: string) {
    let days = 30;
    switch (range) {
      case '1W': days = 7; break;
      case '1M': days = 30; break;
      case '3M': days = 90; break;
      case '6M': days = 180; break;
      case '1Y': days = 365; break;
      case 'All': days = 730; break;
    }

    const data = [];
    const today = moment();
    let baseValue = 150;
    
    // Different base values for different metrics
    switch (metric) {
      case 'weight': baseValue = 150; break;
      case 'volume': baseValue = 500; break;
      case 'distance': baseValue = 5; break;
      case 'duration': baseValue = 30; break;
    }

    for (let i = days; i >= 0; i--) {
      const date = today.clone().subtract(i, 'days');
      // Generate trending upward data with some variance
      const trend = (days - i) / days * baseValue * 0.2;
      const variance = (Math.random() - 0.5) * baseValue * 0.1;
      const value = Math.max(0, baseValue + trend + variance);
      
      data.push({
        period: date.format('YYYY-MM-DD'),
        value: Math.round(value * 10) / 10
      });
    }

    return data;
  }

  calcPercentageChange(data: any[]) {
    if (data.length < 2) return;

    const earliestValue = data[0].value;
    const latestValue = data[data.length - 1].value;
    let percentageChange = Math.trunc((latestValue - earliestValue) / earliestValue * 100);
    
    if (percentageChange < 0) {
      this.percentageChangeDirection = 'down';
    } else if (percentageChange === 0 || Number.isNaN(percentageChange)) {
      this.percentageChangeDirection = 'none';
      percentageChange = 0;
    } else {
      this.percentageChangeDirection = 'up';
    }
    
    this.percentageChange = Math.abs(percentageChange);
  }

  getChartOptions(data: any[]): EChartsCoreOption {
    let seriesColor = '#5433c6';
    
    switch (this.metric) {
      case 'weight': seriesColor = '#32c058'; break;
      case 'volume': seriesColor = '#fe4c40'; break;
      case 'distance': seriesColor = '#fe8b25'; break;
      case 'duration': seriesColor = '#fd13eb'; break;
    }

    return {
      xAxis: {
        data: data.map(d => d.period),
        type: 'category',
        position: 'top',
        boundaryGap: false,
        axisLine: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisPointer: { 
          animation: false,
          snap: false,
          lineStyle: {
            color: seriesColor,
            width: 1
          },
          label: {
            show: true,
            padding: [10, 10, 10, 10],
            fontWeight: 'bold',
            formatter: (params: any) => {
              const date = moment(params.value).format('MMM D, YYYY');
              const value = params.seriesData[0]?.value; 
              this.totalSubject.next(value);
              return `${date}`; 
            },
            backgroundColor: '#023049'
          },
          handle: {
            show: true,
            color: '#7581BD'
          }
        },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: this.metric,
          type: 'line',
          data: data.map(d => d.value),
          showSymbol: false,
          smooth: true,
          itemStyle: {
            color: seriesColor
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: seriesColor },
              { offset: 1, color: '#ffffff' }
            ])
          },
        },
      ],
      grid: { left: '3%', right: '3%', top: '5%', bottom: '5%' }
    };
  }

  onChartInit(ec: any) {
    this.chartInstance = ec;
    this.setAxisPointerToLeft();
  }

  setAxisPointerToLeft() {
    if (this.chartInstance) {
      setTimeout(() => {
        this.chartInstance.dispatchAction({
          type: 'updateAxisPointer',
          seriesIndex: 0,
          dataIndex: 0
        });
      });
    }
  }
}

