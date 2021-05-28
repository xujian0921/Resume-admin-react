import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Upload, message, Typography } from 'antd';
import { InboxOutlined, SnippetsTwoTone } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less';
import { saveImage, getImageUrl } from "@/services/resume-gallery";

const { Dragger } = Upload;
const { Meta } = Card;

export default () => {
  const [imageUrl, setImageUrl] = useState([])
  const getUrl = async() => {
    try {
      const data = await getImageUrl()
      setImageUrl(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUrl()
  }, [])

  const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:3000/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
        const postData = { image_url: info.file.response.url, image_name: info.file.name }
        saveImage(postData)
        getUrl()
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <PageContainer content='生活确实很艰难，知道怎么生活更加艰难，但是其实就是这些难上加难，让我们的人生变得更有意义'>
      <Card title='上传图片' className={styles.card}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽文件至指定区域上传图片</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
      </Card>
      <Card title='个人图库'>
        <div className={styles.img_content}>
          {imageUrl.map((item, index) => (
            <CopyToClipboard
              key={index}
              text={item.image_url}
              onCopy={()=>message.success('复制成功')}
            >
              <Card
                hoverable
                cover={<img src={item.image_url} className={styles.img_url} />}
                className={styles.img_card}
              >
                <Meta title={item.image_name} />
              </Card>
            </CopyToClipboard>
          ))}
        </div>
      </Card>
    </PageContainer>
  )
}