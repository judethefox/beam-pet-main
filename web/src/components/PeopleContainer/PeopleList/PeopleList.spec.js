import PeopleList from ".";
import customRender from "../../Shared/customRender";

describe("PeopleList renders correctly", () => {
  it("renders a list of people", () => {
    const people = [
      { id: "3", name: "Sammy J" },
      { id: "4", name: "Randy" }
    ];

    const { getByText, getAllByText } = customRender(
      <PeopleList people={people} />
    );

    expect(getByText("Sammy J")).toBeDefined();
    expect(getByText("Randy")).toBeDefined();
    expect(getAllByText("Delete")).toHaveLength(2);
  });
});
