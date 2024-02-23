import { storeMeal, dashboard, logout, payment, profile, withdraw } from '../../public/assets';
import { RxDashboard } from "react-icons/rx";

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
    isEnable: true,
    icon:RxDashboard
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
