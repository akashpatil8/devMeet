import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Feed from "./pages/Feed";
import store from "./redux/store";
import Login from "./pages/Login";
import Home from "./components/Home";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Navigate to="/feed" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/view" element={<Profile />} />
            <Route path="/feed" index element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="*" element={<Navigate to="/feed" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Provider>
  );
}

export default App;
