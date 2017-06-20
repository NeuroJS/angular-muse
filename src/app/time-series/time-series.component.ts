import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SmoothieChart, TimeSeries } from 'smoothie';
import { channelNames, EEGSample } from 'muse-js';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

import { ChartService } from '../shared/chart.service';

@Component({
  selector: 'time-series',
  templateUrl: 'time-series.component.html',
  styleUrls: ['time-series.component.css'],
})
export class TimeSeriesComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() data: Observable<EEGSample>;

  channels = 4;
  channelNames = channelNames.slice(0, this.channels);
  bufferTime = 1000;
  sampleRate = 256; // hz per second
  samplesPerMills = this.bufferTime / this.sampleRate; // 4
  millisPerPixel = 3;
  plotDelay = 1000;

  stream$;
  amplitudes = [];
  options = this.chartService.getChartSmoothieDefaults({ millisPerPixel: this.millisPerPixel });
  colors = this.chartService.getColors();
  timer$ = Observable.interval(this.samplesPerMills).take(this.sampleRate);
  canvases = Array(this.channels).fill(0).map(() => new SmoothieChart(this.options));
  lines = Array(this.channels).fill(0).map(() => new TimeSeries());

  constructor(private view: ElementRef, private chartService: ChartService) {
    this.chartService = chartService;
  }

  ngAfterViewInit() {
    const channels = this.view.nativeElement.querySelectorAll('canvas');
    this.canvases.forEach((canvas, index) => {
      canvas.streamTo(channels[index], this.plotDelay);
    });
  }

  ngOnInit() {
    this.addTimeSeries();
    this.data.subscribe(sample => {
      sample.data.slice(0, this.channels).forEach((electrode, index) => {
        this.draw(electrode, index);
      });
    });
  }

  addTimeSeries() {
    this.lines.forEach((line, index) => {
      this.canvases[index].addTimeSeries(line, {
        lineWidth: 2,
        strokeStyle: this.colors[index].borderColor
      });
    });
  }

  draw(amplitude, index) {
    this.lines[index].append(new Date().getTime(), Number(amplitude));
    this.amplitudes[index] = Number(amplitude).toFixed(2);
  }

  ngOnDestroy() {
  }

}
