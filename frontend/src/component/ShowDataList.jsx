import { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Popconfirm,
  DatePicker,
  Form,
  Input,
  Space,
} from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "../css/style.css";
import "../index.css";
import AddData from "./ModalAddData";
import EditData from "./ModalEditData";
import { toast } from "react-toastify";
import { CgSearch } from "react-icons/cg";

const { RangePicker } = DatePicker;

function ShowDataList() {
  const [frmSearch] = Form.useForm();
  const [dataSource, setDataSource] = useState();
  const [modalAddData, setModalAddData] = useState(false);
  const [modalEditData, setModalEditData] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  const columns = [
    {
      title: "ผู้สั่งซื้อ",
      dataIndex: "orderer",
      key: "orderer",
      align: "center",
    },
    {
      title: "รายการสินค้า",
      dataIndex: "name_product",
      key: "name_product",
      align: "center",
    },
    {
      title: "จำนวน",
      dataIndex: "qty",
      key: "qty",
      align: "center",
    },
    {
      title: "ราคา (บาท)",
      dataIndex: "price",
      key: "price",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "วันที่สั่งซื้อ",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
      render: (create_at) => new Date(create_at).toLocaleString(),
      sorter: (a, b) => new Date(a.create_at) - new Date(b.create_at),
    },
    {
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (_, record, index) => (
        <Popconfirm
          title="คุณต้องการลบข้อมูลใช่หรือไม่ ?"
          onConfirm={() => handleDelete(record.id)}
        >
          <RiDeleteBin6Line style={{ fontSize: "28px", color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  const fetchData = () => {
    fetch("http://localhost:3300/order")
      .then((res) => res.json())
      .then((data) => setDataSource(data));
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3300/order/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      const data = await res.json();
      if (data.message === "ok") {
        toast.success("ลบข้อมูลสำเร็จ!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
        fetchData();
      } else {
        toast.error("เกิดข้อผิดพลาด!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const showModalAdd = () => {
    setModalAddData(true);
  };

  const showModalEdit = (value) => {
    setDataEdit(value);
    setModalEditData(true);
  };

  const closeModalAdd = () => {
    fetchData();
    setModalAddData(false);
  };

  const closeModalEdit = () => {
    fetchData();
    setDataEdit();
    setModalEditData(false);
  };

  const cancelEditData = () => {
    setDataEdit();
    setModalEditData(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row justify="center">
        <h1>ระบบจัดการรายการสั่งซื้อ</h1>
      </Row>

      <Row justify="end">
        <Button type="primary" onClick={showModalAdd} className="btnAdd">
          <MdOutlineShoppingCart style={{ fontSize: "30px" }} />
          เพิ่มรายการคำสั่งซื้อ
        </Button>
      </Row>

      <Row justify="center">
        <Col span={24}>
          <Table
            className="tabelData"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            onRow={(record) => ({
              onDoubleClick: () => {
                showModalEdit(record);
              },
            })}
            rowClassName={(record, index) => {
              return record.id == dataEdit?.id
                ? "bg-row-select pointer"
                : "pointer";
            }}
          />
        </Col>
      </Row>

      <Modal
        open={modalAddData}
        onCancel={closeModalAdd}
        maskClosable={false}
        focusTriggerAfterClose={false}
        footer={false}
        width={750}
        title={
          <>
            <MdOutlineShoppingCart
              style={{
                fontSize: "35px",
                color: "#13ac39",
                margin: "0px 6px -7px 0px",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                color: "#222222",
              }}
            >
              ข้อมูลรายการสั่งซื้อ
            </span>
          </>
        }
      >
        <AddData closeModal={closeModalAdd} />
      </Modal>

      <Modal
        open={modalEditData}
        onCancel={cancelEditData}
        onOk={cancelEditData}
        maskClosable={false}
        focusTriggerAfterClose={false}
        footer={false}
        width={750}
        title={
          <>
            <FaEdit
              style={{
                fontSize: "35px",
                color: "#fac71f",
                margin: "0px 6px -7px 0px",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                color: "#222222",
              }}
            >
              แก้ไขข้อมูลรายการสั่งซื้อ
            </span>
          </>
        }
      >
        <EditData dataEdit={dataEdit} closeModal={closeModalEdit} />
      </Modal>
    </>
  );
}

export default ShowDataList;
