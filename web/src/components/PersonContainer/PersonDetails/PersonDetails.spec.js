import { render } from "@testing-library/react";
import PersonDetails from ".";

describe("PersonDetails should render correctly", () => {
  it("renders person details page with name and description", () => {
    const { getByText } = render(
      <PersonDetails name="Sammy J" description="I love cooking!" />
    );

    expect(getByText("Meet Sammy J")).toBeDefined();
    expect(getByText("I love cooking!")).toBeDefined();
  });

  it("renders person details page with name and no description", () => {
    const { getByText } = render(
      <PersonDetails name="Sammy J" description="" />
    );

    expect(getByText("Meet Sammy J")).toBeDefined();
    expect(getByText("No description available")).toBeDefined();
  });
});
