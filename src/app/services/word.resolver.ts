import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { WordService } from "./word.service";
import { delay } from "rxjs";


export function wordResolver(route: ActivatedRouteSnapshot) {
    const id = route.params['id']
    console.log(id)
    return inject(WordService).getWordById(id).pipe(delay(10))
}