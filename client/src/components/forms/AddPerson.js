import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Divider } from "antd";
import { v4 as uuidv4 } from "uuid";

import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);

  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const onFinish = values => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson]
          }
        });
      }
    });
  };

  return (
    <>
      <Divider plain style={{ fontSize: "2.5rem" }}>
        Add Person
      </Divider>
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          label="First Name:"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name:"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPerson;
