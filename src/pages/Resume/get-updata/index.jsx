import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Result , Form, Input, Modal, Row, Select, Space, DatePicker, message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useIntl,connect, FormattedMessage, history } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { findByAccount, updated } from '@/services/resume'

const Resume = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [resumeData, setResumeData] = useState({})
  const [hasData, setHasData] = useState(true)

  const getList = async() => {
    try {
      const data  = await findByAccount({ account: localStorage.getItem('ACCOUNT') })
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

  const { TextArea } = Input;
  const { Option } = Select;
  const onFinish = async (values) => {
    try {
      await updated(resumeData._id, values)
      message.success('简历信息更新成功')
    } catch (error) {
      console.log(error)
    }
    // dispatch({
    //   type: 'resume/create',
    //   payload: values
    // })
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
                label={intl.formatMessage({id: 'pages.resume.label.born'})}
                name="born"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.born" />,
                  },
                ]}
              >
                 <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.born',
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
                label={intl.formatMessage({id: 'pages.resume.label.native_place'})}
                name="native_place"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.native_place" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.native_place',
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
                label={intl.formatMessage({id: 'pages.resume.label.major'})}
                name="major"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.major" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.major',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={8}>
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
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.phone',
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
                label={intl.formatMessage({id: 'pages.resume.label.email'})}
                name="email"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.email" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.email',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col 
              lg={8}
            >
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.avatar_url'})}
                name="avatar_url"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.avatar_url" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.avatar_url',
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
                label={intl.formatMessage({id: 'pages.resume.label.job_intention'})}
                name="job_intention"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.job_intention" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.job_intention',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
          <Col lg={18}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.sign_one'})}
                name="sign_one"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.sign_one" />,
                  },
                ]}
              >
                 <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.sign_one',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={18}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.sign_two'})}
                name="sign_two"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.sign_two" />,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.sign_two',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.row}>
          <Col lg={18}>
              <Form.Item
                label={intl.formatMessage({id: 'pages.resume.label.sign_three'})}
                name="sign_three"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.resume.sign_three" />,
                  },
                ]}
              >
                 <Input
                  placeholder={intl.formatMessage({
                    id: 'pages.resume.sign_three',
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
        <Card title={intl.formatMessage({id:'pages.resume.card3' })} bordered={false} className={styles.card}>
          <Row className={styles.row}>
            <Col lg={20}>
              <Form.Item
                name="summary"
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
                    id: 'pages.resume.summary',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title={intl.formatMessage({id:'pages.resume.card4'})} bordered={false} className={styles.card}>
            {/* 此处增加经历 */}
            <Form.List name="experience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}, index) => (
                    <Row className={styles.row} key={key}>
                      <Col lg={8}>
                        <Form.Item
                          label={intl.formatMessage({id: 'pages.resume.label.company'})}
                          {...restField}
                          name={[name, 'company']}
                          fieldKey={[fieldKey, 'company']}
                        >
                           <Input placeholder={intl.formatMessage({
                              id: 'pages.resume.company',
                            })} />
                        </Form.Item>
                        <Form.Item
                          label={intl.formatMessage({id: 'pages.resume.label.time'})}
                          {...restField}
                          name={[name, 'time']}
                          fieldKey={[fieldKey, 'time']}
                        >
                           <Input placeholder={intl.formatMessage({
                              id: 'pages.resume.time',
                            })} />
                        </Form.Item>
                      </Col>
                      {/* 11 */}
                      <Col lg={24}>
                        <Form.List
                          name={[name, 'project']}
                        >
                           {(fieldsItems, func) => (
                             <>
                              {fieldsItems.map((fieldsItem, indexItem) => (
                                <Col lg={16} key={indexItem} className={styles.project}>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_name'})}
                                    name={[fieldsItem.name, 'project_name']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_name']}
                                  >
                                     <Input placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_name',
                                      })} />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_background'})}
                                    name={[fieldsItem.name, 'project_background']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_background']}
                                  >
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      autoSize={{ minRows: 5, maxRows: 15 }}
                                      placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_background',
                                      })}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_analysis'})}
                                    name={[fieldsItem.name, 'project_analysis']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_analysis']}
                                  >
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      autoSize={{ minRows: 5, maxRows: 15 }}
                                      placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_analysis',
                                      })} 
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_complete'})}
                                    name={[fieldsItem.name, 'project_complete']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_complete']}
                                  >
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      autoSize={{ minRows: 5, maxRows: 15 }}
                                      placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_complete',
                                      })} 
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_summary'})}
                                    name={[fieldsItem.name, 'project_summary']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_summary']}
                                  >
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      autoSize={{ minRows: 5, maxRows: 15 }}
                                      placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_summary',
                                      })} 
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({id: 'pages.resume.label.project_img'})}
                                    name={[fieldsItem.name, 'project_img']}
                                    fieldKey={[fieldsItem.fieldKey, 'project_img']}
                                  >
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      autoSize={{ minRows: 5, maxRows: 15 }}
                                      placeholder={intl.formatMessage({
                                        id: 'pages.resume.project_img',
                                      })} 
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => func.remove(fieldsItem.name)} />
                                </Col>
                              ))}
                              <Form.Item>
                                <Button type="dashed" onClick={() => func.add()} block icon={<PlusOutlined />}>
                                  Add 
                                </Button>
                              </Form.Item>
                             </>
                           )}
                        </Form.List>
                      </Col>
                      {/* 11 */}
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
          修改
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({  loading }) => ({
  submitting: loading.effects['resume/create'],
}))(Resume);
