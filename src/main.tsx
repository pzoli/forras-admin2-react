import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { AuthProvider } from "react-oidc-context";
import { httpClient } from "./utils/HttpClient.ts";
import { WebStorageStateStore } from "oidc-client-ts";
import { AxiosContext } from "./components/AxiosContext.ts";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
const oidcConfig = {
  authority: "https://exprog.hu:9443/realms/infokristaly",
  client_id: "public-client",
  redirect_uri: "http://localhost:3000/",
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true,
  automaticSilentRenew: true,
};

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
    <AxiosContext.Provider value={httpClient}>
      <AuthProvider {...oidcConfig}
      onSigninCallback={(user) => {
        console.log(`Signin callback called. user access token: ${user?.access_token}`)
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${user?.access_token}`;
      }}
      onRemoveUser={() => {
      }}>
        <App />
        
      </AuthProvider>
      </AxiosContext.Provider>
    </QueryClientProvider>
  </StrictMode >,
)
