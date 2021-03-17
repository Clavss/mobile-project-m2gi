import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {OnlyNotLoggedAuthGuard} from "./shared/guard/onlyNotLogged.guard";
import {OnlyLoggedAuthGuard} from "./shared/guard/onlyLogged.guard";
import {VerifyEmailGuard} from "./shared/guard/verifyEmail.guard";

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
		canActivate: [OnlyLoggedAuthGuard]
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'list-details/:list-id',
		canActivate: [OnlyLoggedAuthGuard],
		children: [
			{
				path: 'todo-details/:todo-id',
				loadChildren: () => import('./pages/todo-details/todo-details.module').then(m => m.TodoDetailsPageModule),
				canActivate: [OnlyLoggedAuthGuard]
			},
			{
				path: '',
				loadChildren: () => import('./pages/list-details/list-details.module').then(m => m.ListDetailsPageModule),
				canActivate: [OnlyLoggedAuthGuard]
			}
		]
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
		canActivate: [OnlyNotLoggedAuthGuard]
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
		canActivate: [OnlyNotLoggedAuthGuard]
	},
	{
		path: 'password-recovery',
		loadChildren: () => import('./pages/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule),
		canActivate: [OnlyNotLoggedAuthGuard]
	},
	{
		path: 'verify-email',
		loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule),
		canActivate: [OnlyLoggedAuthGuard, VerifyEmailGuard]
	},
	{
		path: 'voice',
		loadChildren: () => import('./pages/voice/voice.module').then(m => m.VoicePageModule),
		canActivate: [OnlyLoggedAuthGuard]
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
