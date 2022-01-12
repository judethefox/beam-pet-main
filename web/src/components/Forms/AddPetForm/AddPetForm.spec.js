import AddPersonForm from "./index";
import { act, fireEvent } from "@testing-library/react";
import customRender from "../../Shared/customRender";

describe("Test Add pet form", () => {
  const setup = () => {
    const handleClick = () => {};

    const { container, getByPlaceholderText, getByText } = customRender(
      <AddPersonForm onCreateSuccess={handleClick} personId="1" />
    );

    return { container, getByPlaceholderText, getByText };
  };

  it("fields are rendered correctly", () => {
    const { getByPlaceholderText } = setup();

    expect(getByPlaceholderText("Name (Required)")).toBeDefined();
    expect(getByPlaceholderText("Species (Required)")).toBeDefined();
    expect(getByPlaceholderText("Age (Required)")).toBeDefined();
  });

  it("click button without filling the name field should trigger error", () => {
    const { getByText } = setup();

    fireEvent.click(getByText("Add new pet"));

    expect(getByText("Name cannot be empty")).toBeDefined();
    expect(
      getByText("Please enter positive integer or 0 as age")
    ).toBeDefined();
    expect(getByText("Species cannot be empty")).toBeDefined();
  });

  it("button should show saving when loading", async () => {
    const { getByPlaceholderText, getByText } = setup();
    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Name (Required)"), {
        target: { value: "Marshmallow" }
      });
      await fireEvent.change(getByPlaceholderText("Age (Required)"), {
        target: { value: "12" }
      });
      await fireEvent.change(getByPlaceholderText("Species (Required)"), {
        target: { value: "Turtle" }
      });
      await fireEvent.click(getByText("Add new pet"));

      expect(getByText("Saving")).toBeDefined();
    });
  });
});
