import { useGetLeads } from "@/queries/leads";
import React from "react";
import LeadColumn from "./components/LeadColumn";
import DataTable from "@components/Datatable";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Button, Upload, Input, Select } from "antd";
import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { Icon, InlineIcon } from "@iconify/react";
import { Link } from "react-router-dom";

const Leads: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();

  const { data, isLoading } = useGetLeads(getQueryParams());
  const { search, setSearch } = useSearchParamsPaginate();
  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">All Leads</h1>

        <div className="flex flex-row gap-2 items-center  justify-center ">
          <Link to="/app/leads/create">
            <Button
              type="primary"
              size="large"
              className="bg-[#FDE4BF] text-text-light"
              block
            >
              Create New
            </Button>
          </Link>

          <Upload>
            <Button size="large">Click to Upload</Button>
          </Upload>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 mt-2">
        <div className="flex flex-row items-center">
          <p className="font-semibold text-sm underline flex items-center gap-1">
            <InlineIcon icon={"pepicons-pencil:down-up"} className="text-xl" />{" "}
            Sort By:
          </p>
          <Select
            defaultValue="created_at"
            bordered={false}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            options={[
              { value: "-created_at", label: "Newest" },
              { value: "-updated_at", label: "Last Updated" },
              { value: "created_at", label: "Oldest" },
            ]}
          />
        </div>
        <Input
          allowClear
          size="large"
          className="font-semibold max-w-[220px]"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            console.log("triggering");
            setSearch(e.target.value || "");
          }}
          prefix={
            <Icon
              className="text-2xl mr-1 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
              icon="mingcute:search-3-line"
            />
          }
        />
      </div>
      <div className="w-full">
        <DataTable
          columns={LeadColumn()}
          // columns={[]}
          rows={data?.data?.data || []}
          // rows={[]}
          isLoading={isLoading}
          // getRowId={(r: any) => r?._id}
          // ss pagination
          rowCount={data?.data?.total || 0}
          paginationMode={"server"}
          page={page}
          onPageChange={setPage}
          pageSize={limit}
          onPageSizeChange={setLimit}
        />
      </div>
    </>
  );
};

export default Leads;
