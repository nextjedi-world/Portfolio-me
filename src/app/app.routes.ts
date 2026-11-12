import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'privacy',
    loadComponent: () =>
      import('../components/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('../components/terms-of-use.component').then((m) => m.TermsOfUseComponent),
  },
  {
    path: ':projectSlug/detail',
    loadComponent: () =>
      import('../components/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: '',
    loadComponent: () => import('../components/home.component').then((m) => m.HomeComponent),
  },
];
