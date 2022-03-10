import { PATHS } from 'configs/routes.config';

import {
    BasketPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    PaymentPage,
    ProductPage,
    ProductsPage,
    ProtectedOrdersPage,
    RegisterPage,
    UserCategoryPage,
    UserExitPage,
    UserOrdersPage,
    UserProductPage,
    UserProfilePage,
    UserQuantityPage,
    UserSettingPage,
    UsersListPage,
    UserWishListPage
} from 'pages';

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { PrivateRtoutes } from './private.routes';
import { ProtectedForAdminRtoutes, ProtectedRtoutes } from './protected.routes';
import { PublicRtoutes } from './public.routes';

export function AppRouting() {

    return(
        <BrowserRouter>
            <Routes>
                
                <Route element={<PublicRtoutes/>}>
                    <Route path={PATHS.HOME} element={<HomePage/> } />

                    <Route path={PATHS.PRODUCTS} element={<ProductsPage/> } />
                    <Route path={PATHS.PRODUCTS_CAT} element={<ProductsPage /> } />
                    <Route path={PATHS.PRODUCTS_CAT_PAGINATION} element={<ProductsPage /> } />

                    <Route path={PATHS.PRODUCT} element={<ProductPage /> } />
                    <Route path={PATHS.PRODUCT_ID} element={<ProductPage /> } />

                    <Route path={PATHS.BASKET} element={<BasketPage /> } />
                    <Route path={PATHS.CHECKOUT} element={<CheckoutPage /> } />

                    <Route path={PATHS.PAGE404} element={<NotFoundPage /> } />

                    <Route path={PATHS.PAYMENT} element={<PaymentPage />} />
                </Route>

                <Route element={<ProtectedRtoutes/>}>
                    <Route path={PATHS.DASHBOARD} element={<UserProfilePage />} />
                    <Route path={PATHS.DASHBOARD_PROFILE} element={<UserProfilePage />} />
                    <Route path={PATHS.DASHBOARD_ORDERS} element={<UserOrdersPage />} />
                    <Route path={PATHS.DASHBOARD_WISHLIST} element={<UserWishListPage />} />
                    <Route path={PATHS.DASHBOARD_SETTINGS} element={<UserSettingPage />} />
                    <Route path={PATHS.DASHBOARD_EXIT} element={<UserExitPage />} />
                </Route>

                <Route element={<ProtectedForAdminRtoutes/>}>
                    <Route path={PATHS.DASHBOARD_ADMIN_ORDERS} element={<ProtectedOrdersPage />} />
                    <Route path={PATHS.DASHBOARD_PRODUCT} element={<UserProductPage />} />
                    <Route path={PATHS.DASHBOARD_QUANTITY} element={<UserQuantityPage />} />
                    <Route path={PATHS.DASHBOARD_CATEGORY} element={<UserCategoryPage />} />
                    <Route path={PATHS.DASHBOARD_USERS} element={<UsersListPage />} />
                </Route>

                <Route element={<PrivateRtoutes/>}>
                    <Route path={PATHS.LOGIN} element={<LoginPage />} />
                    <Route path={PATHS.REGISTER} element={<RegisterPage />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
}

