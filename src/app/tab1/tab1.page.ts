import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { createGesture, Gesture, GestureConfig } from '@ionic/core/dist/types/utils/gesture';
import { GestureController } from '@ionic/angular';

// import { Component, Host, Element, Event, EventEmitter, h } from '@stencil/core';
// import { Gesture, GestureConfig, createGesture } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("logo", { read: ElementRef, static: true})
  logo: ElementRef;

  constructor(
    public gestureCtrl: GestureController,
    public render: Renderer2
  ) {
    // console.log(this.logo);
    
  }

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
        this.render.setStyle(this.logo.nativeElement, "transform", `translateX(${ev.deltaX}px) rotate(${ev.deltaX/15}deg`);
        // rotate(${ev.deltaX/20}deg
      },
      onEnd: ev => {
        console.log("end point");
        console.log(ev);
        
        this.render.setStyle(this.logo.nativeElement, "transition", "0.4s ease-out");

        if (ev.deltaX > 200) {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateX(350px)`);
        } else if (ev.deltaX > -200) {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateX(-350px)`);
        } else {
          this.render.setStyle(this.logo.nativeElement, "transform", `translateX(10px)`);
        }
      }
    });
    
      gesture.enable();
    }
  }
  
  // const gesture: Gesture = await createGesture(this.options);
