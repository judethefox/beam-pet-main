import { useState } from "react";
import { FieldError } from "../Shared/FieldError";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "../../../utils/graphql";
import PropTypes from "prop-types";

const CREATE_PERSON = /* GraphQL */ `
  mutation CreatePerson($input: PersonInput!) {
    createPerson(input: $input) {
      id
    }
  }
`;

const AddPersonForm = ({ onCreateSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const { mutate: createPerson, isLoading } = useMutation(CREATE_PERSON, {
    onSuccess: () => {
      onCreateSuccess();
      setName("");
      setDescription("");
    },
    onError: () => {
      setFieldErrors({
        ...fieldErrors,
        ...{ global: "Failed to add new person" }
      });
    }
  });

  const validateForm = () => {
    setFieldErrors({});
    if (!name) {
      setFieldErrors({ ...fieldErrors, ...{ name: "Name cannot be empty" } });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return false;
    createPerson({ input: { name, description } });
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
            required
          />
          <FieldError error={fieldErrors.name} />
        </Col>
      </Row>
      <Row className="pb-3">
        <Col>
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            style={{ height: "5em" }}
          />
          <FieldError fieldName={fieldErrors.description} />
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
            {isLoading ? "Saving" : "Add new person"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

AddPersonForm.propTypes = {
  onCreateSuccess: PropTypes.func
};

export default AddPersonForm;
