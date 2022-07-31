import { Provider } from 'react-redux';

import Layout from '../components/layout'
import store from '../store/calories';


export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
