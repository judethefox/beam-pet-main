import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@testing-library/react";
import { Provider } from "../../utils/graphql";

const queryClient = new QueryClient();

const CustomRender = ({ children }) => (
  <Provider endpoint="http://localhost/graphql">
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  </Provider>
);

// Wrap test components in providers needed
const customRender = (ui, options) =>
  render(ui, { wrapper: CustomRender, ...options });

export default customRender;
