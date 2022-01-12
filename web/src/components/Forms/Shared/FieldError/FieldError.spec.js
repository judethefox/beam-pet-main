import { FieldError } from "./index";
import { render } from "@testing-library/react";

describe("Test FieldError", () => {
  const setup = error => {
    const { container, getByPlaceholderText, getByText } = render(
      <FieldError error={error} />
    );

    return { container, getByPlaceholderText, getByText };
  };

  it("Should show error text correctly", () => {
    const { getByText } = setup("test error");

    expect(getByText("test error")).toBeDefined();
  });

  it("Should show nothing if error is empty", () => {
    const { container } = setup(null);

    expect(container.firstChild).toBeNull();
  });
});
