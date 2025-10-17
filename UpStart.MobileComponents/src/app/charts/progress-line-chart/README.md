# Progress Line Chart

An interactive Apache ECharts line chart with smooth animations, gradient fills, and drag-to-explore functionality. Perfect for tracking progress metrics over time with multiple date range options and metric switching.

## ✨ Features

- ✅ **Smooth Line Animation** - Bezier curved lines for elegant data visualization
- ✅ **Interactive Axis Pointer** - Drag to see values at different dates
- ✅ **Gradient Area Fill** - Color-matched gradient under the line
- ✅ **4 Switchable Metrics** - Weight, Volume, Distance, Duration
- ✅ **6 Time Range Options** - 1W, 1M, 3M, 6M, 1Y, All
- ✅ **Animated Number Display** - Flipper animation for total value
- ✅ **Percentage Change Indicator** - Up/down arrows with percentage
- ✅ **Clean Minimal Design** - Hidden axes for modern look
- ✅ **Touch-friendly** - Optimized for mobile interactions
- ✅ **Auto-positioning** - Axis pointer starts at first data point

## 📦 Dependencies

```json
{
  "echarts": "^5.6.0",
  "ngx-echarts": "^19.0.0",
  "moment": "^2.30.1",
  "rxjs": "~7.8.0"
}
```

**Angular/Ionic:**
- `@angular/common` - CommonModule, FormsModule
- `@angular/core` - Component decorators, ViewChild
- `@ionic/angular` - Ionic components

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install echarts ngx-echarts moment
```

### 2. Copy Component Files

```
src/app/charts/progress-line-chart/
├── progress-line-chart-demo.page.ts
├── progress-line-chart-demo.page.html
├── progress-line-chart-demo.page.scss
├── components/
│   ├── metric-switcher.component.ts
│   ├── metric-switcher.component.html
│   ├── metric-switcher.component.scss
│   └── number-flipper.component.ts
└── README.md
```

### 3. Import ECharts Modules

The component imports only what it needs from ECharts:

```typescript
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LineChart, GridComponent, CanvasRenderer, TooltipComponent]);
```

### 4. Provide ECharts Core

```typescript
@Component({
  // ...
  providers: [provideEchartsCore({ echarts })]
})
```

## 💻 Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LineChart, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-my-chart',
  template: `
    <div echarts [options]="chartOptions" class="chart"></div>
  `,
  providers: [provideEcharts Core({ echarts })]
})
export class MyChartComponent {
  chartOptions: any;

  ngOnInit() {
    this.chartOptions = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        data: [10, 20, 15, 30, 25],
        smooth: true
      }]
    };
  }
}
```

### With Metric Switcher

```html
<div class="chart-container">
  <app-metric-switcher
    [total]="totalValue"
    [metric]="currentMetric"
    [percentageChange]="percentChange"
    [percentageChangeDirection]="direction"
    (metricSelectedEvent)="onMetricChange($event)">
  </app-metric-switcher>

  <div echarts [options]="chartOptions" (chartInit)="onChartInit($event)"></div>
</div>
```

### With Date Range Selector

```html
<app-button-bar 
  [config]="buttonBarConfig"
  (buttonSelectedEvent)="onDateRangeChange($event)">
</app-button-bar>
```

```typescript
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
```

## 🎨 Customization

### Chart Colors by Metric

```typescript
getChartColor(metric: string): string {
  const colors: any = {
    'weight': '#32c058',    // Green
    'volume': '#fe4c40',    // Red-orange
    'distance': '#fe8b25',  // Orange
    'duration': '#fd13eb'   // Magenta
  };
  return colors[metric] || '#5433c6';
}
```

### Gradient Customization

```typescript
areaStyle: {
  opacity: 0.8,
  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: seriesColor },
    { offset: 1, color: '#ffffff' }
  ])
}
```

### Custom Axis Pointer

```typescript
axisPointer: { 
  animation: false,
  snap: false,
  lineStyle: {
    color: seriesColor,
    width: 2  // Thicker line
  },
  label: {
    show: true,
    backgroundColor: '#023049',
    formatter: (params: any) => {
      return moment(params.value).format('MMM D');
    }
  }
}
```

### Chart Dimensions

```scss
.chart {
  width: 100vw;
  height: 250px; // Adjust height
}
```

## 📊 Data Format

The chart expects data in this format:

