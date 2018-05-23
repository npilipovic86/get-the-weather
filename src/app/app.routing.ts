import { RouterModule, Routes } from '@angular/router';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceWeatherComponent } from './place-weather/place-weather.component';


const routes: Routes = [
  { path: 'forecast', component: PlaceListComponent },
  { path: 'forecast/place/:id', component: PlaceWeatherComponent },
  { path: '', redirectTo: 'forecast', pathMatch: 'full' },
  { path: '**', redirectTo: 'forecast', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes,  {
  enableTracing: false
});
