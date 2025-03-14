import { FieldValues, SubmitHandler } from "react-hook-form";
import UniversityForm from "../../../components/form/UniversityForm";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = nameOptions[Number(data.name) - 1].label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
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
      <Col span={6}>
        <UniversityForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FormSelect name="name" label="Name:" options={nameOptions} />
          <FormSelect name="year" label="Year:" options={yearOptions} />
          <FormSelect
            name="startMonth"
            label="Start Month:"
            options={monthOptions}
          />
          <FormSelect
            name="endMonth"
            label="End Month:"
            options={monthOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
