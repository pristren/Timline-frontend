import { useState } from "react";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  let prevMonth = null;
  const likedata = [
    {
      month: "Jan",
      like: 100,
    },
    {
      month: "Jan",
      like: 150,
    },
    {
      month: "Feb",
      like: 200,
    },
    {
      month: "Feb",
      like: 250,
    },
    {
      month: "Feb",
      like: 300,
    },
    {
      month: "Mar",
      like: 50,
    },
    {
      month: "Apr",
      like: 110,
    },
    {
      month: "Apr",
      like: 40,
    },
    {
      month: "Apr",
      like: 100,
    },
    {
      month: "May",
      like: 100,
    },
    {
      month: "May",
      like: 60,
    },
    {
      month: "Jun",
      like: 300,
    },
    {
      month: "Jun",
      like: 250,
    },
    {
      month: "Jul",
      like: 100,
    },
    {
      month: "Jul",
      like: 150,
    },
    {
      month: "Jul",
      like: 200,
    },
    {
      month: "Aug",
      like: 250,
    },
    {
      month: "Aug",
      like: 300,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute top-[79px] left-[96px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          Logo
        </div>
        <div className="absolute w-[1336px] h-[498px] top-[240px] left-[40px]">
          <div className="absolute w-[1190px] h-[50px] top-[427px] left-[120px] bg-[#d9d9d9]" />
          {likedata?.map((res, i) => {
            const isSameMonth = res.month === prevMonth;
            prevMonth = res.month;
            return (
              <>
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `14px`,
                    height: `${15 + res?.like}px`,
                    bottom: "70px",
                    left: `${110 + (i + 1) * 55}px`,
                    background: "#d9d9d9",
                  }}
                />
                <div
                  onClick={() => setSelectedIndex(i)}
                  style={{
                    position: "absolute",
                    width: `40px`,
                    height: `40px`,
                    bottom: `${70 + res?.like}px`,
                    left: `${96 + (i + 1) * 55}px`,
                    background: "#fb1717",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                  // className="absolute w-[20px] h-[20px] top-[118px] left-[49px] bg-[#fb1717] rounded-[50px]"
                />
                {!isSameMonth && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: `-10px`,
                      left: `${95 + (i + 1) * 55}px`,
                      color: "black",
                      fontSize: "10px",
                      zIndex: 99999999,
                    }}
                    // className="absolute top-[14px] left-[65px] font-normal text-black text-[16px]"
                  >
                    {res?.month} 2023
                  </div>
                )}

                {selectedIndex == i && (
                  <div>
                    <div
                      style={{
                        position: "absolute",
                        width: `164px`,
                        height: `95px`,
                        bottom: `${130 + res?.like}px`,
                        left: `${40 + (i + 1) * 55}px`,
                        background: "#d9d9d9",
                        zIndex: 999999,
                      }}
                      //   className="absolute w-[164px] h-[95px] top-0 left-0 bg-[#d9d9d9]"
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: `${160 + res?.like}px`,
                        left: `${105 + (i + 1) * 55}px`,
                        color: "black",
                        fontSize: "16px",
                        zIndex: 99999999,
                      }}
                      // className="absolute top-[14px] left-[65px] font-normal text-black text-[16px]"
                    >
                      title
                    </div>
                    <img
                      style={{
                        position: "absolute",
                        width: `26px`,
                        height: `34px`,
                        bottom: `${96 + res?.like}px`,
                        left: `${105 + (i + 1) * 55}px`,
                      }}
                      // className="absolute w-[26px] h-[34px] top-[94px] left-[67px]"
                      alt="Polygon"
                      src="https://i.ibb.co/vDZBHw1/Polygon-1.png"
                    />
                  </div>
                )}
              </>
            );
          })}
          {/* <div
              key={i}
              className={`absolute w-[16px] h-[${
                15 + res
              }px] bottom-[70px] left-[${100 + (i + 1 * 20)}px] bg-[#d9d9d9]`}
            /> */}
          {/* <div className="absolute w-[16px] h-[155px] top-[280px] left-[182px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[216px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[317px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[368px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[528px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[595px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[664px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[806px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[858px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[934px] bg-[#d9d9d9]" />
          <div className="absolute w-[16px] h-[155px] top-[280px] left-[1006px] bg-[#d9d9d9]" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
