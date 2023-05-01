import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { WordFilter } from '../models/wordFilter';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-filter',
  templateUrl: './word-filter.component.html',
  styleUrls: ['./word-filter.component.scss']
})
export class WordFilterComponent implements OnInit, OnDestroy  {

    constructor(private wordService: WordService) { }
    destroySubject$ = new Subject<null>()
    filterSubject$ = new Subject()
    wordFilter = {} as WordFilter

    ngOnInit(): void {
      this.wordService.wordFilter$
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(wordFilter => {
          this.wordFilter = wordFilter
      })
      
      this.filterSubject$
        .pipe(
           takeUntil(this.destroySubject$),
           debounceTime(400),
           distinctUntilChanged()
        )
        .subscribe(() => {
          console.log('calling query');
          this.wordService.setFilter(this.wordFilter)
        })
    }

    onSetFilter(val: string) {
        this.filterSubject$.next(val)
    }

    ngOnDestroy(): void {
        this.destroySubject$.next(null)
        this.destroySubject$.complete()

    }

}
