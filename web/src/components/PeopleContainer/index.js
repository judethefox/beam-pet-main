import { useQuery } from "@/utils/graphql";
import PeopleList from "./PeopleList";

const GET_PEOPLE = /* GraphQL */ `
  query GetPeople {
    people {
      id
      name
    }
  }
`;

const PeopleContainer = () => {
  const query = [GET_PEOPLE];
  const { data, isLoading } = useQuery(query);
  const people = data?.people;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>Our people</h3>
      <PeopleList people={people} />
    </>
  );
};

export default PeopleContainer;
