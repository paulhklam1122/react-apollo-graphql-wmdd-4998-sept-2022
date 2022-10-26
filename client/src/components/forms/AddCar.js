import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Divider, InputNumber, Select } from "antd";
import { v4 as uuidv4 } from "uuid";

import { ADD_CAR, GET_CARS } from "../../queries";

const Option = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const onFinish = values => {
    const { id, year, make, model, price, personID } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personID
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        });
      }
    });
  };

  return (
    <>
      <Divider plain style={{ fontSize: "2.5rem" }}>
        Add Car
      </Divider>
      <Form
        form={form}
        name="add-Car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          label="Year:"
          rules={[{ required: true, message: "Please input the year!" }]}
        >
          <Input placeholder="Year" />
        </Form.Item>
        <Form.Item
          name="make"
          label="Make:"
          rules={[{ required: true, message: "Please input the make!" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          name="model"
          label="Model:"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price:"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => value?.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="personID"
          label="Person:"
          rules={[{ required: true, message: "Please input the owner!" }]}
        >
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
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
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
