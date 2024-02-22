import { storeMeal, dashboard, logout, payment, profile, withdraw } from '../../public/assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
    isEnable: true
  },
  {
    name: 'meal',
    imgUrl: storeMeal,
    link: '/orders/store',
    isEnable: true
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    isEnable: false
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    isEnable: false
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
    isEnable: true
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    isEnable: false
  },
];
