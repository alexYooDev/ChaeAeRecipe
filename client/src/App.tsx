import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/globalStyles';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import Navigation from './components/navigation/Navigation';

import MainPage from './pages/MainPage';

import PrivateOutlet from './auth/PrivateOutlet';
import UserLoginPage from './pages/oath/UserLoginPage';
import UserRegisterPage from './pages/oath/UserRegisterPage';
import KakaoRedirectPage from './pages/oath/KakaoRedirectPage';
import GoogleRedirectPage from './pages/oath/GoogleRedirectPage';

import CreateRecipePage from './pages/recipe/CreateRecipePage';
import RecipeDetailPage from './pages/recipe/RecipeDetailPage';
import UpdateRecipePage from './pages/recipe/UpdateRecipePage';
import AnalysisResultPage from './pages/image-search/AnalysisResultPage';
import WordSearchPage from './pages/word-search/WordSearchPage';

import KindSelectPage from './pages/image-search/KindSelectPage';
import ImageSearchPage from './pages/image-search/ImageSearchPage';
import ImageUploadPage from './pages/image-search/ImageUploadPage';

import GuidePage from './pages/GuidePage';

import Error404 from './pages/error/Error404';
import { authState } from './store/store';

const queryClient = new QueryClient();

function App() {
  const cookie = new Cookies();
  const [authenticated, setAuthenticated] = useRecoilState(authState);

  useEffect(() => {
    if (cookie.get('access_token')) {
      setAuthenticated(true);
    }
  }, []);

  //브라우저 종료 시 쿠키 삭제
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    cookie.remove('access_token');
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/image-upload' element={<ImageUploadPage />} />
        <Route path='/image-search' element={<ImageSearchPage />} />
        <Route path='/kind-select' element={<KindSelectPage />} />
        <Route path='/word-search' element={<WordSearchPage />} />
        <Route path='/search-result' element={<AnalysisResultPage />} />
        <Route path='recipes/:id' element={<RecipeDetailPage />} />
        <Route path='/register' element={<UserRegisterPage />} />
        <Route path='/login' element={<UserLoginPage />} />
        <Route path='/guide' element={<GuidePage />} />
        <Route path='/user/kakao/callback' element={<KakaoRedirectPage />} />
        <Route path='/user/google/callback' element={<GoogleRedirectPage />} />
        <Route path='/*' element={<Error404 />} />
        <Route element={<PrivateOutlet />}>
          <Route path='/create-recipe' element={<CreateRecipePage />} />
          <Route path='/update-recipe' element={<UpdateRecipePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
