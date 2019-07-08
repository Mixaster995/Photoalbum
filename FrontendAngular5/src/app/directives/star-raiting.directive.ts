import {Directive, ElementRef, Renderer2, HostListener, Input} from '@angular/core';
 
@Directive({
    selector: '[star-raiting]'
})
export class StarRaitingDirective{
    @Input("star-raiting") currentIndex:number;
    
    constructor(private element: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }
     
    @HostListener("mouseenter") onMouseEnter() {
        let stars = this.element.nativeElement.parentElement.parentElement.children;
        for (var i = 0; i < this.currentIndex; i++) {
            this.renderer.setStyle(stars[i].firstElementChild, "color", "#FFCC36");
        }
    }
 
    @HostListener("mouseleave") onMouseLeave() {
        let stars = this.element.nativeElement.parentElement.parentElement.children;
        for (var i = 0; i < 5; i++) {
            this.renderer.setStyle(stars[i].firstElementChild, "color", "#ccc");
        }
    }
}