import React from 'react';
import { Drawer, Form, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface DrawerFormProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onFinish: (values: any) => Promise<void>;
  form: FormInstance;
  width?: number;
  children: React.ReactNode;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  visible,
  onClose,
  onFinish,
  form,
  width = 600,
  children,
}) => {
  return (
    <Drawer
      title={title}
      width={width}
      onClose={onClose}
      open={visible}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={() => form.submit()} type="primary">
            提交
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {children}
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
