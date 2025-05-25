"use client";
import React, { useState } from "react";
import {
  Table,
  Tag,
  TableColumnsType,
  Pagination,
  Modal as AntdModal,
} from "antd";
import type { TableProps } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import "./pagination.css";
import Image from "next/image";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyButton from "@/components/ui/MyButton/MyButton";
import { toast } from "sonner";
import { z } from "zod";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostsMutation,
} from "@/redux/features/admin/admin.api";
import { useRouter } from "next/navigation";

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

const postSchema = z.object({
  adminComment: z.string().min(1, { message: "Admin comment is required" }),
});

const ManagePost = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
  const [updated] = useUpdatePostsMutation();
  const [deleteUser] = useDeletePostMutation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: postsData, isFetching } = useGetAllPostsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
    searchTerm,
  });

  const handleOpenModal = (status: "APPROVED" | "REJECTED", post: TPost) => {
    setActionStatus(status);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteUser(postId).unwrap();
      toast.success("Post deleted successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete post.");
      console.log(error);
    }
  };

  const handleFormSubmit = async (
    data: { adminComment: string },
    reset: () => void
  ) => {
    if (selectedPost) {
      const result = {
        status: actionStatus,
        adminComment: data.adminComment,
      };

      try {
        await updated({
          data: result,
          order_id: selectedPost.id,
        }).unwrap();

        toast.success("Post updated successfully!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Post not updated!");
      }
      setIsModalOpen(false);
      reset();
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
      title: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: TPost) => {
        const isPending = record.status === "PENDING";

        return (
          <div className="flex gap-4 items-center">
            <CheckCircleOutlined
              onClick={() => isPending && handleOpenModal("APPROVED", record)}
              className={`text-xl cursor-pointer ${
                isPending
                  ? "text-green-600 hover:text-green-800"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              style={{ pointerEvents: isPending ? "auto" : "none" }}
            />
            <CloseCircleOutlined
              onClick={() => isPending && handleOpenModal("REJECTED", record)}
              className={`text-xl cursor-pointer ${
                isPending
                  ? "text-red-500 hover:text-red-700"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              style={{ pointerEvents: isPending ? "auto" : "none" }}
            />
            <EditOutlined
              onClick={() => router.push(`/dashboard/update-post/${record.id}`)}
              className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer"
            />

            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              className="text-xl text-red-600 hover:text-red-800 cursor-pointer"
            />
          </div>
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
      <h2 className="text-2xl font-semibold mb-4 mt-4 text-gray-800">
        All posts
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

      <AntdModal
        title={`${actionStatus} Post`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <MyFormWrapper
          resolver={zodResolver(postSchema)}
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <MyFormInput
            name="adminComment"
            placeHolder="Enter admin comment"
            type="text"
          />
          <MyButton type="submit" label="Submit" fullWidth />
        </MyFormWrapper>
      </AntdModal>
    </div>
  );
};

export default ManagePost;