```typescript
interface ChartData {
  period: string;  // Date in 'YYYY-MM-DD' format
  value: number;   // The metric value
}

const mockData: ChartData[] = [
  { period: '2025-10-01', value: 150 },
  { period: '2025-10-02', value: 152 },
  { period: '2025-10-03', value: 155 }
];
```

## 🔧 Advanced Features

### Debounced Total Updates

The demo uses RxJS to debounce axis pointer updates:

```typescript
private totalSubject: Subject<number> = new Subject<number>();

constructor() {
  this.totalSubject.pipe(debounceTime(100)).subscribe((total) => {
    this.total = total;
  });
}

formatter: (params: any) => {
  const value = params.seriesData[0]?.value;
  this.totalSubject.next(value);  // Debounced update
  return moment(params.value).format('MMM D, YYYY');
}
```

### Auto-position to Start

```typescript
onChartInit(ec: any) {
  this.chartInstance = ec;
  setTimeout(() => {
    this.chartInstance.dispatchAction({
      type: 'updateAxisPointer',
      seriesIndex: 0,
      dataIndex: 0  // Position at first data point
    });
  });
}
```

### Generating Mock Data

```typescript
generateMockData(days: number, baseValue: number) {
  const data = [];
  const today = moment();
  
  for (let i = days; i >= 0; i--) {
    const date = today.clone().subtract(i, 'days');
    const trend = (days - i) / days * baseValue * 0.2;  // Upward trend
    const variance = (Math.random() - 0.5) * baseValue * 0.1;  // Random variance
    const value = Math.max(0, baseValue + trend + variance);
    
    data.push({
      period: date.format('YYYY-MM-DD'),
      value: Math.round(value * 10) / 10
    });
  }
  
  return data;
}
```

## 🎯 Use Cases

1. **Fitness Apps** - Track weight, workouts, calories over time
2. **Finance Apps** - Visualize spending, savings, investments
3. **Productivity Apps** - Monitor tasks completed, hours worked
4. **Health Apps** - Track vitals, medication adherence, symptoms
5. **Analytics Dashboards** - Display KPIs and metrics
6. **Sales Tracking** - Monitor revenue, leads, conversions
7. **Education Apps** - Track study time, test scores, progress

## 🔧 Best Practices

1. **Data Loading**: Show loading state while fetching data
2. **Error Handling**: Display error message if data fails to load
3. **Empty State**: Show placeholder when no data available
4. **Performance**: Use `trackBy` for large datasets
5. **Responsive**: Test on different screen sizes
6. **Accessibility**: Add ARIA labels for screen readers
7. **Touch Targets**: Ensure interactive elements are at least 44x44px

## 🐛 Troubleshooting

### Chart Not Rendering

- Verify ECharts modules are imported and registered with `.use()`
- Ensure `provideEchartsCore()` is in component providers
- Check that chart container has explicit height in CSS

### Axis Pointer Not Working

- Verify `chartInstance` is set in `onChartInit()`
- Check that data has at least 2 points
- Ensure `dispatchAction()` is called after chart initialization

### Number Flipper Not Animating

- Verify number input is changing
- Check that `ngOnChanges` is firing
- Ensure component is using OnPush detection if applicable

### Gradient Not Showing

- Verify you're creating `LinearGradient` with correct parameters
- Check that `areaStyle` is part of series configuration
- Ensure `CanvasRenderer` is imported and registered

## 📝 Component APIs

### MetricSwitcherComponent

**Inputs:**
- `@Input() metric: string` - Current metric ('weight', 'volume', etc.)
- `@Input() total: number` - Current total value to display
- `@Input() percentageChange: number` - Percentage change value
- `@Input() percentageChangeDirection: string` - 'up', 'down', or 'none'

**Outputs:**
- `@Output() metricSelectedEvent` - Emits selected metric string

### NumberFlipperComponent

**Inputs:**
- `@Input() number: number` - Number to display (auto-formats 1000+ as K)
- `@Input() digitHeight: number` - Height of each digit in pixels (default: 40)

## 📝 Source

Extracted from **SuperSimpleWorkout** app by Jeff Denton.

**Original Use Case**: Exercise progress tracking - users view weight lifted, volume (reps × sets), distance run, and workout duration over various time periods.

## 🔗 Related Components

- **Button Bar** - Time range selector (already in widgets/)
- **Circular Gauge Chart** (future) - Completion percentage display
- **Bar Chart** (future) - Comparison visualization

---

**Version**: 1.0.0  
**Last Updated**: October 17, 2025  
**License**: MIT

