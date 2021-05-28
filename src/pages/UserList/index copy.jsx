import React, { useState, useRef } from "react"
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Form } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from './index.less';
import { gender_valueEnum } from '@/filters/index'
import CreateForm from '../Components/CreateForm';
import UpdateForm from '../Components/UpdateForm';
 
import { getUserList, register, updated } from "@/services/user";

const handleAdd = async(fields) => {
  const hide = message.loading('正在添加');  // 触发message.loading
  try {
    await register(fields)
    hide()
    message.success('添加成功')
    return true
  } catch (error) {
    hide() 
  }
}

const handleUpdate = async(fields) => {
  const hide = message.loading('正在更新');  // 触发message.loading
  console.log(fields)
  try {
    await updated(fields, fields._id)
    hide()
    message.success('更新成功')
    return true
  } catch (error) {
    hide() 
  }
}

const UserList = () => {
    /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowsState, setSelectedRows] = useState([]);// 选中
  const actionRef = useRef();
  const [form] = Form.useForm();
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
          key="aedit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
         编辑
        </a>,
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
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     onClick={() => {
        //       handleModalVisible(true);
        //     }}
        //   >
        //     <PlusOutlined />新建
        //   </Button>
        // ]}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows)
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{selectedRowsState.length}
            </div>
          }
        >
          <Button
            onClick={async () => {
              console.log(selectedRowsState)
            }}
          >
           批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} title='新建用户'>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          title='编辑'
          onSubmit={async (value) => {
            console.log(value,'value')
            const success = await handleUpdate(value)

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageContainer>
  )
}

export default UserList