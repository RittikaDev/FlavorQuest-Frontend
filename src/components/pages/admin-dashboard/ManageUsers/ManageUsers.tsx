"use client";
import {
  Table,
  Tag,
  Pagination,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
} from "@/redux/features/admin/admin.api";
import { useState } from "react";
import {
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";

type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BLOCKED";
  profilePhoto: string;
  contactNumber: string;
};

const ManageUsers = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

  const { data: userData, isFetching } = useGetAllUserQuery({
    page: pagination.current,
    limit: pagination.pageSize,
    searchTerm,
    role,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      message.error("Failed to delete user!");
    }
  };

  const handleBlockToggle = async (userId: string) => {
    try {
      const result = await blockUser(userId).unwrap();
      console.log(result)
      message.success(
        `successfully do this`
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      message.error("Failed to update user status!");
    }
  };

  const users = userData?.data || [];

  const columns: TableColumnsType<TUser> = [
    {
      title: "Photo",
      dataIndex: "profilePhoto",
      render: (img: string) => (
        <Image
          src={img || "https://i.postimg.cc/nLRNMYzn/02.jpg"}
          alt="User"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => {
        const isBlocked = record.status === "BLOCKED";

        return (
          <div className="flex gap-4">
            <Tooltip title={isBlocked ? "Unblock User" : "Block User"}>
              <Popconfirm
                title={`Are you sure to ${isBlocked ? "unblock" : "block"} this user?`}
                onConfirm={() => handleBlockToggle(record.id)}
                okText="Yes"
                cancelText="No"
              >
                {isBlocked ? (
                  <CheckCircleOutlined className="text-xl text-green-500 hover:text-green-600 cursor-pointer" />
                ) : (
                  <StopOutlined className="text-xl text-orange-500 hover:text-orange-600 cursor-pointer" />
                )}
              </Popconfirm>
            </Tooltip>

            <Tooltip title="Delete User">
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
                disabled={isBlocked}
              >
                <DeleteOutlined
                  className={`text-xl ${
                    isBlocked
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:text-red-600 cursor-pointer"
                  }`}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TUser>["onChange"] = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current!,
      pageSize: paginationConfig.pageSize!,
    });
  };

  return (
    <div className="p-6">
       <MyFormWrapper className="mb-10" onSubmit={() => {}}>
              <div className="flex gap-5 flex-wrap">
                <MyFormInput
                  name="searchTerm"
                  placeHolder="Search by name or email"
                  onValueChange={(val) => setSearchTerm(val)}
                />
      
                <MyFormSelect
                  name="role"
                  placeHolder="Filter by role"
                  options={[
                    { label: "Admin", value: "ADMIN" },
                    { label: "User", value: "USER" },
                    { label: "Premium_user", value: "PREMIUM_USER" },
                  ]}
                  isSearch
                  onValueChange={(val) => setRole(val)}
                  className="min-w-[220px]"
                />
              </div>
            </MyFormWrapper>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Users</h2>
      <Table
        columns={columns}
        dataSource={users}
        loading={isFetching || isDeleting || isBlocking}
        pagination={false}
        rowKey="id"
        scroll={{ x: 900 }}
        onChange={onChange}
      />
      <div className="mt-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={userData?.meta?.total || 0}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["5", "10", "20"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default ManageUsers;
