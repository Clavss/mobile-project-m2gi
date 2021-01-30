import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'list-details/:id',
		loadChildren: () => import('./pages/list-details/list-details.module').then(m => m.ListDetailsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'todo-details/:id',
		loadChildren: () => import('./pages/todo-details/todo-details.module').then(m => m.TodoDetailsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
	},
	{
		path: 'password-recovery',
		loadChildren: () => import('./pages/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'verify-email',
		loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule),
		canActivate: [AuthGuard]
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
