import { FieldValues, SubmitHandler } from "react-hook-form";
import UniversityForm from "../../../components/form/UniversityForm";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import FormDatePicker from "../../../components/form/FormDatePicker";
import FormInput from "../../../components/form/FormInput";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisterSemesterMutation();

  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      maxCredit: Number(data.maxCredit),
      minCredit: Number(data.minCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <UniversityForm onSubmit={onSubmit}>
          <FormSelect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />
          <FormSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <FormDatePicker name="startDate" label="Start Date" />
          <FormDatePicker name="endDate" label="End Date" />
          <FormInput type="number" name="minCredit" label="Min Credit" />
          <FormInput type="number" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
