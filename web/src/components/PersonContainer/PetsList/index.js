import PropTypes from "prop-types";
import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "../../../utils/graphql";

const DELETE_PET = /* GraphQL */ `
  mutation DeletePet($id: ID!) {
    deletePet(id: $id) {
      id
    }
  }
`;

const PetsList = ({ pets, onDeleteSuccess }) => {
  const [deleteError, setDeleteError] = useState();

  const { mutate: deletePet, isLoading } = useMutation(DELETE_PET, {
    onSuccess: () => {
      onDeleteSuccess();
    },
    onError: () => {
      setDeleteError("Failed to delete pet");
    }
  });

  const handleDelete = id => {
    setDeleteError(undefined);
    deletePet({ id });
  };

  return (
    <>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Age</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(({ id, name, age, species }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{age}</td>
              <td>{species}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isLoading}
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteError && <div className="text-danger ms-1">{deleteError}</div>}
    </>
  );
};

PetsList.propTypes = {
  pets: PropTypes.array,
  onDeleteSuccess: PropTypes.func
};

export default PetsList;
