import React from "react";
import PersonalInfo from "./personalInfo";
import DataTable from "@components/Datatable";
import Label from "@components/Label";
import CustomerCol from "../../components/CustomerCol";
import {
  useGetLeadsByMediaId,
  useGetPropertiesByMediaId,
} from "@/queries/media";
import { usePaginate } from "@tam11a/react-use-hooks";
import { useParams } from "react-router-dom";
import PropertiesColumn from "../../components/PropertiesColumn";

const Details: React.FC = () => {
  const params = useParams();
  const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();
  const { data: customerData } = useGetLeadsByMediaId({
    ...getQueryParams(),
    media_id: params.id,
  });
  const { data: propertiesData } = useGetPropertiesByMediaId({
    ...getQueryParams(),
    media_id: params.id,
  });

  return (
    <>
      <PersonalInfo />
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <div className="my-8">
            <Label className="text-base font-semibold text-text-light mb-2">
              Sourced Customer
            </Label>

            <DataTable
              columns={CustomerCol()}
              rows={customerData?.data?.data || []}
              // rows={[]}
              isLoading={false}
              // getRowId={(r: any) => r?._id}
              // ss pagination
              rowCount={customerData?.data?.total || 0}
              paginationMode={"server"}
              page={page}
              onPageChange={setPage}
              pageSize={limit}
              onPageSizeChange={setLimit}
            />
          </div>
          <div className="my-8  ">
            <Label className="text-base font-semibold text-text-light mb-2">
              Sourced Properties
            </Label>
            <DataTable
              columns={PropertiesColumn()}
              rows={propertiesData?.data?.data || []}
              // rows={[]}
              isLoading={false}
              // getRowId={(r: any) => r?._id}
              // ss pagination
              rowCount={propertiesData?.data?.total || 0}
              paginationMode={"server"}
              page={page}
              onPageChange={setPage}
              pageSize={limit}
              onPageSizeChange={setLimit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
