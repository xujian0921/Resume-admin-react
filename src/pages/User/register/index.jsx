import React, { useEffect, useState } from "react";
import styles from './index.less'
import { Form, Input, Row, Col, Button, message, Select  } from "antd";
import { history } from "umi";
import { register } from "@/services/user";

const { Option } = Select;
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
let timeChange
const Register = () =>{
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const [time, setTime] = useState(60)

  const handleSubmit = (values) => {
    values.phone = Number(form.getFieldValue('phone'))
    setLoading(true)
    register(values).then(() => {
      message.success('注册成功，3s后跳转登录页')
      setTimeout(() => {
        history.push('/user/login')
      }, 3000)
    }).finally(() => {
      setLoading(false)
    })
  }

  const getCode = () => {
    const reg = /^1[3456789]\d{9}$/
    const phoneNumber = form.getFieldValue('phone')
    if(!phone) {
      message.error('请输入手机号')
    } else if (!reg.test(phone)) {
      message.error('手机号码有误，请重填')
    } else {
      setDisable(true)
      timeChange = setInterval(() => setTime(t => --t), 1000)
    }
  }
  
  useEffect(() => {
    clearInterval(timeChange);
    return () => clearInterval(timeChange);
  }, [])

  useEffect(() => {
    if(time <= 0 ) {
      clearInterval(timeChange)
      setDisable(false)
      setTime(60)
    } 
  }, [time])

  return (
    <div className={styles.main}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item
          name="account"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
            {
              pattern: /^(?!\d+$)[\da-zA-Z]{6,12}$/,
              message: '字母或数字组合,长度6-12位',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入姓名'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: '请选择性别'
            }
          ]}
        >
          <Select>
            <Option value={'1'}>男</Option>
            <Option value={'0'}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              message: '至少一个字母,一个数字,一个特殊字符,长度8-16位',
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$~!@#$%^&*()_+`\-={};";'<>?,.\/[\]]).{8,16}$/
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
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { 
              required: true,
              message: '请输入手机号'
            },
            {
              message: '请输入正确的手机号',
              pattern:/^1[3456789]\d{9}$/ 
            }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="appName"
                noStyle
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <Input placeholder="123456"/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Button id="register" disabled={disable} onClick={() => {getCode()}}>
                { disable? '重新获取' + time : '获取验证码' }
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading} >
            注册
          </Button>
        </Form.Item>
      </Form>
      <div id="nc"></div>
      <div className={styles.bottom}>
        <a 
          className={styles.home}
          onClick={() => history.push('/user/login')}
        >
          返回登录
        </a>
        <a
          onClick={()=> history.push('/user/forget-password')}
        >
          忘记密码
        </a>
      </div>
    </div>
  )
} 

export default Register