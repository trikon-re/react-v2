import { useGetEmployees } from "@/queries/employees";
import React from "react";
import EmployeeColumn from "./components/EmployeeColumn";
import DataTable from "@components/Datatable";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { Input, Select, Switch } from "antd";
import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { Icon, InlineIcon } from "@iconify/react";
import { Button } from "@mui/material";

const Employees: React.FC = () => {
	const { state: showTrash, toggleState: toggleTrash } = useToggle(false);

	const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();

	const { data, isLoading } = useGetEmployees({
		...getQueryParams(),
		trash: showTrash,
	});
	const { search, setSearch } = useSearchParamsPaginate();
	return (
		<>
			<div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
				<h1 className="text-2xl md:text-3xl font-bold">All Employees</h1>

				<div className="flex flex-row gap-2 items-center  justify-center ">
					{/* <Link to="/app/employees/create">
            <Button
              type="primary"
              size="large"
              className="bg-[#FDE4BF] text-text-light"
              block
            >
              Create New
            </Button>
          </Link> */}

					<Button
						variant="contained"
						className="bg-[#FDE4BF] text-text"
						endIcon={
							<Icon
								className="text-2xl mr-1 "
								icon="basil:add-outline"
							/>
						}
						disableElevation
						component={"a"}
						href="/app/employees/create"
					>
						Create New
					</Button>
				</div>
			</div>
			<div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 mt-2">
				<div className="flex flex-row items-center">
					<p className="font-semibold text-sm underline flex items-center gap-1">
						<InlineIcon
							icon={"pepicons-pencil:down-up"}
							className="text-xl"
						/>{" "}
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
					<Switch
						size="default"
						style={{ background: showTrash ? "#475569" : "#aeaeae" }}
						// checkedChildren={<AiOutlineCheck />}
						// unCheckedChildren={<AiOutlineClose />}
						checked={showTrash}
						onChange={toggleTrash}
						className="ml-2.5"
					/>
					<p className="font-semibold text-sm mx-2">Show deleted employees</p>
				</div>
				<Input
					allowClear
					size="large"
					className="font-semibold max-w-[220px]"
					placeholder="Search..."
					value={search}
					onChange={(e) => {
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
					columns={EmployeeColumn()}
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

export default Employees;
