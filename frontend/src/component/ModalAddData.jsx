import React from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useState, useEffect } from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { toast } from "react-toastify";

function ModalAddData({ closeModal }) {
  const [frmAdd] = Form.useForm();

  const reset = () => {
    frmAdd.resetFields();
  };

  const addData = async (values) => {
    const res = await fetch("http://localhost:3300/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        create_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      }),
    });

    const data = await res.json();

    if (data.message === "ok") {
      reset();
      toast.success("บันทึกข้อมูลสำเร็จ!!", {
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
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Form form={frmAdd} onFinish={addData}>
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
          <Button onClick={reset} type="primary" className="btnReset">
            <RiResetLeftFill style={{ fontSize: "18px" }} />
            เริ่มใหม่
          </Button>
          <Button type="primary" htmlType="submit" className="btnSave">
            <MdOutlineSaveAlt style={{ fontSize: "18px" }} />
            บันทึกข้อมูล
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default ModalAddData;
