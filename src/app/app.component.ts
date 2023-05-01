import { Component } from '@angular/core';
import { WordService } from './services/word.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'word-dairy';
  
   constructor(private WordService: WordService) { }

    ngOnInit(): void {
        this.WordService.loadWords().subscribe({
            error: (err) => console.log('err:', err)
        })
    }
}
