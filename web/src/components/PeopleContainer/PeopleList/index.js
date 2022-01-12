import PropTypes from "prop-types";
import Link from "next/link";
import { Button, Table } from "react-bootstrap";
import { useMutation } from "../../../utils/graphql";
import { useState } from "react";

const DELETE_PERSON = /* GraphQL */ `
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

const PeopleList = ({ people, onDeleteSuccess }) => {
  const [deleteError, setDeleteError] = useState();

  const { mutate: deletePerson, isLoading } = useMutation(DELETE_PERSON, {
    onSuccess: () => {
      onDeleteSuccess();
    },
    onError: () => {
      setDeleteError("Failed to delete person");
    }
  });

  const handleDelete = id => {
    setDeleteError(undefined);
    deletePerson({ id });
  };

  return (
    <>
      <Table striped hover size="sm">
        <tbody>
          {people.map(person => {
            const { id, name } = person;
            return (
              <tr key={id}>
                <td>
                  <Link href={`/person/${id}`}>
                    <a>{name}</a>
                  </Link>
                </td>
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
            );
          })}
        </tbody>
      </Table>
      {deleteError && <div className="text-danger ms-1">{deleteError}</div>}
    </>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array,
  onDeleteSuccess: PropTypes.func
};

export default PeopleList;
