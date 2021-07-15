import Home from './pages/home';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import store from './redux/store';
import {Reset} from 'styled-reset';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Reset/>
      <Home></Home>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
