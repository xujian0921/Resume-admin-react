import React, { useEffect, useState } from 'react';
import { Button, Card, Col, InputNumber , Form, Input, Row, Select, Result } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useIntl,connect, FormattedMessage, history } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

import { find } from '@/services/resume'
import useDeepCompareEffect from 'use-deep-compare-effect'

const Resume = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [resumeData, setResumeData] = useState({})
  const [hasData, setHasData] = useState(false)

  const getList = async() => {
    try {
      const { data } = await find()
      if(data.length > 0) {
        setResumeData(data[0])
        setHasData(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  useDeepCompareEffect(() => {
    form.setFieldsValue(resumeData)
  }, [form, resumeData])
  // []

  const { TextArea } = Input;
  const { Option } = Select;
  const onFinish = (values) => {
    console.log(values);
    dispatch({
      type: 'resume/create',
      payload: values
    })
  }
  return hasData?  (
    <Result
      title="请先创建简历信息"
      extra={
        <Button type="primary" key="console" onClick={() => history.push('/resume/create')}>
          创建简历
        </Button>
      }
    />
  ) : (
    <Form
     form={form}
     layout="vertical"
     onFinish={onFinish}
     autoComplete="off"
     initialValues={resumeData}
    >
      <PageContainer content={intl.formatMessage({id:'pages.resume.pagecontainer.content' })}>
        <Card title={intl.formatMessage({id:'pages.resume.card1' })} bordered={false}>
          <Row className={styles.row}>
            <Col lg={8}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.name'})}
                name="name"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.name" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.name',
                  })}
                />
              </Form.Item>
            </Col>
            <Col
              lg={{
                span: 8,
                offset: 2,
              }}
            >
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.phone'})}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.phone" />,
                  },
                ]}
              >
                <Input
                  type='number'
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.phone',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={8}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.gender'})}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.gender" />,
                  },
                ]}
              >
                 <Select placeholder={intl.formatMessage({
                    id: 'pages.resume.gender',
                  })}>
                  <Option value={1}>{intl.formatMessage({id:'pages.resume.male'})}</Option>
                  <Option value={0}>{intl.formatMessage({id:'pages.resume.female'})}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              lg={{
                span: 8,
                offset: 2,
              }}
            >
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.age'})}
                name="age"
                rules={[
                  {
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 99
                  },
                ]}
              >
                <InputNumber
                  style={{width: 120}}
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.age',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={8}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.education'})}
                name="education"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.education" />,
                  },
                ]}
              >
                <Select placeholder={intl.formatMessage({
                    id: 'pages.resume.education',
                  })}>
                  <Option value={0}>{intl.formatMessage({id:'pages.resume.highschool'})}</Option>
                  <Option value={1}>{intl.formatMessage({id:'pages.resume.juniorcollege'})}</Option>
                  <Option value={2}>{intl.formatMessage({id:'pages.resume.undergraduate'})}</Option>
                  <Option value={3}>{intl.formatMessage({id:'pages.resume.graduatestudent'})}</Option>
                  <Option value={4}>{intl.formatMessage({id:'pages.resume.doctor'})}</Option>
                  <Option value={5}>{intl.formatMessage({id:'pages.resume.other'})}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              lg={{
                span: 8,
                offset: 2,
              }}
            >
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.school'})}
                name="school"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.school" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.school',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title={intl.formatMessage({id:'pages.resume.card2' })} bordered={false} className={styles.card}>
          <Row className={styles.row}>
            <Col lg={20}>
              <Form.Item
                name="skill"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.skillRules" />,
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={500}
                  autoSize={{ minRows: 5, maxRows: 15 }}
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.skill',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title={intl.formatMessage({id:'pages.resume.card3'})} bordered={false} className={styles.card}>
            {/* 此处增加经历 */}
            <Form.List name="experience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Row className={styles.row} key={key}>
                      <Col lg={8}>
                        <Form.Item
                          label={intl.formatMessage({id: 'pages.resume.label.company'})}
                          {...restField}
                          name={[name, 'company']}
                          fieldKey={[fieldKey, 'company']}
                          rules={[{ required: true, message: <FormattedMessage id="pages.resume.company" />, }]}
                        >
                           <Input placeholder={intl.formatMessage({
                              id: 'pages.resume.company',
                            })} />
                        </Form.Item>
                      </Col>
                      <Col lg={24}>
                        <Form.Item
                          label={intl.formatMessage({id: 'pages.resume.label.describe'})}
                          {...restField}
                          name={[name, 'describe']}
                          fieldKey={[fieldKey, 'describe']}
                          rules={[{ required: true, message: <FormattedMessage id="pages.resume.describe" /> }]}
                        >
                           <TextArea
                            showCount
                            maxLength={200}
                            placeholder={intl.formatMessage({
                              id: 'pages.resume.describe',
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={24}>
                        <Form.Item
                          label={intl.formatMessage({id: 'pages.resume.label.content'})}
                          {...restField}
                          name={[name, 'content']}
                          fieldKey={[fieldKey, 'content']}
                          rules={[{ required: true, message: <FormattedMessage id="pages.resume.content" /> }]}
                        >
                           <TextArea
                            showCount
                            maxLength={500}
                            placeholder={intl.formatMessage({
                              id: 'pages.resume.content',
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col style={{ marginBottom: 20 }}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add 
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
        </Card>
      </PageContainer>
      <FooterToolbar>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({  loading }) => ({
  submitting: loading.effects['resume/create'],
}))(Resume);
