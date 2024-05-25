
import { Provider } from 'react-redux';
import './App.css';
import Router from './Router';
import store from './Redux/store';
import Toast from './CommanComponets/Toster';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Toast />
    </Provider>
  );
}

export default App;
