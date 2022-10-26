import { useState } from "react";

import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import DeletePerson from "../buttons/DeletePerson";
import EditPerson from "../forms/EditPerson";

const getStyles = () => ({
  card: {
    width: "500px"
  }
});

const Person = props => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(prev => !prev);
  };

  return (
    <>
      {editMode ? (
        <EditPerson
          onButtonClick={handleButtonClick}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <DeletePerson id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </>
  );
};

export default Person;
