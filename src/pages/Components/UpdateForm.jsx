import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
    title
  } = props;

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleUpdate(values)}>
          完成
        </Button>
      </>
    )
  }

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title={title}
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={values}
      >
        <FormItem
          name="account"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称'
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
        <FormItem
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: '请选择性别'
            },
          ]}
        >
          <Select placeholder='请选择性别'>
            <Option value='0'>女</Option>
            <Option value='1'>男</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )

  };


export default UpdateForm;
