// Jest setup for unit tests

// Deep clone utility
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Mock Redux Toolkit createSlice
jest.mock('@reduxjs/toolkit', () => {
  const createSliceMock = ({ name, initialState, reducers }) => {
    // Create action creators
    const actions = {};
    Object.keys(reducers).forEach(key => {
      actions[key] = (payload) => ({
        type: `${name}/${key}`,
        payload
      });
    });

    // Create reducer function that properly clones state like RTK
    const reducer = (state, action) => {
      if (!action || !action.type) {
        return state ? deepClone(state) : deepClone(initialState);
      }
      
      const actionName = action.type.replace(`${name}/`, '');
      const reducerFn = reducers[actionName];
      
      if (reducerFn) {
        // Deep clone state for proper immutability
        const currentState = state ? deepClone(state) : deepClone(initialState);
        
        // Apply the reducer
        reducerFn(currentState, action);
        
        return currentState;
      }
      
      return state ? deepClone(state) : deepClone(initialState);
    };

    return {
      name,
      reducer,
      actions,
      getInitialState: () => deepClone(initialState)
    };
  };

  return {
    configureStore: () => ({
      getState: () => ({}),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      replaceReducer: jest.fn()
    }),
    createSlice: createSliceMock
  };
});

// Mock react-native
jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  StyleSheet: { create: (styles) => styles },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  FlatList: 'FlatList',
  ScrollView: 'ScrollView',
  TextInput: 'TextInput',
  Image: 'Image',
  Dimensions: { get: () => ({ width: 375, height: 812 }) },
  ActivityIndicator: 'ActivityIndicator',
  Modal: 'Modal',
  Pressable: 'Pressable',
  Switch: 'Switch',
}));