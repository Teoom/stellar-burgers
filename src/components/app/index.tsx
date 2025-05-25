import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import App from './app';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { IngredientDetails } from '../ingredient-details';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<App />}>
        <Route path='/' element={<ConstructorPage />}>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
        </Route>

        <Route path='/feed' element={<Feed />}>
          <Route
            path=':number'
            element={
              <Modal title={() => 'number'}>
                <OrderInfo orderOf='feed' />
              </Modal>
            }
          />
        </Route>
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        >
          <Route
            path=':number'
            element={
              <OnlyAuth
                component={
                  <Modal title={() => 'number'}>
                    <OrderInfo orderOf='user' />
                  </Modal>
                }
              />
            }
          />
        </Route>
      </Route>

      <Route path='*' element={<NotFound404 />} />
    </Route>
  )
);
