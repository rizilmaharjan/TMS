import { useEffect, useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import Loader from "../components/loader/SubmitLoader";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import AssignTask from "../components/modal/AssignTask";
import { setMembers } from "../redux/features/user/memberSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/reduxHooks";
import { debounce } from "lodash";
import instance from "../apis/task";

const Members = () => {
  const [searchMember, setSearchMember] = useState("");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");

  // use dispatch hook from redux
  const dispatch = useDispatch();

  // access members data from membersSlice
  const members = useAppSelector((state) => state.membersInfo.members);

  const { isLoading, resData, error, getData } = useGetRequest();
  useEffect(() => {
    const debounceSearch = debounce(() => {
      getData(
        `${instance.defaults.baseURL}/users?searchMember=${searchMember}`
      );
    }, 300);
    debounceSearch();

    return () => {
      debounceSearch.cancel();
    };
  }, [searchMember]);

  useEffect(() => {
    if (resData?.status === 200) {
      dispatch(setMembers(resData.data.data));
    }
  }, [resData, error]);

  const handleTask = (id: string) => {
    setTaskModalOpen(true);
    setSelectedMemberId(id);
  };
  return (
    <>
      {taskModalOpen && (
        <AssignTask
          closeModal={(val) => setTaskModalOpen(val)}
          memberId={selectedMemberId}
        />
      )}
      {/* {isLoading && <Loader />} */}
      <div className="bg-white h-[640px] pb-6 pt-4 shadow-lg rounded-lg px-4 md:px-14 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white h-24">
          {/* title */}
          <h1 className="font-semibold text-md md:text-xl">Members</h1>

          {/* search bar */}
          <div className="relative w-72">
            <input
              onChange={(e) => setSearchMember(e.target.value)}
              className="border border-gray-300 w-full outline-none pl-3 pr-8 py-2"
              type="text"
              placeholder="Search..."
            />
            <AiOutlineSearch className="absolute top-3 right-2" size={22} />
          </div>
        </div>

        {/* list of members */}

        <div className="mt-8">
          {members && members.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-2xl text-gray-400 font-semibold">
                Member Not Found
              </p>
            </div>
          ) : (
            members?.map((item) => (
              // user info
              <div
                key={item._id}
                className="mb-3 bg-white border-2 px-2 md:px-4 py-4 flex items-center gap-4 justify-around border-[#f5f5f7]"
              >
                {/* profile picture */}

                <div className="w-16 h-10 sm:w-10 sm:h-10 lg:w-14 lg:h-14">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={item.profileImage}
                    alt="profile picture"
                  />
                </div>
                {/* full name */}
                <div className="w-36">
                  <p className="text-xs md:text-sm font-semibold text-[#908E9B]">
                    Name
                  </p>
                  <p className="capitalize font-semibold text-xs md:text-base">
                    {item.fullname}
                  </p>
                </div>

                {/* email */}
                <div className="w-48">
                  <p className="text-xs md:text-sm font-semibold text-[#908E9B]">
                    Email
                  </p>
                  <p className="text-xs md:text-base">{item.email}</p>
                </div>

                {/* button to assign task */}
                <button onClick={() => handleTask(item._id)}>
                  <BiPlus className="w-6 h-6 md:w-9 md:h-9 hover:bg-green-600 hover:text-white cursor-pointer hover:transition-all hover:ease-in-out hover:duration-300 rounded-full text-green-600" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
