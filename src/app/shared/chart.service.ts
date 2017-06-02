import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  constructor() {}
  
  getChartSmoothieDefaults (overrides: any = {}): any {
    return Object.assign({
        responsive: true,
        millisPerPixel: 5,
        grid: {
            lineWidth: 4,
            fillStyle: 'transparent',
            strokeStyle: 'transparent',
            sharpLines: true,
            verticalSections: 0,
            borderVisible: false
        },
        labels: {
            disabled: true
        }
    }, overrides);
  }
  
  getChannels (): Array<string> {
    return Array(8).fill('CH').map((item, index) => item + (index + 1));
  }
  
  getColors (): Array<any> {
    return [
      { borderColor: 'rgba(112,185,252,1)', backgroundColor: 'rgba(112,185,252,1)' },
      { borderColor: 'rgba(116,150,161,1)', backgroundColor: 'rgba(116,150,161,1)' },
      { borderColor: 'rgba(162,86,178,1)', backgroundColor: 'rgba(162,86,178,1)' },
      { borderColor: 'rgba(144,132,246,1)', backgroundColor: 'rgba(144,132,246,1)' },
      { borderColor: 'rgba(138,219,229,1)', backgroundColor: 'rgba(138,219,229,1)' },
      { borderColor: 'rgba(207,181,59, 1)', backgroundColor: 'rgba(207,181,59, 1)' },
      { borderColor: 'rgba(148,159,177,1)', backgroundColor: 'rgba(148,159,177,1)' },
      { borderColor: 'rgba(77,83,96,1)', backgroundColor: 'rgba(77,83,96,1)' }
    ]; 
  }
  
  getColorByIndex (index: number): Array<any> {
    return this.getColors().filter((c, i) => index === i);
  }

}
