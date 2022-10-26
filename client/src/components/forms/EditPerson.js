import { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useMutation } from "@apollo/client";
import { EDIT_PERSON } from "../../queries";

const EditPerson = props => {
  const { id, firstName, lastName } = props;
  const [editPerson] = useMutation(EDIT_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    const { firstName, lastName } = values;

    editPerson({
      variables: {
        id,
        firstName,
        lastName
      }
    });

    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="edit-person-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName
      }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
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
              (!form.isFieldsTouched("firstName") &&
                !form.isFieldsTouched("lastName")) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Done
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditPerson;
