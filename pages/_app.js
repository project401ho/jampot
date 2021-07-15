import '../styles/globals.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Amplify from 'aws-amplify'
import awsExports  from '../src/aws-exports'
Amplify.configure({ ...awsExports, ssr: true });

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
