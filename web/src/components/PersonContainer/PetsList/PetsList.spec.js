import PetsList from ".";
import customRender from "../../Shared/customRender";

describe("test PetsList", () => {
  it("renders a list of pets", () => {
    const pets = [
      {
        id: 1,
        name: "grass grazer",
        age: 10,
        species: "rabbit"
      },
      {
        id: 2,
        name: "bonecrusher",
        age: 5,
        species: "dog"
      }
    ];

    const { getAllByText, getByText } = customRender(
      <PetsList pets={pets} onDeleteSuccess={() => {}} />
    );

    expect(getByText("grass grazer")).toBeDefined();
    expect(getByText("bonecrusher")).toBeDefined();
    expect(getAllByText("Delete")).toHaveLength(2);
  });
});
