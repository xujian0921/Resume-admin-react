import React, { useState } from "react";
import styles from './index.less'
import { Form, Input, Row, Col, Button  } from "antd";
import { history } from "umi";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const ForgetPassword = () =>{
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log(values)
  }
  return (
    <div className={styles.main}>
      <Form
        {...formItemLayout}
        form={form}
        name="forgetpassword"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="password"
          label="新的密码"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码不匹配'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            确认修改
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.bottom}>
        <a 
          onClick={() => history.push('/user/login')}
        >
          返回登录
        </a>
      </div>
    </div>
  )
} 

export default ForgetPassword