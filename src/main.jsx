// main.js
import "../src/styles/index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./configurations/store";
import RouterComponent from "./configurations/router";
import { ArticleProvider } from "./contexts/ArticleContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ForumProvider } from "./contexts/ForumContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BMIProvider } from "./contexts/BmiContext";
import { ConsultantProvider } from "./contexts/ConsultantContext";

const queryClient = new QueryClient();
const root = document.getElementById("root");

if (root.hasChildNodes()) {
  createRoot(root).hydrate(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <ArticleProvider>
            <ForumProvider>
              <BMIProvider>
                <ConsultantProvider>
                <RouterComponent />
                </ConsultantProvider>
              </BMIProvider>
            </ForumProvider>
          </ArticleProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>,
  );
} else {
  createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <ArticleProvider>
            <ForumProvider>
              <BMIProvider>
                <ConsultantProvider>
                <RouterComponent />
                </ConsultantProvider>
              </BMIProvider>
            </ForumProvider>
          </ArticleProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>,
  );
}