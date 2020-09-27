import "../styles/global.css";
import darkModeContext from "../context/darkMode";
import { useState } from "react";
import { Provider } from "react-redux"; //Component에서 store를 사용할 수 있게 한다
import withRedux from "next-redux-wrapper"; //nextjs에서 redux를 사용할 때
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const Blog = ({ Component, pageProps, store }) => {
  // const [dark, setDark] = useState(true);
  console.log(store);
  return (
    <>
      {/* <Provider store={store}> */}
      {/* <darkModeContext.Provider value={[dark, setDark]}> */}
      <Component {...pageProps} />
      {/* </darkModeContext.Provider> */}
      {/* </Provider> */}
    </>
  );
};

const configureStore = (initialState, options) => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  return store;
};

export default withRedux(configureStore)(Blog);
