import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CharacterDetailsComponent } from './character/characterDetails.component';

export const routes: Routes = [
    {
        path: '', component: ListComponent
    },
    { path: 'character/:id/details', component: CharacterDetailsComponent }
];
