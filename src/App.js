import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistedStore, store } from './redux/store/store';
import Screen from './screens';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <Screen />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
