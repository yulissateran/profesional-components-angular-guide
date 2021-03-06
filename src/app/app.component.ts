import { Component, ViewChild, AfterContentInit, AfterViewInit, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './components/simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  counterProgress: number = 0;
  totalCountdown: number = 15;
  public isAddTimerVisible: boolean = false;
  time = 0;
  title = 'Timers';
  timers: number[];
  @ViewChild('timerInput',{static: false})timeInput: ElementRef;
  @ViewChild('alert',{
    static: false, 
    read: ViewContainerRef
  })alertContainer: ViewContainerRef;
  
  constructor( private renderer: Renderer2){
    this.timers = [3,20,185];
  }
  ngAfterContentInit(): void {
  }
  ngAfterViewInit(): void {
    console.log(this.timeInput);
    this.renderer.setAttribute(
      this.timeInput.nativeElement, 
      'placeholder',
      'Enter seconds' 
    );
    this.renderer.addClass(this.timeInput.nativeElement,'time-in');
  }

  updateProgress($event){
    this.counterProgress = (this.totalCountdown- $event)/this.totalCountdown * 100;
  }
  countdownFinished(){
    this.showEndTimerAlert();
  }

  showAddTimer(){
    this.isAddTimerVisible  = true;
    setTimeout(()=>{
      this.renderer.selectRootElement(
        this.timeInput.nativeElement,
      ).focus();
    })
  }
  hideAddTimer(){
    this.isAddTimerVisible  = false;
  }
  showEndTimerAlert(){
    // this.alerts.first.show();
  }

  submitAddTimer(){
    this.timers.unshift(this.time);
    this.hideAddTimer();
  }
}
