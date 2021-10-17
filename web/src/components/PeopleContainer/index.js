import { useQuery } from "../../utils/graphql";
import PeopleList from "./PeopleList";
import AddPersonForm from "../Forms/AddPersonForm";
import { Col, Container, Row } from "react-bootstrap";

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
  const { data, isLoading, refetch } = useQuery(query, { staleTime: Infinity });
  const people = data?.people;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // ideally we should update the cache instead of refetch, however for some reason I could not retrieve cache successfully in AddPersonForm therefore passing the refetch
  const handleUpdateSuccess = () => {
    refetch();
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <h3>Our people</h3>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col>
          {people.length ? (
            <PeopleList people={people} onDeleteSuccess={handleUpdateSuccess} />
          ) : (
            <p>No people!</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <AddPersonForm onCreateSuccess={handleUpdateSuccess} />
        </Col>
      </Row>
    </Container>
  );
};

export default PeopleContainer;
