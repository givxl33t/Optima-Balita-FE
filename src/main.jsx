// main.js
import "../src/styles/index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configurations/store";
import RouterComponent from "./configurations/router";
import { ArticleProvider } from "./contexts/ArticleContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ForumProvider } from "./contexts/ForumContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BMIProvider } from "./contexts/BmiContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <ArticleProvider>
          <ForumProvider>
            <BMIProvider>
              <RouterComponent />
            </BMIProvider>
          </ForumProvider>
        </ArticleProvider>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>,
  document.getElementById("root"),
);
