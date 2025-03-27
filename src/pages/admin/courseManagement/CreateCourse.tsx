import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import UniversityForm from "../../../components/form/UniversityForm";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [createCourse] = useAddCourseMutation();

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
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
          <FormInput type="text" name="title" label="Title" />
          <FormInput type="text" name="prefix" label="Prefix" />
          <FormInput type="number" name="code" label="Code" />
          <FormInput type="number" name="credits" label="Credits" />
          <FormSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
          />
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
