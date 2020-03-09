import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() { }
  // currentTouch: any = {};
  currentTouch = { x: 0, time: 0 };
  show: boolean = false;
  showDiv: boolean = false;
  hideDiv: boolean = false;

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  // @HostListener('touchcancel', ['$event'])

  touchKar(event) {
    let touch = event.touches[0] || event.changedTouches[0];
    console.log('touch', touch);

    if (event.type === 'touchstart') {
      this.currentTouch.x = touch.pageX;
      this.currentTouch.time = event.timeStamp;

    } else if (event.type === 'touchend') {
      let widthx = touch.pageX - this.currentTouch.x;
      let deltaTime = event.timeStamp - this.currentTouch.time;

      if (deltaTime < 500) {
        if (Math.abs(widthx) > 60) {
          if (widthx > 0) {
            this.rightLaja(event);
          }
          else {
            this.leftLaja(event);
          }
        }
      }
    }
  }

  leftLaja(event) {
    console.log('left', event);
    // this.show = true;
    this.showDiv = true;
    this.hideDiv = false;
  }

  rightLaja(event) {
    console.log('right', event);
    // this.show = false;
    this.hideDiv = true;
    this.showDiv = false;
  }
}
