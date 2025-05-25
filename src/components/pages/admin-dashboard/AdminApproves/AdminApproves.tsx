"use client";
import React, { useState } from "react";
import { Table, Tag, TableColumnsType, Pagination, Popconfirm } from "antd";
import type { TableProps } from "antd";
import "./pagination.css";
import Image from "next/image";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { toast } from "sonner";
import {
  useGetAdminPostsQuery,
  useUpdatePostsMutation,
} from "@/redux/features/admin/admin.api";
import MyButton from "@/components/ui/MyButton/MyButton";

type TPost = {
  id: string;
  title: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  status: string;
  isPremium: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber: string;
    role: string;
    status: string;
  };
};

const AdminApproves = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [updated] = useUpdatePostsMutation();

  const { data: postsData, isFetching } = useGetAdminPostsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
    searchTerm,
    status: "APPROVED",
  });

  const handleApprove = async (post: TPost) => {
    if (post.id) {
      await updated({
        data: {
          isPremium: true,
        },
        order_id: post.id,
      });
      toast.success("Post Premium successfully!");
    }
  };

  const columns: TableColumnsType<TPost> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <Image
            src={img}
            alt="Post"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Image
            src="https://i.postimg.cc/nLRNMYzn/02.jpg"
            alt="Default Image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "APPROVED" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Premium",
      dataIndex: "isPremium",
      render: (isPremium) =>
        isPremium ? <Tag color="gold">Premium</Tag> : <Tag>No</Tag>,
    },
    {
      title: "Posted By",
      dataIndex: "user",
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt="User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Image
              src="https://i.postimg.cc/nLRNMYzn/02.jpg"
              alt="Default User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          )}
          {user.name}
        </div>
      ),
    },
    {
      title: "Action",
      render: (_: unknown, record: TPost) => {
        const canApprove = record.status === "APPROVED" && !record.isPremium;

        return (
          <Popconfirm
            title="Are you sure to approve this post?"
            onConfirm={() => handleApprove(record)}
            okText="Yes"
            cancelText="No"
            disabled={!canApprove}
          >
            <MyButton
              label="Mark as Premium"
              onClick={canApprove ? () => handleApprove(record) : undefined}
              isDisabled={!canApprove}
              variant="filled"
              customBg="rgb(34 197 94)"
              className="px-4 py-2 text-sm"
            />
          </Popconfirm>
        );
      },
    },
  ];

  const onChange: TableProps<TPost>["onChange"] = (
    paginationConfig,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "paginate") {
      setPagination({
        current: paginationConfig.current!,
        pageSize: paginationConfig.pageSize!,
      });
    }
  };

  return (
    <div className="px-5 mt-6">
      <MyFormWrapper className="mb-10" onSubmit={() => {}}>
        <div className="flex gap-5 flex-wrap">
          <MyFormInput
            name="searchTerm"
            placeHolder="Search by title"
            onValueChange={(val) => setSearchTerm(val)}
          />
        </div>
      </MyFormWrapper>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Make premium post
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={postsData?.data || []}
          pagination={false}
          rowKey="id"
          onChange={onChange}
          loading={isFetching}
          scroll={{ x: 900 }}
        />
      </div>

      <div className="pagination-container mt-4 mb-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={postsData?.meta?.total || 0}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["1", "2", "5", "10"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default AdminApproves;
