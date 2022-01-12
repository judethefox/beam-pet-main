import { useState } from "react";
import { FieldError } from "../../Forms/Shared/FieldError";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "../../../utils/graphql";
import PropTypes from "prop-types";

const CREATE_PET = /* GraphQL */ `
  mutation CreatePet($input: PetInput!) {
    createPet(input: $input) {
      id
    }
  }
`;

const AddPetForm = ({ personId, onCreateSuccess }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const { mutate: createPet, isLoading } = useMutation(CREATE_PET, {
    onSuccess: () => {
      onCreateSuccess();
      setName("");
      setAge("");
      setSpecies("");
    },
    onError: () => {
      setFieldErrors({
        ...fieldErrors,
        ...{ global: "Failed to add new pet" }
      });
    }
  });

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name cannot be empty";

    if (isNaN(age) || !Number.isInteger(parseFloat(age)) || age < 0)
      errors.age = "Please enter positive integer or 0 as age";

    if (!species) errors.species = "Species cannot be empty";

    setFieldErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return false;
    createPet({
      input: { name, species, age: parseInt(age), person_id: personId }
    });
  };

  return (
    <Container>
      <Row className="pb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Name (Required)"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <FieldError error={fieldErrors.name} />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Age (Required)"
            step="1"
            value={age}
            onChange={e => {
              setAge(e.target.value);
            }}
          />
          <FieldError error={fieldErrors.age} />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Species (Required)"
            value={species}
            onChange={e => {
              setSpecies(e.target.value);
            }}
          />
          <FieldError error={fieldErrors.species} />
        </Col>
      </Row>
      {fieldErrors.global && (
        <Row className="pb-3">
          <Col>
            <FieldError error={fieldErrors.global} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Saving" : "Add new pet"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

AddPetForm.propTypes = {
  onCreateSuccess: PropTypes.func,
  personId: PropTypes.string
};

export default AddPetForm;
