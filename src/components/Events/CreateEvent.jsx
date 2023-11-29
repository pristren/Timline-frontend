import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [feildError, setFeildError] = useState(false);
  const [inputData, setInputData] = useState({
    event_name: "",
    event_date: "",
    event_description: "",
    event_image: "",
  });
  const handleFileChange = (e) => {
    let formData = new FormData();
    const maxFileSize = 5 * 1024 * 1024;
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setError(
        "File size exceeds the maximum allowed size (5MB). Please choose a smaller file."
      );
    } else {
      setError("");
      formData.append("image", file);
      formData.append("key", `${import.meta.env.VITE_IMGBB_API_KEY}`);
      setSelectedFile(file);
      axios.post("https://api.imgbb.com/1/upload", formData).then((res) => {
        setInputData({
          ...inputData,
          event_image: res.data.data.url,
        });
      });
    }
  };
  const handleInputChange = (event) => {
    setInputData((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const createEvent = (e) => {
    e.preventDefault();
    if (
      inputData?.event_name !== "" &&
      inputData?.event_date !== "" &&
      inputData?.event_description !== ""
    ) {
      setFeildError(false);
      axios
        .post("http://localhost:5000/api/v1/events", inputData)
        .then((res) => {
          toast.success("Successfully Created Event!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFeildError(true);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between mx-10 mt-5">
        <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/"}>Logo</Link>
        </div>
        <div className="cursor-pointer [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/create/event"}>Create Event</Link>
        </div>
      </div>
      <div className="flex items-center h-screen">
        <div className="p-6 bg-white mx-auto rounded-2xl w-full sm:w-3/4 md:w-[60%] lg:w-[45%] shadow-xl ">
          <div className="mb-4 text-center">
            <h3 className="font-semibold text-2xl text-gray-800">
              Create Event{" "}
            </h3>
          </div>
          <form
            onSubmit={createEvent}
            className="px-8 pt-6 pb-8  bg-white rounded"
          >
            <div className="mb-4 md:flex md:justify-between md:gap-4 space-y-2 md:space-y-0">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Event Name
                </label>
                <input
                  onChange={handleInputChange}
                  name="event_name"
                  className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type="text"
                  placeholder="Enter Event Name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 tracking-wide"
                >
                  Event Date
                </label>
                <input
                  onChange={handleInputChange}
                  name="event_date"
                  id="date"
                  className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type="date"
                  placeholder="Event Date"
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Event Description
              </label>
              <textarea
                onChange={handleInputChange}
                className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                name="event_description"
                placeholder="Enter Event Description Here"
              />
            </div>
            {selectedFile && (
              <div className="space-y-2 w-full mb-8">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                  className="w-[105px] h-[105px]"
                />
              </div>
            )}
            <div className="space-y-2 w-full mb-8">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Image
              </label>
              <input
                onChange={handleFileChange}
                className="w-full content-center text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                type="file"
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
