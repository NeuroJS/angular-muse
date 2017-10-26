import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { EEGSample, channelNames } from 'muse-js';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {
  @Input() data: Observable<EEGSample>;

  recording = false;

  private samples: number[][];
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  startRecording() {
    this.recording = true;
    this.samples = [];
    this.subscription = this.data.subscribe(sample => {
      this.samples.push([sample.timestamp, ...sample.data]);
    });
  }

  stopRecording() {
    this.recording = false;
    this.subscription.unsubscribe();
    this.saveToCsv(this.samples);
  }

  get sampleCount() {
    return this.samples.length;
  }

  saveToCsv(samples: number[][]) {
    const a = document.createElement('a');
    const headers = ['time', ...channelNames].join(',');
    const csvData = headers + '\n' + samples.map(item => item.join(',')).join('\n');
    const file = new Blob([csvData], { type: 'text/csv' });
    a.href = URL.createObjectURL(file);
    document.body.appendChild(a);
    a.download = 'recording.csv';
    a.click();
    document.body.removeChild(a);
  }
}
