"use client";
import React from "react";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import {
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/features/admin/admin.api";
import { toast } from "sonner";

type TCategory = {
  id: string;
  name: string;
};

const ManageCategories = () => {
  const { data: postsData, isFetching, refetch } = useGetAllCategoryQuery({});
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Category deleted successfully");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const columns: TableColumnsType<TCategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: TCategory) => (
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
          disabled={isDeleting}
        >
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:text-red-700"
            style={{ fontSize: "18px" }}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="px-5 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Categories</h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={postsData?.data || []}
          rowKey="id"
          pagination={false}
          scroll={{ x: 500 }}
          loading={isFetching}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
