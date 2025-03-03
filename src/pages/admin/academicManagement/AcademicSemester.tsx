import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  return (
    <div>
      <h1>Academic semester</h1>
    </div>
  );
};

export default AcademicSemester;
