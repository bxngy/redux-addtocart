import { Provider } from 'react-redux';

import '../styles/globals.css';
import { store } from "../redux/store";
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
};

export default MyApp;
