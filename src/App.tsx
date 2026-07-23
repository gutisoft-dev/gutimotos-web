import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { ToastContainer } from "react-toastify";
import { CheckAuthProvider } from "./auth/providers/CheckAuthProvider";
import { TooltipProvider } from "./components/ui/tooltip";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <CheckAuthProvider>
        <TooltipProvider>
          <RouterProvider router={appRouter} />
        </TooltipProvider>
      </CheckAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
