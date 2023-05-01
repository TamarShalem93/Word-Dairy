import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { Word } from '../models/word';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.scss']
})
export class WordEditComponent implements OnInit {

    constructor(
        private wordService: WordService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    word = this.wordService.getEmptyWord() as Word
    subscription!: Subscription

    ngOnInit(): void {
       
        this.subscription = this.route.data
            .pipe(            
                map(data => data['word']),
                filter(word => word)
            )
            .subscribe(word => this.word = word)
    }

    onSaveWord() {
        this.wordService.saveWord(this.word)
            .subscribe({
                next: () => this.router.navigateByUrl('/words'),
                error: err => console.log('err:', err)
            })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }
}
