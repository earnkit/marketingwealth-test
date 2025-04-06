import { useState, useEffect } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineSaveAlt } from "react-icons/md";
import { toast } from "react-toastify";

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Result,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
  notification,
} from "antd";
function ModalEditData({ dataEdit, closeModal }) {
  const [frmEdit] = Form.useForm();

  console.log("dataEdit.id", dataEdit.id);

  const editData = async () => {
    const frm = frmEdit.getFieldsValue();

    try {
      const res = await fetch(`http://localhost:3300/order/${dataEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...frm, update_at: new Date().toISOString() }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      if (data.message === "ok") {
        toast.success("บันทึกการแก้ไขข้อมูลสำเร็จ!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
        closeModal();
      } else {
        toast.error("เกิดข้อผิดพลาด!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const fetchData = () => {
    frmEdit.setFieldsValue({
      ...dataEdit,
    });
  };

  useEffect(() => {
    if (dataEdit) {
      frmEdit.resetFields();
      fetchData();
    }
  }, [dataEdit]);

  return (
    <>
      <Form form={frmEdit}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="orderer"
              label="ผู้สั่งซื้อ"
              labelCol={{
                span: 3,
              }}
            >
              <Input placeholder="ผู้สั่งซื้อ" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="name_product"
              label="รายการสินค้า"
              labelCol={{
                span: 3,
              }}
            >
              <Input placeholder="รายการสินค้า" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="price"
              label="ราคา (บาท)"
              style={{ marginLeft: "5px" }}
              labelCol={{
                span: 3,
              }}
            >
              <Input placeholder="ราคา (บาท)" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="qty"
              label="จำนวน"
              labelCol={{
                span: 3,
              }}
            >
              <InputNumber placeholder="จำนวน" min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button onClick={editData} type="primary" className="btnSave">
            <MdOutlineSaveAlt style={{ fontSize: "18px" }} />
            บันทึกข้อมูล
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default ModalEditData;
