import { PATHS } from 'configs/routes.config';

import {
    BasketPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    ProductPage,
    ProductsPage,
    RegisterPage,
    UserOrdersPage,
    UserProductPage,
    UserProfilePage,
    UserQuantityPage
} from 'pages';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from './public.routes';

export function AppRouting() {
  return(
      <BrowserRouter>
          <Routes>
          </Routes>
      </BrowserRouter>
  );
}

