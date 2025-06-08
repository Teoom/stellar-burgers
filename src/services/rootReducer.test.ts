import { rootReducer } from './store';
import store from './store';

test('проверка работы rootReducer', () => {
  const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(initialState).toEqual(store.getState());
});
