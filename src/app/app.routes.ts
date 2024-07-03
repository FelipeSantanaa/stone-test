import { Routes } from '@angular/router';
import { ConversionComponent } from './pages/conversion/conversion.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
    {
        path: '', component: ConversionComponent
    },
    {
        path: 'result', component: ResultComponent
    }
];
