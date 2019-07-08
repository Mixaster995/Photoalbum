import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pager',
    styleUrls: [`./pager.component.css`],
    templateUrl:`./pager.component.html`,
})
export class PagerComponent implements OnChanges {
    currentIndexes = new Array<number>(5);
    @Input() amountOfPages:number;
    @Input() inputPageNumber:number;
    @Output() pageChanged = new EventEmitter();

    ngOnChanges(){
        var remainder = this.inputPageNumber % this.currentIndexes.length;
        if(remainder != 0){
            for(var i = 1; i <= this.currentIndexes.length; i++){
                this.currentIndexes[i-1] = this.inputPageNumber - remainder + i;
                if (this.currentIndexes[i-1] > this.amountOfPages){
                    this.currentIndexes[i-1] = 0;
                }
            }
        }
        else{
            for(var i = 1; i <= this.currentIndexes.length; i++){
                this.currentIndexes[i-1] = this.inputPageNumber - this.currentIndexes.length + i;
                if (this.currentIndexes[i-1] > this.amountOfPages){
                    this.currentIndexes[i-1] = 0;
                }
            }
        }      
    } 

    changePage(pageNumber:number){
        this.pageChanged.emit(pageNumber);
    }

    previousPage(){
        if(this.inputPageNumber != 1)
            this.pageChanged.emit(this.inputPageNumber - 1);
    }

    nextPage(){
        if(this.inputPageNumber != this.amountOfPages)
            this.pageChanged.emit(this.inputPageNumber + 1);
    }
}