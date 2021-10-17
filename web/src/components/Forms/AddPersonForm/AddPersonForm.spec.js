import AddPersonForm from "./index";
import { act, fireEvent } from "@testing-library/react";
import customRender from "../../Shared/customRender";

describe("Test Add person form", () => {
  const setup = () => {
    const handleClick = () => {};

    const { container, getByPlaceholderText, getByText } = customRender(
      <AddPersonForm onCreateSuccess={handleClick} />
    );

    return { container, getByPlaceholderText, getByText };
  };

  it("fields are rendered correctly", () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByText("Add new person")).toBeDefined();
    expect(getByPlaceholderText("Name (Required)")).toBeDefined();
    expect(getByPlaceholderText("Description")).toBeDefined();
  });

  it("click button without filling the name field should trigger error", () => {
    const { getByText } = setup();
    fireEvent.click(getByText("Add new person"));
    expect(getByText("Name cannot be empty")).toBeDefined();
  });

  it("button should show saving when loading", async () => {
    const { getByPlaceholderText, getByText } = setup();
    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Name (Required)"), {
        target: { value: "Test name" }
      });
      await fireEvent.click(getByText("Add new person"));

      expect(getByText("Saving")).toBeDefined();
    });
  });
});
