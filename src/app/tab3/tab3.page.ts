import { Component, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'] 
})
export class Tab3Page {
  @ViewChild("logo", { read: ElementRef, static: false})
  logo: ElementRef;

  constructor(public gestureCtrl: GestureController,
    public render: Renderer2) {
      console.log("logo", this.logo);
      
    }
    
  
  // currentTouch = { y: 0, time: 0 };
  // // show: boolean = false;
  // showDiv: boolean = false;
  // hideDiv: boolean = false;

  // @HostListener('touchstart', ['$event'])
  // @HostListener('touchend', ['$event'])
  // // @HostListener('touchcancel', ['$event'])

  // touchKar(event) {
  //   let touch = event.touches[0] || event.changedTouches[0];
  //   console.log('touch', touch);

  //   if (event.type === 'touchstart') {
  //     this.currentTouch.y = touch.pageY;
  //     this.currentTouch.time = event.timeStamp;
  //   } else if (event.type === 'touchend') {
  //     let widthy = touch.pageY - this.currentTouch.y;
  //     let deltaTime = event.timeStamp - this.currentTouch.time;

  //     if (deltaTime < 500) {
  //       if (Math.abs(widthy) > 60) {
  //         if (widthy > 0) {
  //           this.rightLaja(event);
  //         }
  //         else {
  //           this.leftLaja(event);
  //         }
  //       }
  //     }
  //   }
  // }

  async ngAfterViewInit() {
    let gesture = await this.gestureCtrl.create({
      el: this.logo.nativeElement, 
      gestureName: 'card',
      gesturePriority: 100,
      threshold: 5,
      passive: false,
      onStart: () => {
        console.log("start point");
        this.render.setStyle(this.logo.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev);
        this.render.setStyle(this.logo.nativeElement, "transform", `translateX(${ev.deltaY}px) rotate(${ev.deltaY/15}deg`);
        // rotate(${ev.deltaX/20}deg
      },
      onEnd: ev => {
        console.log("end point");
        console.log(ev);
        
        this.render.setStyle(this.logo.nativeElement, "transition", "0.4s ease-out");

        if (ev.deltaY > 200) {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateY(350px)`);
        } else if (ev.deltaY > -200) {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateY(-350px)`);
        } else {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateY(10px)`);
        }
      }
    });
    gesture.enable();
  }

  // leftLaja(event) {
  //   // this.render.setStyle(this.logo.nativeElement, "transform", `translateX(${ev.deltaX}px) rotate(${ev.deltaX/15}deg`);
  //   console.log('left', event);
  //   // this.show = true;
  //   this.showDiv = true;
  //   this.hideDiv = false;
  // }

  // rightLaja(event) {
  //   console.log('right', event);
  //   // this.show = false;
  //   this.hideDiv = true;
  //   this.showDiv = false;
  // }
}
