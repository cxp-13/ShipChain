import { storeMeal, dashboard, logout, payment, profile, withdraw } from '../../public/assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'meal',
    imgUrl: storeMeal,
    link: '/orders/new',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];
