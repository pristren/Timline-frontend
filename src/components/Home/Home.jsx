import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Rodal from "rodal";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  let prevMonth = null;
  const [likedata, setLikeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/events").then((res) => {
      setLikeData(res.data);
    });
  }, []);

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSelectedIndex(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const elRef = useRef();
  const elRef1 = useRef();
  useEffect(() => {
    const el = elRef.current;
    const el1 = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el1.addEventListener("wheel", onWheel);
      return () => el1.removeEventListener("wheel", onWheel);
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="flex justify-between mx-10 mt-5">
        <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          Logo
        </div>
        <div className="cursor-pointer [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/create/event"}>Create Event</Link>
        </div>
      </div>
      <div
        ref={elRef1}
        className="bg-white flex flex-row justify-center w-full"
      >
        <div className="bg-white w-[1440px] relative">
          <div
            key={1}
            id="scrollhorigental"
            ref={elRef}
            className="absolute w-full mx-auto overflow-x-auto overflow-y-hidden min-h-[520px] top-[100px]"
          >
            {/* eslint-disable */}
            <div
              style={{
                width:
                  likedata?.length > 20
                    ? `${110 + likedata?.length * 55}px`
                    : "1190px",
              }}
              className="absolute h-[40px] top-[427px] left-[120px] bg-[#d9d9d9]"
            />
            {likedata?.map((res, i) => {
              const isSameMonth =
                dayjs(res?.event_date).format("MMM YYYY") === prevMonth;
              prevMonth = dayjs(res?.event_date).format("MMM YYYY");
              return (
                <>
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: `14px`,
                      height: `${15 + res?.likes}px`,
                      bottom: "70px",
                      left: `${110 + (i + 1) * 55}px`,
                      background: "#d9d9d9",
                    }}
                  />
                  {res?.event_image ? (
                    <img
                      onClick={() => setSelectedIndex(i)}
                      style={{
                        position: "absolute",
                        width: `40px`,
                        height: `40px`,
                        bottom: `${70 + res?.likes}px`,
                        left: `${96 + (i + 1) * 55}px`,
                        background: "#fb1717",
                        borderRadius: "50px",
                        cursor: "pointer",
                      }}
                      src={res?.event_image}
                      alt=""
                    />
                  ) : (
                    <div
                      onClick={() => setSelectedIndex(i)}
                      style={{
                        position: "absolute",
                        width: `40px`,
                        height: `40px`,
                        bottom: `${70 + res?.likes}px`,
                        left: `${96 + (i + 1) * 55}px`,
                        background: "#fb1717",
                        borderRadius: "50px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  {!isSameMonth && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: `5px`,
                        left: `${95 + (i + 1) * 55}px`,
                        color: "black",
                        fontSize: "10px",
                        zIndex: 99999999,
                      }}
                    >
                      {dayjs(res?.event_date).format("MMM YYYY")}
                    </div>
                  )}

                  {selectedIndex == i && (
                    <div onClick={() => setOpenModal(true)} ref={dropdownRef}>
                      <div
                        style={{
                          position: "absolute",
                          width: `164px`,
                          height: `95px`,
                          bottom: `${130 + res?.likes}px`,
                          left: `${40 + (i + 1) * 55}px`,
                          background: "#d9d9d9",
                          zIndex: 999999,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: `${160 + res?.likes}px`,
                          left: `${105 + (i + 1) * 55}px`,
                          color: "black",
                          fontSize: "16px",
                          zIndex: 99999999,
                        }}
                      >
                        {res?.event_name}
                      </div>
                      <img
                        style={{
                          position: "absolute",
                          width: `26px`,
                          height: `34px`,
                          bottom: `${96 + res?.likes}px`,
                          left: `${105 + (i + 1) * 55}px`,
                        }}
                        alt="Polygon"
                        src="https://i.ibb.co/vDZBHw1/Polygon-1.png"
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Rodal visible={openModal} onClose={() => setOpenModal(false)}>
        <div>Content</div>
      </Rodal>
    </div>
  );
};

export default Home;
