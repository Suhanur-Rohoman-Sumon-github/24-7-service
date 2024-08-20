import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./styels.css";
import "./print.css";
import cbimage from "../assets/last bg server copy.jpg";
import axios from "axios";
import QRCode from "qrcode";
const Nid = () => {
  const [qrImage, setQrImage] = useState(null);
  const [imge, setImage] = useState();
  console.log(qrImage);
  const location = useLocation();
  const { firstData, secondData } = location.state || {};

  let qrName = firstData?.data?.nameEnglish;
  let qrDob = firstData?.data?.dateOfBirth;
  let nationalIds = firstData?.data?.nationalId;

  // With async/await
  const generateQR = async (text) => {
    try {
      let res = await QRCode.toDataURL(text);
      setQrImage(res);
    } catch (err) {
      console.error(err);
    }
  };

  generateQR(`${qrName} ${nationalIds} ${qrDob} `);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: firstData.data.nameEnglish,
  });
  useEffect(() => {
    handlePrint();
  }, [handlePrint]);

  const {
    nameBangla,
    nameEnglish,
    fatherName,
    motherName,
    nationalId,
    dateOfBirth,
    pin,
    voter_no,
    PlaceOfBirth,
    Religion,
    gender,
    voterAreaCode,
    sl_no,
    permanentHomeOrHoldingNo,
    permanentAdditionalVillageOrRoad,
    permanentPostOffice,
    permanentUpozila,
    permanentDistrict,
    permanentDivision,
    presentHomeOrHoldingNo,
    presentAdditionalVillageOrRoad,
    presentPostOffice,
    presentDivision,
    presentDistrict,
    presentUpozila,
    // presentAddr,
  } = firstData.data;
  // const { division, district, upazila, union, village, postcode, area } =
  //   presentAddr;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/qr/?data=${nameEnglish}+${voter_no}+${dateOfBirth}`,
          {
            responseType: "blob",
          }
        );
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };
    if (firstData.data) {
      fetchData();
    }
  }, [firstData.data, dateOfBirth, voter_no, nameEnglish]);
  if (!firstData.data) {
    return <div>No data found.</div>;
  }
  return (
    <div>
      <div ref={componentRef} className="relative ">
        <div className="relative w-[1070px] h-[1300px] mx-auto bg-gray-200">
          <img
            className="absolute inset-0 w-full h-full  "
            src="https://servarcopyhd.xyz/images/cbimagex1.png"
            alt="Background"
          />

          <div className="absolute left-[30%] top-[8%] text-[16px] text-yellow-300 font-bold">
            National Identity Registration Wing (NIDW)
          </div>
          <div className="absolute left-[37%] top-[11%] text-[14px] text-pink-600 font-bold">
            Select Your Search Category
          </div>
          <div className="absolute left-[45%] top-[12.8%] text-[12px] text-green-800">
            Search By NID / Voter No.
          </div>
          <div className="absolute left-[45%] top-[14.3%] text-[12px] text-blue-600">
            Search By Form No.
          </div>
          <div className="absolute left-[30%] top-[16.9%] text-[12px] text-red-600 font-bold">
            NID or Voter No*
          </div>
          <div className="absolute left-[45%] top-[16.9%] text-[12px] text-gray-600">
            NID
          </div>
          <div className="absolute left-[63.7%] top-[17%] text-[11px] text-white">
            Submit
          </div>
          <div className="absolute left-[89.6%] top-[11.50%] text-[11px] text-white">
            Home
          </div>

          <div className="absolute left-[37%] top-[27.4%] text-[18px] text-black font-bold">
            জাতীয় পরিচিতি তথ্য
          </div>
          <div className="absolute left-[37%] top-[30%] text-[18px] text-black">
            জাতীয় পরিচয় পত্র নম্বর
          </div>
          <div
            id="nid_no"
            className="absolute left-[55%] top-[30%] text-[16px] text-black"
          >
            {nationalId}
          </div>

          <div className="absolute left-[37%] top-[32.7%] text-[18px] text-black">
            পিন নম্বর
          </div>
          <div
            id="nid_father"
            className="absolute left-[55%] top-[32.5%] text-[16px] text-black"
          >
            {pin}
          </div>

          <div className="absolute left-[37%] top-[35.4%] text-[18px] text-black">
            ভোটার নম্বর
          </div>
          <div
            id="nid_mother"
            className="absolute left-[55%] top-[35.4%] text-[18px] text-black"
          >
            {voter_no}
          </div>

          <div className="absolute left-[37%] top-[38%] text-[18px] text-black">
            সিরিয়াল নম্বর
          </div>
          <div
            id="spouse"
            className="absolute left-[55%] top-[38%] text-[16px] text-black"
          >
            {sl_no}
          </div>

          <div className="absolute left-[37%] top-[40.5%] text-[18px] text-black">
            ভোটার অঞ্চল
          </div>
          <div
            id="voter_area"
            className="absolute left-[55%] top-[40.5%] text-[18px] text-black"
          >
            {permanentAdditionalVillageOrRoad}
          </div>

          <div className="absolute left-[37%] top-[43.5%] text-[18px] text-black font-bold">
            ব্যক্তিগত তথ্য
          </div>
          <div className="absolute left-[37%] top-[46%] text-[18px] text-black">
            নাম (বাংলা)
          </div>
          <div
            id="name_bn"
            className="absolute font-bold left-[55%] top-[46%] text-[18px] text-black"
          >
            {nameBangla}
          </div>
          <div className="absolute left-[37%] top-[48.5%] text-[18px] text-black">
            নাম (ইংরেজি)
          </div>
          <div
            id="name_en"
            className="absolute left-[55%] top-[48.5%] text-[16px] text-black"
          >
            {nameEnglish}
          </div>
          <div className="absolute left-[37%] top-[51.2%] text-[18px] text-black">
            জন্ম তারিখ
          </div>
          <div
            id="dob"
            className="absolute left-[55%] top-[51.2%] text-[16px] text-black"
          >
            {dateOfBirth}
          </div>

          <div className="absolute left-[37%] top-[53.8%] text-[18px] text-black">
            পিতার নাম
          </div>
          <div
            id="fathers_name"
            className="absolute left-[55%] top-[53.8%] text-[18px] text-black"
          >
            {fatherName}
          </div>

          <div className="absolute left-[37%] top-[56.5%] text-[18px] text-black">
            মাতার নাম
          </div>
          <div
            id="mothers_name"
            className="absolute left-[55%] top-[56.5%] text-[18px] text-black"
          >
            {motherName}
          </div>

          <div className="absolute left-[37%] top-[59.5%] text-[18px] text-black">
            স্বামী/স্ত্রীর নাম
          </div>
          <div
            id="blood"
            className="absolute left-[55%] top-[59.5%] text-[18px] text-black"
          >
            {""}
          </div>

          <div className="absolute left-[37%] top-[62.2%] text-[18px] text-black font-bold">
            অন্যান্য তথ্য
          </div>

          <div className="absolute left-[37%] top-[65%] text-[18px] text-black">
            লিঙ্গ
          </div>
          <div
            id="gender"
            className="absolute left-[55%] top-[65%] text-[18px] text-black"
          >
            {secondData.data.gender}
          </div>

          <div className="absolute left-[37%] top-[67.7%] text-[18px] text-black">
            ধর্ম
          </div>
          <div
            id="mobile_no"
            className="absolute left-[55%] top-[67.7%] text-[16px] text-black"
          >
            {secondData.data.religion}
          </div>

          <div className="absolute left-[37%] top-[70.5%] text-[18px] text-black">
            ভোটার এরিয়া কোড
          </div>
          <div
            id="blood_grp"
            className="absolute left-[55%] top-[70.5%] text-[18px] "
          >
            {voterAreaCode}
          </div>

          <div className="absolute left-[37%] top-[72.9%] text-[18px] text-black">
            জন্মস্থান
          </div>
          <div
            id="birth_place"
            className="absolute left-[55%] top-[72.9%] text-[18px] text-black"
          >
            {PlaceOfBirth}
          </div>

          <div className="absolute left-[37%] top-[75.9%] text-[18px] text-black font-bold">
            বর্তমান ঠিকানা
          </div>
          <div
            id="present_addr"
            className="absolute left-[37%] top-[78.1%] w-[48%] text-[16px] text-black"
          >
            {`বাসা/হোল্ডিং: ${presentHomeOrHoldingNo}, গ্রাম/রাস্তা: ${presentAdditionalVillageOrRoad}, পোস্ট

অফিস: ${presentPostOffice},  উপজেলা: ${presentUpozila}, জেলা:${presentDistrict}
, বিভাগ: ${presentDivision}`}
          </div>

          <div className="absolute left-[37%] top-[84.7%] text-[18px] text-black font-bold">
            স্থায়ী ঠিকানা
          </div>
          <div
            id="permanent_addr"
            className="absolute left-[37%] top-[87%] w-[48%] text-[16px] text-black"
          >
            {`বাসা/হোল্ডিং: ${permanentHomeOrHoldingNo}, গ্রাম/রাস্তা: ${permanentAdditionalVillageOrRoad}, পোস্ট

অফিস: ${permanentPostOffice},  উপজেলা: ${permanentUpozila}, জেলা:${permanentDistrict}
, বিভাগ: ${permanentDivision}`}
          </div>
          <div className="absolute top-[93.5%] w-full text-center text-[14px] text-black">
            This is Software Generated Report From Bangladesh Election
            Commission, Signature & Seal Aren't Required.
          </div>
          <div className="absolute top-[95%] w-full text-[16px] text-center text-red-500">
            উপরে প্রদর্শিত তথ্যসমূহ জাতীয় পরিচয়পত্র সংশ্লিষ্ট, ভোটার তালিকার
            সাথে সরাসরি সম্পর্কযুক্ত নয়।
          </div>

          <div className="absolute left-[22%] top-[25.7%] text-[12px] text-black">
            <img
              id="photo"
              src={secondData.data.photo}
              alt="User"
              className="w-[100px] h-[100px] inset-1 rounded-md ml-3"
            />
            <p className="text-center my-3 text-[18px] font-semibold">
              {nameEnglish}
            </p>
            <img
              className="mx-auto mt-[-7px]"
              id="photo"
              src={qrImage}
              height="125px"
              width="125px"
              style={{ borderRadius: "10px" }}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nid;
