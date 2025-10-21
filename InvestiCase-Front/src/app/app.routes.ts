import { Routes } from '@angular/router';
import { ArchiveComponent } from './features/archive/archive.component';
import { CaseDetailComponent } from './features/case-detail/case-detail.component';
import { AddCaseComponent } from './features/add-case/add-case.component';
import { HomeComponent } from './features/home/home.component';
import { CalendarComponent } from './features/calendar/calendar.component';

export const routes: Routes = [
	{
		path: 'archive',
		component: ArchiveComponent
	},
	{
		path: 'case/:id',
		component: CaseDetailComponent
	},
	{
		path: 'add-case',
		component: AddCaseComponent
	},
	{
		path: 'calendar',
		component: CalendarComponent
	},
	{
		path: '',
		component: HomeComponent
	}
];
