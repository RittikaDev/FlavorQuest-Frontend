"use client";
import React, { useState } from "react";
import { Table, Avatar, Pagination, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";
import {
  useGetAllCommentsQuery,
  useDeleteCommentMutation,
} from "@/redux/features/admin/admin.api";
import { toast } from "sonner";
import SectionHead from "@/components/shared/SectionHead/SectionHead";

type TComment = {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string;
  };
};

const Comments = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data: commentsData, isFetching, refetch } = useGetAllCommentsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("Comment deleted successfully");
      refetch(); // Refresh data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error("Failed to delete comment");
    }
  };

  const columns: TableColumnsType<TComment> = [
    {
      title: "Profile",
      dataIndex: "user",
      render: (user) => (
        <Avatar
          src={user?.profilePhoto || "https://i.postimg.cc/nLRNMYzn/02.jpg"}
          alt={user?.name}
          size={40}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
    },
    {
      title: "Comment",
      dataIndex: "text",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Action",
      render: (_: unknown, record: TComment) => (
        <Popconfirm
          title="Are you sure to delete this comment?"
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

  const onChange: TableProps<TComment>["onChange"] = (
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
      <SectionHead title="All Comments" className="text-start mb-5 !text-xl md:!text-2xl" />
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={commentsData?.data?.data || []}
          rowKey="id"
          loading={isFetching}
          pagination={false}
          onChange={onChange}
          scroll={{ x: 700 }}
        />
      </div>

      <div className="pagination-container mt-4 mb-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={commentsData?.data?.meta?.total || 0}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["5", "10", "20", "50"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default Comments;
