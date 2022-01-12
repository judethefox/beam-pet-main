import { useQuery } from "@/utils/graphql";
import PersonDetails from "./PersonDetails";
import PetsList from "@/components/PersonContainer/PetsList";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import AddPetForm from "@/components/Forms/AddPetForm";

const GET_PERSON = /* GraphQL */ `
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
      description
      pets {
        id
        name
        age
        species
      }
    }
  }
`;

const PersonContainer = ({ id }) => {
  const query = [GET_PERSON, { id }];

  const { data, isLoading, refetch } = useQuery(query);
  const person = data?.person;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { name, description, pets } = person;

  const handlePetUpdateSuccess = () => {
    // Again, this should not be necessary if I could get the cache manipulation working
    refetch();
  };

  return (
    <Container fluid="sm">
      <Row className="pb-3">
        <Col>
          <PersonDetails name={name} description={description} />
        </Col>
      </Row>

      <Row className="pb-3">
        <Col>
          {pets.length ? (
            <PetsList pets={pets} onDeleteSuccess={handlePetUpdateSuccess} />
          ) : (
            `Poor ${name} doesn't have any pet`
          )}
        </Col>
      </Row>

      <Row className="pb-3">
        <Col>
          <AddPetForm personId={id} onCreateSuccess={handlePetUpdateSuccess} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Link href="/">
            <a>Back to the people list</a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonContainer;
