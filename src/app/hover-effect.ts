import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[hoverEffect]'
  })
  export class HoverEffectDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) { }
  
    @HostListener('mouseenter') onMouseEnter() {
      this.changeBackgroundColor('whitesmoke');
    }
  
    @HostListener('mouseleave') onMouseLeave() {
      this.changeBackgroundColor('white');
    }
  
    private changeBackgroundColor(color: string) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
  }