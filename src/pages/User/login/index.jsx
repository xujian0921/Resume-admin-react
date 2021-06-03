import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import React from 'react';
import ProForm, {  ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, history } from 'umi';
import styles from './index.less';


const Login = (props) => {
  const account = localStorage.getItem('USERNAME') 
  const password = localStorage.getItem('PASSWORD')
  const rememberMe = !!localStorage.getItem('REMEMBERME')
  const { submitting } = props;
  const intl = useIntl()


  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          account,
          password,
          rememberMe
        }}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <ProFormText
          name="account"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.username.placeholder'
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.username.required"
                  defaultMessage="请输入用户名!"
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.password.placeholder'
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                  defaultMessage="请输入密码！"
                />
              ),
            },
          ]}
        />
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="rememberMe">
            <FormattedMessage id="pages.login.rememberMe" />
          </ProFormCheckbox>
        </div>
      </ProForm>
      <div className={styles.bottom}>
        <a
          onClick={()=> history.push('/user/register')}
        >
          <FormattedMessage id="pages.login.registerAccount" />
        </a>
        <a>
          <FormattedMessage id="pages.login.forgotPassword" />
        </a>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
