import { PATHS } from 'configs/routes.config';

import {
    BasketPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    PaymentPage,
    PaymentResultFailPage,
    PaymentResultSuccessPage,
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
                {/* Public Routes */}
                <Route path={PATHS.HOME} element={<PublicRoute component={<HomePage />} /> } />

                <Route path={PATHS.PRODUCTS} element={<PublicRoute component={<ProductsPage />} /> } />
                <Route path={PATHS.PRODUCTS_CAT} element={<PublicRoute component={<ProductsPage />} /> } />
                <Route path={PATHS.PRODUCTS_CAT_PAGINATION} element={<PublicRoute component={<ProductsPage />} /> } />

                <Route path={PATHS.PRODUCT} element={<PublicRoute component={<ProductPage />} /> } />
                <Route path={PATHS.PRODUCT_ID} element={<PublicRoute component={<ProductPage />} /> } />

                <Route path={PATHS.BASKET} element={<PublicRoute component={<BasketPage />} /> } />
                <Route path={PATHS.CHECKOUT} element={<PublicRoute component={<CheckoutPage />} /> } />

                <Route path={PATHS.PAGE404} element={<PublicRoute component={<NotFoundPage />} /> } />

                {/* Private And Protected Routes */}
                <Route path={PATHS.LOGIN} element={<LoginPage />} />
                <Route path={PATHS.REGISTER} element={<RegisterPage />} />

                <Route path={PATHS.DASHBOARD} element={<UserProfilePage />} />
                <Route path={PATHS.DASHBOARD_PROFILE} element={<UserProfilePage />} />
                <Route path={PATHS.DASHBOARD_ORDERS} element={<UserOrdersPage />} />
                <Route path={PATHS.DASHBOARD_PRODUCT} element={<UserProductPage />} />
                <Route path={PATHS.DASHBOARD_QUANTITY} element={<UserQuantityPage />} />

                <Route path={PATHS.PAYMENT} element={<PaymentPage />} />
                <Route path={PATHS.PAYMENT_FAILURE} element={<PaymentResultFailPage />} />
                <Route path={PATHS.PAYMENT_SUCCESS} element={<PaymentResultSuccessPage />} />

            </Routes>
        </BrowserRouter>
    );
}

