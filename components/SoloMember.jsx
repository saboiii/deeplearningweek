import React, { useRef, useState } from "react";
import MemberCard from "./MemberCard";
import SleekButton from "./SleekButton";
import SleekButtonBack from "./SleekButtonBack";
import { FiMousePointer } from "react-icons/fi";
import { PiHandTap } from "react-icons/pi";
import { useRouter } from "next/navigation";

function SoloMember({ exitFunction }) {
  const router = useRouter();
  const [toggleMenu, setToggleMenu] = useState(false);
  const memberCardRef = useRef(null);

  const [errorText, setErrorText] = useState("");
  const [submissionMode, setSubmissionMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  const handleSubmit = async () => {
    const memberData = memberCardRef.current.getMemberData();

    const participantType =
      memberData.participantType || (memberData.uni ? "uni" : "");
    const isUni = participantType === "uni";
    const isPreUni = participantType === "preuni";
    const age = calculateAge(memberData.dateOfBirth);
    const isUnder18 = age !== null && age < 18;

    const requiredFields = [
      { field: "name", message: "Name is a required field." },
      {
        field: "participantType",
        message: "Participant type is a required field.",
      },
      { field: "email", message: "Email is a required field." },
      { field: "gender", message: "Gender is a required field." },
      { field: "tele", message: "Telegram handle is a required field." },
      {
        field: "course",
        message: "Course / Stream / Track is a required field.",
      },
      { field: "nationality", message: "Nationality is a required field." },
      { field: "diet", message: "Dietary preference is a required field." },
      { field: "size", message: "T-shirt size is a required field." },
    ];

    for (const { field, message } of requiredFields) {
      if (
        !memberData[field] ||
        (typeof memberData[field] === "string" &&
          memberData[field].trim() === "")
      ) {
        setErrorText(message);
        cancelSubmission();
        return;
      }
    }

    if (isUni) {
      if (!memberData.uni || memberData.uni.trim() === "") {
        setErrorText(
          "University is a required field for university participants.",
        );
        cancelSubmission();
        return;
      }

      if (!memberData.degreeType || memberData.degreeType.trim() === "") {
        setErrorText("Degree type is required for university participants.");
        cancelSubmission();
        return;
      }

      if (!memberData.year || memberData.year.trim() === "") {
        setErrorText("Year is required for university participants.");
        cancelSubmission();
        return;
      }
    }

    if (isPreUni) {
      const preUniRequiredFields = [
        {
          field: "institutionName",
          message:
            "Institution name is required for pre-university participants.",
        },
        {
          field: "preUniCategory",
          message:
            "Pre-uni category is required for pre-university participants.",
        },
        {
          field: "expectedGradYear",
          message:
            "Expected graduation year is required for pre-university participants.",
        },
        {
          field: "dateOfBirth",
          message: "Date of birth is required for pre-university participants.",
        },
      ];

      for (const { field, message } of preUniRequiredFields) {
        if (
          !memberData[field] ||
          (typeof memberData[field] === "string" &&
            memberData[field].trim() === "")
        ) {
          setErrorText(message);
          cancelSubmission();
          return;
        }
      }

      if (!memberData.indemnityMsFormConfirmed) {
        setErrorText(
          "Please upload the signed indemnity form via the Microsoft Form and tick the confirmation box.",
        );
        cancelSubmission();
        return;
      }
    }

    if (isUnder18) {
      const guardianRequiredFields = [
        {
          field: "guardianName",
          message:
            "Parent/Guardian name is required for participants under 18.",
        },
        {
          field: "guardianEmail",
          message:
            "Parent/Guardian email is required for participants under 18.",
        },
        {
          field: "guardianPhone",
          message:
            "Parent/Guardian phone is required for participants under 18.",
        },
      ];

      for (const { field, message } of guardianRequiredFields) {
        if (
          !memberData[field] ||
          (typeof memberData[field] === "string" &&
            memberData[field].trim() === "")
        ) {
          setErrorText(message);
          cancelSubmission();
          return;
        }
      }

      if (!memberData.guardianConsent) {
        setErrorText(
          "Parent/guardian consent is required for participants under 18.",
        );
        cancelSubmission();
        return;
      }
    }

    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (memberData.email && !emailCheck.test(memberData.email)) {
      setErrorText("Please enter a valid email address.");
      cancelSubmission();
      return;
    }

    if (
      memberData.guardianEmail &&
      !emailCheck.test(memberData.guardianEmail)
    ) {
      setErrorText("Please enter a valid parent/guardian email address.");
      cancelSubmission();
      return;
    }

    if (memberData.ntuEmail && !emailCheck.test(memberData.ntuEmail)) {
      setErrorText("Please enter a valid NTU email address.");
      cancelSubmission();
      return;
    }

    const telePattern = /^[a-zA-Z0-9_]{5,}$/;
    if (memberData.tele && !telePattern.test(memberData.tele)) {
      setErrorText(
        "Telegram handle must be at least 5 characters long and may consist only of a-z, 0-9, and underscores.",
      );
      cancelSubmission();
      return;
    }

    const phonePattern = /^[+0-9()\-\s]{7,20}$/;
    if (
      memberData.guardianPhone &&
      !phonePattern.test(memberData.guardianPhone)
    ) {
      setErrorText("Please enter a valid parent/guardian phone number.");
      cancelSubmission();
      return;
    }

    if (isUni && memberData.uni === "Nanyang Technological University") {
      if (!memberData.matricNo || memberData.matricNo.trim() === "") {
        setErrorText("Matriculation number is required for NTU students.");
        cancelSubmission();
        return;
      }
      if (!memberData.ntuEmail || memberData.ntuEmail.trim() === "") {
        setErrorText("NTU email is required for NTU students.");
        cancelSubmission();
        return;
      }
      if (!memberData.school || memberData.school.trim() === "") {
        setErrorText("School is required for NTU students.");
        cancelSubmission();
        return;
      }
    }

    performSubmit(memberData);
  };

  const performSubmit = async (memberData) => {
    try {
      setLoading(true);
      const payload = { ...memberData };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solo: payload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorText(
          errorData.error || "An error occurred while submitting the form.",
        );
        cancelSubmission();
        return;
      }

      memberCardRef.current.resetFields();
      setErrorText("");
      router.push("/confirmed");
      setLoading(false);
    } catch (error) {
      console.log("Submission error:", error);
      setLoading(false);
      cancelSubmission();
      setErrorText("Failed to submit the form. Please try again later.");
    }
  };

  const cancelSubmission = () => {
    setToggleMenu(false);
    setSubmissionMode(false);
    setLoading(false);
  };

  const startSubmission = () => {
    setToggleMenu(true);
    setSubmissionMode(true);
  };

  return (
    <div className="relative flex flex-col gap-8 w-full items-center px-8 md:px-12">
      <div
        className={`fixed flex items-center justify-center w-screen h-screen bg-black/90 z-[20] ${toggleMenu ? "flex" : "hidden"}`}
      >
        <div className="flex flex-col items-center gap-3 justify-center">
          <h2 className="flex text-3xl">Are you sure?</h2>
          <p className="flex text-[#9fa6af] text-xs mb-3 text-center px-24">
            You can't edit this form once it has been submitted!
          </p>
          <div className="flex gap-2">
            <SleekButtonBack
              text="Return"
              onClick={cancelSubmission}
              styles={
                "border-slate-600 text-slate-600 border-[0.5px] rounded-full"
              }
              disabled={loading}
            />
            <SleekButton
              text="Submit"
              onClick={handleSubmit}
              styles={"border-[#d1e1f3] border-[0.5px] rounded-full"}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[12vh]">
        <FiMousePointer size={12} className="inline mr-2" />
        Click on the fields to edit them.
      </div>
      <div className="md:hidden flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[12vh]">
        <PiHandTap size={16} className="inline mr-2" />
        Tap on the fields to edit form.
      </div>
      <div className="flex w-full">
        <MemberCard
          isLeader={true}
          regType={"solo"}
          memberCardId={1}
          ref={memberCardRef}
          errorText={errorText}
        />
      </div>
      <div className="flex w-full justify-center text-center text-xs text-[#3c3c49] px-16">
        Having trouble with your form? Contact &#64;sabb.exe on telegram&#33;
      </div>
      <div className="flex w-full justify-between mb-[5vh]">
        <SleekButtonBack
          text="Go Back"
          onClick={exitFunction}
          disabled={submissionMode}
        />
        <SleekButton
          text={"Confirm & Submit"}
          styles={"text-white"}
          onClick={startSubmission}
          disabled={submissionMode}
        />
      </div>
    </div>
  );
}

export default SoloMember;
