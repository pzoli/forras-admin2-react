import './App.css'
import './scss/main.scss'
import './components/Header'
import Protected from './components/Protected'
import Navigation from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Doctor from './components/Doctor'
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";
import { AxiosContext } from "./components/AxiosContext.ts";
import axios from "axios";
import {useRef} from "react";

const oidcConfig = {
    authority: "https://exprog.hu:9443/realms/infokristaly",
    client_id: "public-client",
    redirect_uri: "http://localhost:3000/",
    post_logout_redirect_uri: window.location.origin,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    monitorSession: true,
    automaticSilentRenew: true,
};

function App() {


    const httpClient= useRef(axios.create({
    }))

    return (
      <AuthProvider {...oidcConfig}
                    onSigninCallback={(user) => {
                        console.log(`Signin callback called. user access token: ${user?.access_token}`)
                        //httpClient.defaults.headers.common['Authorization'] = `Bearer ${user?.access_token}`;
                        httpClient.current.interceptors.request.use(config => {
                            config.headers.Authorization = `Bearer ${user?.access_token}`;
                            return config;
                        });
                    }}
                    onRemoveUser={() => {
                    }}>
          <AxiosContext.Provider value={httpClient.current}>
              <Navigation />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/doctor" element={<Doctor />} />
                  <Route path="/protected" element={<Protected />} />
                </Routes>
              </BrowserRouter>
          </AxiosContext.Provider>
      </AuthProvider>

  )
}

export default App
