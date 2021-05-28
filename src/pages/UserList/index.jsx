import React, { useState, useRef } from "react"
import { Button, message, Input, Drawer, Form, Popconfirm, Divider, Row, Col } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import styles from './index.less';
import { gender_valueEnum } from '@/filters/index'
import UpdateForm from '../Components/UpdateForm';
 
import { getUserList, del } from "@/services/user";
import { findById } from "@/services/resume";

const UserList = () => {
  const [currentValues, setCurrentValues] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const actionRef = useRef();
  const [form] = Form.useForm();

  const handleDel = async(id) => {
    const hide = message.loading('正在删除')
    try {
      await del(id)
      hide()
      message.success('删除成功')
      actionRef.current.reloadAndRest() 
    } catch (error) {
      hide()
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'account',
      tip: '用户名是唯一值'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: '手机号',
      width: 200,
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: gender_valueEnum,
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 220,
      valueType: 'option',
      render: (_, record) => [
        <a
          key="preview"
          onClick={async () => {
            const resumeInfo = await findById({ id: 123456 })
            if(resumeInfo.length > 0) {
              setDrawerVisible(true);
              setCurrentValues(resumeInfo[0])
            } else {
              message.error('该用户暂未创建简历信息')
            }
          }}
        >
         查看
        </a>,
        <Divider type="vertical" key="divider"/>,
        <Popconfirm
          key='pop'
          placement="topRight"
          title='确认删除此用户？'
          onConfirm={() => { handleDel(record._id) }}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">删除</a>
        </Popconfirm>
      ]
    }
  ]
  return (
    <PageContainer>
      <ProTable
        headerTitle="用户列表"
        actionRef={actionRef} 
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const res = await getUserList({
            q: params.account,
            pageSize: params.pageSize,
            pageIndex: params.current
          })
          return {
            data: res.data,
            success: true,
            total: res.totalCount
          }
        }}
        columns={columns}
      />
      {currentValues && Object.keys(currentValues).length ? (
        <Drawer
          title="简历信息"
          placement="right"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          width='50%'
          // getContainer={false} //默认挂载到根节点
          style={{ position: 'absolute' }}
        >
          <div>
            <Row>
              <Col className={styles.resumeInfo} span={10}>
                <span>姓名：{currentValues.name}</span>
              </Col>
              <Col  className={styles.resumeInfo} span={10} offset={4}>
                <span>手机号：{currentValues.phone}</span>
              </Col>
              <Col  className={styles.resumeInfo} span={10}>
                <span>性别：{currentValues.gender}</span>
              </Col>
              <Col  className={styles.resumeInfo} span={10} offset={4}>
                <span>年龄：{currentValues.age}</span>
              </Col>
              <Col  className={styles.resumeInfo} span={10}>
                <span>学历：{currentValues.education}</span>
              </Col>
              <Col  className={styles.resumeInfo} span={10} offset={4}>
                <span>学校：{currentValues.school}</span>
              </Col>
            </Row>
          </div>
        </Drawer>
      ) : null}
    </PageContainer>
  )
}

export default UserList