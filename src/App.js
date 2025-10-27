import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import PrivateRoute from './common/components/route/PrivateRoute';
import AdminRoute from './common/components/route/AdminRoute';
import { adminPath, mainPath } from './common/hooks/urlManager';

import MainPage    from './MainPage';
import AddQuizPage from './quiz/AddQuizPage'

function App() {

  const publicRoutes = [
    { path: mainPath, element: <MainPage/> },                  /* 메인 페이지 */

    // { path: authPath.login,      element: <LoginPage /> },  /* 로그인 페이지 */

    // { path: "/*", element: <div>존재하지 않는 페이지</div> },  /* 존재하지 않는 페이지 */
  ];

  const privateRoutes = [
    // { path: authPath.signout, element: <SignOutPage /> },   /* 회원 탈퇴 페이지 */

    // { path: myPath.my, element: <MyPage /> },               /* 마이 페이지 페이지 */
  ];

  const adminRoutes = [
    // { path: adminPath.admin, element: <AdminPage /> },      /* 어드민 페이지 */
    {path: adminPath.addQuizPage, element: <AddQuizPage/>}, /* 퀴즈 추가 페이지 */
  ];

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
          
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ route.element } />
            ))}

            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ <PrivateRoute> {route.element} </PrivateRoute> } />
            ))}

            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ <AdminRoute> {route.element} </AdminRoute> } />
            ))}
          </Routes>

      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
