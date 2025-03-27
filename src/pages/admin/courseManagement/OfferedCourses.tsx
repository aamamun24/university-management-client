import { Button, Col, Flex } from "antd";
import UniversityForm from "../../../components/form/UniversityForm";
import FormInput from "../../../components/form/FormInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import FormSelectWithWatch from "../../../components/form/FormSelectWithWatch";

const OfferedCourses = () => {
  const [id, setId] = useState("");

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <UniversityForm onSubmit={onSubmit}>
          <FormSelectWithWatch
            onValueChange={setId}
            name="academicSemester"
            label="Academic Semester"
            options={academicFacultyOptions}
          />
          <FormInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Flex>
  );
};

export default OfferedCourses;
