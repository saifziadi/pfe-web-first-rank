import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewListComponent } from './review-list/review-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'profile',   component: UserProfileComponent },
    { path: 'reviews/list',   component: ReviewListComponent },
    { path:'events',loadChildren:()=> import('../../layouts/admin-layout/events/events.module').then(m=>m.EventsModule)},
    { path:'agents',loadChildren:()=> import('../../layouts/admin-layout/agents/agents.module').then(m=>m.AgentsModule)},
    { path:'blogs',loadChildren:()=> import('../../layouts/admin-layout/blog/blog.module').then(m=>m.BlogModule)},
    { path:'tools',loadChildren:()=> import('../../layouts/admin-layout/tool/tool.module').then(m=>m.ToolModule)},
];
