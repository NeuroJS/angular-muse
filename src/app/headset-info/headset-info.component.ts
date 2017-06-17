import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MuseControlResponse } from 'muse-js';

@Component({
  selector: 'app-headset-info',
  templateUrl: './headset-info.component.html',
  styleUrls: ['./headset-info.component.css']
})
export class HeadsetInfoComponent implements OnInit, OnChanges {
  @Input() controlResponses: Observable<MuseControlResponse>;

  headsetName: Observable<string>;
  firmwareVersion: Observable<string>;
  hardwareVersion: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.controlResponses) {
      const cr = this.controlResponses;
      this.headsetName = cr.map(response => response.hn).filter(Boolean);
      this.firmwareVersion = cr.map(response => response.fw).filter(Boolean);
      this.hardwareVersion = cr.map(response => response.hw).filter(Boolean);
    }
  }
}
