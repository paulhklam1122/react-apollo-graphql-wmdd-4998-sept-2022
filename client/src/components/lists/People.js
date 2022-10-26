import { List, Divider } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import Person from "../listItems/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center"
  }
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Divider plain style={{ fontSize: "2.5rem" }}>
        Records
      </Divider>
      <List style={styles.list}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <Person id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default People;
