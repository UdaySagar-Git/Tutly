import { MdOutlineNoteAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { SiTicktick } from "react-icons/si";

const getGreeting = () => {
  const currentIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hour = currentIST.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
export default function Dashboard({ currentUser }:any) {
  const greeting = getGreeting();
  if (currentUser?.role === "STUDENT") {
    // student
    // const { sortedSubmissions, assignmentsSubmitted, currentUser } = data;
    let total = 0;
    // sortedSubmissions.forEach((submission: any) => {
    //   if (submission?.enrolledUser?.user?.id === currentUser?.id) {
    //     total += submission?.totalPoints;
    //   }
    // });

    let leaderboardMap = new Map();

    // sortedSubmissions.forEach((submission: any) => {
    //   const userId = submission?.enrolledUser?.user?.id;
    //   const totalPoints = submission.totalPoints;

    //   if (leaderboardMap.has(userId)) {
    //     leaderboardMap.get(userId).totalPoints += totalPoints;
    //   } else {
    //     leaderboardMap.set(userId, {
    //       totalPoints: totalPoints,
    //     });
    //   }
    // });

    const sortedLeaderboardArray = Array.from(leaderboardMap.entries()).sort(
      (a, b) => b[1].totalPoints - a[1].totalPoints
    );

    sortedLeaderboardArray.forEach((entry, index) => {
      entry[1].rank = index + 1;
    });

    leaderboardMap = new Map(sortedLeaderboardArray);

    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-blue-600">{total === 0 ? "NA" : total}</p>
            <h1 className="p-1 text-sm font-bold">Your current Score in the Leaderboard.</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-blue-600">
              {total === 0
                ? "NA"
                : leaderboardMap.get(currentUser.id).rank
                  ? leaderboardMap.get(currentUser.id).rank
                  : "NA"}
            </p>
            <h1 className="p-1 text-sm font-bold">Your current rank in the Leaderboard.</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="https://i.postimg.cc/439rxz8g/images-removebg-preview.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            {/* <p className="pt-2 font-bold text-blue-600">{assignmentsSubmitted}</p> */}
            <h1 className="p-1 text-sm font-bold">No. of assignments submitted.</h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "MENTOR") {
    // mentor
    const greeting = getGreeting();
    // const mcourses = await getMentorCourses();
    // const mleaderboard = await getMentorLeaderboardDataForDashboard();
    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{/* {mstudents?.length} */}for now</p>
            <h1 className="p-1 text-sm font-bold">Assigned mentees</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{mcourses?.length}</p> */}
            <h1 className="p-1 text-sm font-bold">No of courses mentoring</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <SiTicktick className="m-auto my-2 h-20 w-20 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{mleaderboard}</p> */}
            <h1 className="p-1 text-sm font-bold">No of assignments evaluated</h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "INSTRUCTOR") {
    // instructor
    // const created = await getAllCourses();
    const greeting = getGreeting();
    let total = 0;
    const count = 0;
    // if (created) {
    //   for (const courses of created) {
    //     total += courses?._count.classes || 0;
    //   }
    // }
    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{created?.length}</p> */}
            <h1 className="p-1 text-sm font-bold">No of courses created</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <SiGoogleclassroom className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{total}</p>
            <h1 className="p-1 text-sm font-bold">Total no of classes uploaded</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{count}</p>
            <h1 className="p-1 text-sm font-bold">Total no of students enrolled</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No user found!</div>
  }
}
