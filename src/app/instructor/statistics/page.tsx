import {
    getMentorPieChartData,
    getSubmissionsForMentorLineChart,
  } from "@/actions/assignments";
  import Barchart from "../../../components/charts/barchart";
  import Linechart from "../../../components/charts/linechart";
  import Piechart from "../../../components/charts/piechart";
  import Radarchart from "../../../components/charts/radarchart";
  import { getAttendanceForMentorBarChart } from "@/actions/attendance";
  import { getEnrolledMentees, getEnrolledStudents, getMentorStudents } from "@/actions/courses";
  import { FaSquareArrowUpRight } from "react-icons/fa6";
  import Link from "next/link";
import { getAllEnrolledUsers } from "@/actions/users";
import StudentsInfoForMentor from "@/components/studentsInfoForMentor";
import MentorInfoForInstructor from "@/components/mentorInfoForInstructor";
  
  export default async function Statistics() {
    const mentorPieChart = await getMentorPieChartData();
    const { classes, attendanceInEachClass } =
      await getAttendanceForMentorBarChart();
    const { assignments, countForEachAssignment }: any =
      await getSubmissionsForMentorLineChart();
      const mstudents = await getEnrolledStudents();
      const mmentees = await getEnrolledMentees();
      let loaderValue = !mentorPieChart?0:String(mentorPieChart![0]*100/(mentorPieChart![0]+mentorPieChart![1]));
      loaderValue+='%';
    return (
      <div className="m-8 flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="w-1/4 shadow-xl shadow-blue-500/5 rounded-xl p-8">
            <Piechart mentorPieChart={mentorPieChart} />
          </div>
          <div className="w-3/4 rounded-xl shadow-xl shadow-blue-500/5 flex gap-2">
          <div className="w-1/3 flex flex-col gap-6 p-14 text-gray-500">
            <div className="p-4 rounded-xl relative border">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Students
              </h1>
              <h1 className="text-4xl flex justify-between items-baseline font-bold text-primary-500">
                {mstudents?.length}
              </h1>
            </div>
            <div className="p-4 rounded-xl relative border">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Sessions
              </h1>
              <h1 className="text-4xl font-bold text-primary-500">
                {classes.length}
              </h1>
            </div>
          </div>
            <div className="w-2/3 p-2">
              <Barchart
                classes={classes}
                attendanceInEachClass={attendanceInEachClass}
                label={"Attendees"}
                bgColors={["rgb(37,99,235)"]}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-3/4 rounded-xl p-4 relative shadow-xl max-h-[300px] shadow-blue-500/5">
            <Barchart
            classes={assignments}
            attendanceInEachClass={countForEachAssignment}
            label={"Submissions"}
            bgColors={["rgb(37,99,235)"]}
            />
            <Link href="/instructor/assignments/getByAssignment" className="absolute top-2 right-2"><FaSquareArrowUpRight className="text-xl text-gray-500"/></Link>
          </div>
          <div className="w-1/4 shadow-xl shadow-blue-500/5 rounded-xl p-8">
            <h1 className="pb-14 text-gray-500">Evaluation</h1>
            <div className="px-16 font-semibold text-blue-500 text-center"><span className="text-3xl font-bold">{mentorPieChart?mentorPieChart[0]:0}</span><span>/{mentorPieChart?mentorPieChart![0]+mentorPieChart![1]:0}</span></div >
            <div className="w-[80%] rounded-full border border-gray-700 m-auto my-4">
              <div className={`h-[10px] rounded-full bg-blue-500`} style={{width:loaderValue}}></div>
            </div>
            <h1 className="p-2 text-gray-500 text-center">Assignments to be evaluated by all the mentors</h1>
          </div>
        </div>
        <div className="w-full rounded-xl p-4 shadow-xl shadow-blue-500/5">
        {!mstudents || mstudents.length === 0 ? (
          <div>No Mentees are assigned!</div>
        ) : (
          <MentorInfoForInstructor mstudents={mmentees} />
        )}
      </div>
      </div>
    );
  }
  