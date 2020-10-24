import { Upload, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


export function UploadComponent({}){

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
            console.log(info.file, info.fileList);
            }
            if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Dragger {...props} className="upload">
            <p className="ant-upload-drag-icon">
            <FileImageOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single upload. CSV File Only.
            </p>
        </Dragger>
    );
}