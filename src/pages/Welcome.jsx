import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Skeleton } from 'antd';
import styles from './Welcome.less';
import { getPersonUser } from "@/services/user";


export default () => {
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(false)

  const getInfo = async() => {
    try {
      const data = await getPersonUser()
      localStorage.setItem('ACCOUNT', data.account)
      setUserInfo(data)
      setLoading(true)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <PageContainer content='我好像是一个在海边玩耍的孩子，不时为拾到比通常更光滑的石子或更美丽的贝壳而欢欣鼓舞，而展现在我面前的是完全未探明的真理之海'>
      <Card title="个人信息">
        { !loading?  (<Skeleton avatar paragraph={{ rows: 4 }} />) : (
          <div className={styles.container}>
            <div>
              <img className={styles.avatar} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F89118504.jpeg&refer=http%3A%2F%2Fwww.17qq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623375881&t=d1cf02757a05dd7e5f52b61c6cdfe357" />
            </div>
            <div className={styles.userInfo}>
              <span>账号： { userInfo.account }</span>
              <span>姓名： { userInfo.name }</span>
              <span>性别： { userInfo.gender? '男' : '女' }</span>
              <span>手机号： { userInfo.phone }</span>
            </div>
          </div>
        )}
      </Card>
      <Card title="说明" style={{ marginTop: 20 }}>
        <div className={styles.tip}>1.请先去简历图库建立个人的简历图库</div>
        <div className={styles.tip}>2.简历图库建立完成后可点击图片复制链接</div>
        <div className={styles.tip}>3.创建信息页面，创建个人简历信息</div>
        <div className={styles.tip}>4.简历信息可在查看简历栏进行修改</div>
      </Card>
    </PageContainer>
  );
};
