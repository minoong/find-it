import App, { AppContext, AppProps } from 'next/app';
import Header from '../components/Header';
import axios from '../lib/api';
import { trackingAPI } from '../lib/api/auth';
import { cookieParse } from '../lib/utils';
import { wrapper } from '../store';
import { userActions } from '../store/user';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  const appInitialProps = await App.getInitialProps(context);
  const cookieObj = cookieParse(context.ctx.req?.headers.cookie || '');

  try {
    if (!isLogged && cookieObj.access_token) {
      axios.defaults.headers.cookie = cookieObj.access_token;
      const { data } = await trackingAPI();

      store.dispatch(userActions.setLoggedUser(data));
    } else {
      console.log('no login...');
    }
  } catch (error) {
    console.error(error);
  }

  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
