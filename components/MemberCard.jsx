"use client";
import { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GiCrownedSkull } from "react-icons/gi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const MemberCard = forwardRef(
  ({ isLeader, regType, memberCardId, errorText }, ref) => {
    const [bgLoaded, setBgLoaded] = useState(false);
    const [banner, setBanner] = useState("/images/hebg.png");
    const [icon, setIcon] = useState("/images/he.png");
    const [iconLoaded, setIconLoaded] = useState(false);
    const indemnityTemplateLink =
      process.env.NEXT_PUBLIC_NTU_INDEMNITY_TEMPLATE_URL || "#";
    const indemnityMsFormLink = "https://forms.office.com/r/X5B8Lrb3Sv";

    const getStoredData = () => {
      const defaults = {
        name: "",
        participantType: "",
        uni: "",
        institutionName: "",
        preUniCategory: "",
        expectedGradYear: "",
        dateOfBirth: "",
        guardianName: "",
        guardianEmail: "",
        guardianPhone: "",
        guardianConsent: false,
        indemnityMsFormConfirmed: false,
        matricNo: "",
        ntuEmail: "",
        email: "",
        gender: "she",
        tele: "",
        course: "",
        school: "",
        degreeType: "",
        year: "",
        nationality: "",
        diet: "",
        size: "M",
        night: false,
      };
      const storedData = localStorage.getItem(`${regType}_${memberCardId}`);
      if (storedData) {
        const { data, timestamp } = JSON.parse(storedData);
        const age = Date.now() - timestamp;
        const sixHours = 6 * 60 * 60 * 1000;
        if (age < sixHours) {
          const resolvedParticipantType =
            data.participantType || (data.uni ? "uni" : "");
          const resolvedInstitutionName =
            data.institutionName || data.uni || "";
          return {
            ...defaults,
            ...data,
            participantType: resolvedParticipantType,
            institutionName: resolvedInstitutionName,
          };
        } else {
          localStorage.removeItem(`${regType}_${memberCardId}`);
        }
      }
      return { ...defaults };
    };

    const [name, setName] = useState(getStoredData().name);
    const [participantType, setParticipantType] = useState(
      getStoredData().participantType,
    );
    const [uni, setUni] = useState(getStoredData().uni);
    const [institutionName, setInstitutionName] = useState(
      getStoredData().institutionName,
    );
    const [preUniCategory, setPreUniCategory] = useState(
      getStoredData().preUniCategory,
    );
    const [expectedGradYear, setExpectedGradYear] = useState(
      getStoredData().expectedGradYear,
    );
    const [dateOfBirth, setDateOfBirth] = useState(getStoredData().dateOfBirth);
    const [guardianName, setGuardianName] = useState(
      getStoredData().guardianName,
    );
    const [guardianEmail, setGuardianEmail] = useState(
      getStoredData().guardianEmail,
    );
    const [guardianPhone, setGuardianPhone] = useState(
      getStoredData().guardianPhone,
    );
    const [guardianConsent, setGuardianConsent] = useState(
      getStoredData().guardianConsent,
    );
    const [indemnityMsFormConfirmed, setIndemnityMsFormConfirmed] = useState(
      getStoredData().indemnityMsFormConfirmed,
    );
    const [matricNo, setMatricNo] = useState(getStoredData().matricNo);
    const [ntuEmail, setNtuEmail] = useState(getStoredData().ntuEmail);
    const [email, setEmail] = useState(getStoredData().email);
    const [gender, setGender] = useState(getStoredData().gender);
    const [tele, setTele] = useState(getStoredData().tele);
    const [course, setCourse] = useState(getStoredData().course);
    const [school, setSchool] = useState(getStoredData().school);
    const [degreeType, setDegreeType] = useState(getStoredData().degreeType);
    const [year, setYear] = useState(getStoredData().year);
    const [nationality, setNationality] = useState(getStoredData().nationality);
    const [diet, setDiet] = useState(getStoredData().diet);
    const [size, setSize] = useState(getStoredData().size);
    const [night, setNight] = useState(getStoredData().night);

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

    const derivedAge = calculateAge(dateOfBirth);
    const isUnder18 = derivedAge !== null && derivedAge < 18;

    useImperativeHandle(ref, () => ({
      getMemberData: () => ({
        name,
        participantType,
        uni,
        institutionName,
        preUniCategory,
        expectedGradYear,
        dateOfBirth,
        guardianName,
        guardianEmail,
        guardianPhone,
        guardianConsent,
        indemnityMsFormConfirmed,
        matricNo,
        ntuEmail,
        email,
        gender,
        tele,
        course,
        school,
        degreeType: degreeType || "",
        year,
        nationality: nationality || "",
        diet,
        size,
        night,
      }),
      resetFields: () => {
        setName("");
        setParticipantType("");
        setUni("");
        setInstitutionName("");
        setPreUniCategory("");
        setExpectedGradYear("");
        setDateOfBirth("");
        setGuardianName("");
        setGuardianEmail("");
        setGuardianPhone("");
        setGuardianConsent(false);
        setIndemnityMsFormConfirmed(false);
        setMatricNo("");
        setNtuEmail("");
        setEmail("");
        setGender("she");
        setTele("");
        setCourse("");
        setSchool("");
        setDegreeType("");
        setYear("");
        setNationality("");
        setDiet("");
        setSize("M");
        setNight(false);
        localStorage.removeItem(`${regType}_${memberCardId}`);
      },
    }));

    useEffect(() => {
      const storedData = localStorage.getItem(`${regType}_${memberCardId}`);
      if (storedData) {
        const { data, timestamp } = JSON.parse(storedData);
        const age = Date.now() - timestamp;
        const sixHours = 6 * 60 * 60 * 1000;
        if (age < sixHours) {
          setName(data.name ?? "");
          const resolvedParticipantType =
            data.participantType || (data.uni ? "uni" : "");
          setParticipantType(resolvedParticipantType);
          setUni(data.uni ?? "");
          setInstitutionName(data.institutionName ?? data.uni ?? "");
          setPreUniCategory(data.preUniCategory ?? "");
          setExpectedGradYear(data.expectedGradYear ?? "");
          setDateOfBirth(data.dateOfBirth ?? "");
          setGuardianName(data.guardianName ?? "");
          setGuardianEmail(data.guardianEmail ?? "");
          setGuardianPhone(data.guardianPhone ?? "");
          setGuardianConsent(data.guardianConsent ?? false);
          setIndemnityMsFormConfirmed(data.indemnityMsFormConfirmed ?? false);
          setMatricNo(data.matricNo ?? "");
          setNtuEmail(data.ntuEmail ?? "");
          setEmail(data.email ?? "");
          setTele(data.tele ?? "");
          setCourse(data.course ?? "");
          setSchool(data.school ?? "");
          setDegreeType(data.degreeType ?? "");
          setYear(data.year ?? "");
          setNationality(data.nationality ?? "");
          setDiet(data.diet ?? "");
          setSize(data.size ?? "M");
          setNight(data.night ?? false);
          setGender(data.gender ?? "she");
        } else {
          localStorage.removeItem(`${regType}_${memberCardId}`);
        }
      }
    }, [regType, memberCardId]);

    useEffect(() => {
      const handler = () => {
        const storedData = localStorage.getItem(`${regType}_${memberCardId}`);
        if (storedData) {
          const { data, timestamp } = JSON.parse(storedData);
          const age = Date.now() - timestamp;
          const sixHours = 6 * 60 * 60 * 1000;
          if (age < sixHours) {
            setDegreeType(data.degreeType ?? "");
            setNationality(data.nationality ?? "");
          }
        }
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }, [regType, memberCardId]);

    useEffect(() => {
      if (participantType === "uni" && uni) {
        setInstitutionName(uni);
      }
    }, [participantType, uni]);

    const saveMemberData = () => {
      localStorage.removeItem(`${regType}_${memberCardId}`);

      const memberData = {
        name,
        participantType,
        uni,
        institutionName,
        preUniCategory,
        expectedGradYear,
        dateOfBirth,
        guardianName,
        guardianEmail,
        guardianPhone,
        guardianConsent,
        indemnityMsFormConfirmed,
        matricNo,
        ntuEmail,
        email,
        tele,
        course,
        school,
        degreeType,
        year,
        nationality,
        gender,
        diet,
        size,
        night,
      };
      const timestamp = Date.now();
      localStorage.setItem(
        `${regType}_${memberCardId}`,
        JSON.stringify({ data: memberData, timestamp }),
      );
    };

    useEffect(() => {
      saveMemberData();
    }, [
      name,
      participantType,
      uni,
      institutionName,
      preUniCategory,
      expectedGradYear,
      dateOfBirth,
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianConsent,
      indemnityMsFormConfirmed,
      matricNo,
      ntuEmail,
      email,
      tele,
      course,
      school,
      degreeType,
      year,
      nationality,
      diet,
      size,
      night,
      gender,
    ]);

    useEffect(() => {
      if (gender === "he") {
        setBanner("/images/hebg.png");
        setIcon("/images/he.png");
      } else if (gender === "she") {
        setBanner("/images/shebg.png");
        setIcon("/images/she.png");
      } else {
        setBanner("/images/theybg.png");
        setIcon("/images/they.png");
      }
    }, [gender]);

    const handleParticipantTypeChange = (value) => {
      setParticipantType(value);

      if (value === "uni") {
        if (uni) {
          setInstitutionName(uni);
        }
        setPreUniCategory("");
        setExpectedGradYear("");
        setDateOfBirth("");
        setGuardianName("");
        setGuardianEmail("");
        setGuardianPhone("");
        setGuardianConsent(false);
        setIndemnityMsFormConfirmed(false);
      } else if (value === "preuni") {
        setUni("");
        setMatricNo("");
        setNtuEmail("");
        setSchool("");
        setDegreeType("");
        setYear("");
        setInstitutionName("");
      }
    };

    return (
      <div className="flex flex-col w-full rounded-3xl overflow-hidden border border-[#1e1d31] shadow-lg shadow-black/50">
        <div
          className={`relative flex justify-start ${bgLoaded ? "" : "bg-indigo-500/20 "} w-full h-[150px]`}
        >
          <div className="absolute right-0 top-0 translate-y-6 -translate-x-6 flex h-10 justify-end text-white group">
            <GiCrownedSkull
              size={32}
              className={`flex transition-opacity duration-300 ease-in-out ${
                isLeader ? "" : "opacity-20"
              }`}
            />
            {regType == "team" ? (
              <div className="skullKing">{isLeader ? "Leader" : "Member"}</div>
            ) : (
              <div className="skullKing">Solo</div>
            )}
          </div>

          <Image
            src={banner}
            height={1080}
            width={1920}
            loading="lazy"
            className="object-cover object-center w-full h-full"
            alt="Background"
            onLoad={() => {
              setBgLoaded(true);
            }}
            onError={() => {
              setBgLoaded(false);
            }}
          />

          <div
            className={`absolute left-8 top-[85px] shadow-md shadow-black/50 overflow-hidden ${iconLoaded ? "" : "bg-indigo-950"} z-10 h-[140px] w-[140px] rounded-full`}
          >
            <Image
              src={icon}
              height={1080}
              width={1920}
              quality={100}
              loading="lazy"
              className="object-cover object-center w-full h-full"
              alt="Background"
              onLoad={() => setIconLoaded(true)}
              onError={() => setIconLoaded(false)}
            />
          </div>
        </div>
        <div className="flex flex-col text-black bg-gradient-to-br from-[#212738]/40 to-[#1b1b33]/40 backdrop-blur-sm w-full px-4 pb-5 md:px-10 gap-2 md:pb-8 lg:pb-0">
          <div className="flex flex-col lg:flex-row mb-4 mt-0 px-1 lg:px-0 lg:mb-0 lg:h-24 gap-4 w-full pt-2 lg:pt-6 justify-start lg:justify-end z-30 text-white lg:order-none order-4">
            {/* <div className='flex flex-row lg:h-10 items-center text-[#8889a5]'>
                        <label className='mr-2 text-sm'>Course/Year:</label>
                        <input type='text' onChange={(e) => setCourse(e.target.value)} placeholder='Course/Year' name="course" value={course} className='flex w-24 text-sm placeholderIndicator outline-none font-normal tracking-tight z-30 bg-transparent' />
                    </div> */}
            <div className="flex flex-row lg:h-10 items-center text-white">
              <label className="mr-2 text-sm">T-Shirt Size:</label>
              <select
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className="flex outline-none text-sm font-normal tracking-tight z-30 bg-transparent"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="flex flex-row lg:h-10 items-center text-white">
              <label className="mr-2 text-sm">Gender:</label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="flex outline-none text-sm font-normal tracking-tight z-30 bg-transparent"
              >
                <option value="he">Male</option>
                <option value="she">Female</option>
                <option value="they">Non-binary</option>
                <option value="na">Prefer not to say</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            name="name"
            value={name}
            className="placeholderIndicator lg:order-none lg:mt-0 mt-16 order-1 flex ml-1 h-10 z-30 text-[24px] outline-none text-white font-medium tracking-tight  bg-transparent"
          />
          <select
            onChange={(e) => handleParticipantTypeChange(e.target.value)}
            value={participantType}
            className="lg:order-none order-2 flex text-sm outline-none font-medium tracking-tight z-30 bg-transparent mb-0 lg:mb-2 text-white"
          >
            <option value="" disabled>
              Select Participant Type
            </option>
            <option value="uni">University Student</option>
            <option value="preuni">Pre-University Student</option>
          </select>

          {participantType === "uni" && (
            <select
              onChange={(e) => setUni(e.target.value)}
              value={uni}
              className="lg:order-none order-2 flex text-sm outline-none font-medium tracking-tight z-30 bg-transparent mb-0 lg:mb-4 text-white"
            >
              <option value="" disabled>
                Select University
              </option>
              <option value="Nanyang Technological University">
                Nanyang Technological University
              </option>
              <option value="Singapore University of Design & Technology">
                Singapore University of Design &amp; Technology
              </option>
              <option value="National University of Singapore">
                National University of Singapore
              </option>
              <option value="Singapore Institute of Technology">
                Singapore Institute of Technology
              </option>
              <option value="Singapore Management University">
                Singapore Management University
              </option>
              <option value="Singapore University of Social Sciences">
                Singapore University of Social Sciences
              </option>
              <option value="Singapore Institute of Management">
                Singapore Institute of Management
              </option>
            </select>
          )}

          {participantType === "preuni" && (
            <motion.div
              className="lg:order-none order-3 flex flex-col w-full gap-3 py-2 mb-0 lg:mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Institution Name, eg. 'Anglo-Chinese Junior College'"
                name="institutionName"
                value={institutionName}
                className="ntuDetail"
              />
              <select
                onChange={(e) => setPreUniCategory(e.target.value)}
                value={preUniCategory}
                className="ntuDetail"
              >
                <option value="" disabled>
                  Select Pre-Uni Category
                </option>
                <option value="jc">Junior College</option>
                <option value="poly">Polytechnic</option>
                <option value="ite">ITE</option>
                <option value="secondary">Secondary</option>
                <option value="international">International school</option>
                <option value="other">Other</option>
              </select>
              <input
                type="number"
                onChange={(e) => setExpectedGradYear(e.target.value)}
                placeholder="Expected Graduation Year"
                name="expectedGradYear"
                value={expectedGradYear}
                className="ntuDetail"
                min="2026"
                max="2050"
              />
              <input
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
                name="dateOfBirth"
                value={dateOfBirth}
                className="ntuDetail"
              />

              <div className="flex flex-col gap-2 text-[#9fa6bf] text-xs px-1 h-full">
                <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
                  <div className="flex flex-col w-full h-full justify-center md:w-1/2 mt-8 md:mt-0">
                    <div className="mb-2 text-[15px] font-medium text-gray-200">
                      Indemnity Form (Required)
                    </div>
                    <a
                      href={indemnityTemplateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 text-blue-400 hover:underline text-xs font-medium"
                    >
                      Download template
                    </a>
                    <p className="flex text-pretty max-w-sm">
                      It is compulsory for all pre-university participants to
                      submit a signed indemnity form. Download the template
                      above, have your parent/guardian sign it, then upload the
                      scanned copy to the Microsoft Form below. Registrations
                      without a submission will not be considered.
                    </p>
                  </div>
                  <div className="flex-col flex items-center justify-center w-full h-full md:w-1/2">
                    <a
                      href={indemnityMsFormLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all mt-8 duration-200 flex flex-col items-center justify-center w-full mx-auto py-8 px-4 border border-dashed h-full rounded-2xl cursor-pointer bg-[#181926]/40 hover:bg-[#191a2a] active:bg-[#23243a]/30 shadow-sm border-[#35365a]"
                    >
                      <span className="text-gray-200 text-center w-full text-pretty text-sm font-normal mb-1">
                        Open Microsoft Form to upload your signed PDF
                      </span>
                      <span className="text-[#7a7b9a] text-xs">
                        https://forms.office.com/r/X5B8Lrb3Sv
                      </span>
                    </a>
                    <label className="mt-4 flex items-start gap-2 text-[#c1c1d1] text-xs">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setIndemnityMsFormConfirmed(e.target.checked)
                        }
                        checked={indemnityMsFormConfirmed === true}
                        className="mt-0.5 flex w-4 h-4 rounded outline-none border border-[#504d87]/30 hover:border-[#504d87] duration-200 transition ease-in-out bg-transparent"
                      />
                      <span>
                        I have uploaded the signed indemnity form to the
                        Microsoft Form.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {isUnder18 && (
                <motion.div
                  className="flex flex-col w-full gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <input
                    type="text"
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Parent/Guardian Name"
                    name="guardianName"
                    value={guardianName}
                    className="ntuDetail"
                  />
                  <input
                    type="email"
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="Parent/Guardian Email"
                    name="guardianEmail"
                    value={guardianEmail}
                    className="ntuDetail"
                  />
                  <input
                    type="text"
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="Parent/Guardian Phone"
                    name="guardianPhone"
                    value={guardianPhone}
                    className="ntuDetail"
                  />

                  <label className="flex items-start gap-2 text-[#c1c1d1] text-xs">
                    <input
                      type="checkbox"
                      onChange={(e) => setGuardianConsent(e.target.checked)}
                      checked={guardianConsent === true}
                      className="mt-0.5 flex w-4 h-4 rounded outline-none border border-[#504d87]/30 hover:border-[#504d87] duration-200 transition ease-in-out bg-transparent"
                    />
                    <span>
                      I have parent/guardian consent to participate (required if
                      under 18).
                    </span>
                  </label>
                </motion.div>
              )}
            </motion.div>
          )}

          {participantType === "" && (
            <div className="flex w-full text-center text-[#8889a5] items-center justify-center text-xs p-2 bg-gradient-to-r from-[#2a2b3c]/30 to-[#504d87]/10 rounded-xl border border-[#504d87]/10">
              Select participant type to continue.
            </div>
          )}

          {participantType === "uni" && (
            <>
              {uni === "Nanyang Technological University" && (
                <motion.div
                  className="lg:order-none order-3 flex flex-col w-full gap-4 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex w-full text-center text-[#8889a5] items-center justify-center text-xs p-2 bg-gradient-to-r from-[#2a2b3c]/30 to-[#504d87]/10 rounded-xl border border-[#504d87]/10">
                    Hey, it's a fellow NTU student! Please fill in their
                    matriculation number and NTU email.
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setMatricNo(e.target.value)}
                    placeholder="Matriculation Number"
                    name="matricNo"
                    value={matricNo}
                    className="ntuDetail"
                  />
                  <input
                    type="email"
                    onChange={(e) => setNtuEmail(e.target.value)}
                    placeholder="NTU Email"
                    name="ntuEmail"
                    value={ntuEmail}
                    className="ntuDetail"
                  />
                </motion.div>
              )}
            </>
          )}

          <div className="lg:order-none order-5 flex flex-col md:flex-row rounded-lg border bg-[#1a1929] border-[#383650] text-sm outline-none py-4 px-5 placeholder:text-[#524f75] text-[#c1c1d1] font-medium tracking-tight items-start md:mb-10 gap-6">
            <div className="flex gap-3 flex-col w-full h-full text-[#c1c1d1] text-xs">
              <div className="flex lg:ml-0 font-medium text-sm">
                Contact Information & Details
              </div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Personal Email"
                name="email"
                value={email}
                className="flex text-xs px-3 py-2 inputSmall"
              />
              <input
                type="text"
                onChange={(e) => setTele(e.target.value)}
                placeholder="Telegram Handle"
                name="tele"
                value={tele}
                className="flex text-xs px-3 py-2 inputSmall"
              />
              {/* new stuff */}
              <input
                type="text"
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Course / Stream / Track"
                name="course"
                value={course}
                className="flex text-xs px-3 py-2 inputSmall"
              />

              {/* Only show school select if NTU is selected as university */}
              {participantType === "uni" &&
                uni === "Nanyang Technological University" && (
                  <select
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                    className="lg:order-none order-2 flex px-3 py-2 inputSmall"
                  >
                    <option value="" disabled>
                      Select School
                    </option>
                    <option value="COE">CoE (MAE, MSE, EEE, CEE)</option>
                    <option value="CoS">CoS (CCEB, SPMS, SBS, ASE)</option>
                    <option value="NBS">NBS</option>
                    <option value="COHASS">
                      COHASS (HSS, WKWSCI, ADM, SOH)
                    </option>
                    <option value="CCDS">CCDS</option>
                  </select>
                )}

              {participantType === "uni" && (
                <select
                  onChange={(e) => setDegreeType(e.target.value)}
                  value={degreeType}
                  className="lg:order-none order-2 flex px-3 py-2 inputSmall"
                >
                  <option value="" disabled>
                    Select Degree Type
                  </option>
                  <option value="ug">Undergraduate</option>
                  <option value="mas">Postgraduate (Masters)</option>
                  <option value="phd">Postgraduate (PhD)</option>
                </select>
              )}

              {participantType === "uni" && (
                <select
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  className="lg:order-none order-2 flex text-xs px-3 py-2 inputSmall"
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              )}

              <select
                onChange={(e) => setNationality(e.target.value)}
                value={nationality}
                className="lg:order-none order-2 flex text-xs px-3 py-2 inputSmall"
              >
                <option value="" disabled>
                  Select Nationality/Residential Status
                </option>
                <option value="sg">Singaporean Citizen</option>
                <option value="pr">Singapore PR</option>
                <option value="int">International</option>
              </select>
            </div>
            <div className="flex gap-3 flex-col w-full h-full text-[#c1c1d1] text-xs">
              <div className="flex font-medium text-sm">Preferences</div>
              <select
                onChange={(e) => setDiet(e.target.value)}
                value={diet}
                className="lg:order-none order-2 flex text-xs px-3 py-2 text-[#c1c1d1] placeholder:text-[#595975] rounded-xl outline-none border border-[#595975]/40 hover:border-[#504d87] duration-200 transition ease-in-out font-medium tracking-tight z-30 bg-transparent"
              >
                <option value="" disabled>
                  Select Dietary Preferences
                </option>
                <option value="na">No preference</option>
                <option value="veg">Vegetarian</option>
                <option value="halal">Halal</option>
              </select>
              <div className="flex items-center h-fit ml-1 mt-3">
                <input
                  type="checkbox"
                  onChange={(e) => setNight(e.target.checked)}
                  checked={night === true}
                  className="flex w-6 h-6 lg:w-4 lg:h-4 rounded-xl outline-none border mr-4 lg:mr-2 border-[#504d87]/30 hover:border-[#504d87] duration-200 transition ease-in-out z-30 bg-transparent"
                />

                <span className="flex text-xs text-[#c1c1d1] mr-4">
                  Staying overnight?
                </span>
              </div>
              <AnimatePresence>
                {night && (
                  <motion.div
                    key="notice"
                    className="flex w-full gap-3 text-[#859baf] bg-gradient-to-br from-cyan-900/5 to bg-cyan-800/10 text-xs rounded-md border border-[#20282f] p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="h-full flex">
                      <AiOutlineExclamationCircle size={20} />
                    </div>
                    <div className="flex flex-col h-full gap-1">
                      <div className="flex font-semibold text-sm">
                        Important Notice
                      </div>
                      <p className="font-normal">
                        By ticking this box, you agree to follow our event rules
                        and bring official personal identification (university
                        ID, NRIC, FIN). We're not liable for any belongings you
                        leave behind or unattended. Feel free to bring your own
                        blankets or pillows! Learn more about the code of
                        conduct{" "}
                        <a
                          href="/conduct"
                          className="text-[#c7c8e2] hover:text-white underline font-medium duration-200 ease-in-out transition"
                        >
                          here.
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {errorText && (
            <div className="flex px-1 text-center text-xs w-full justify-center mb-10 text-red-500/70 lg:order-none order-6">
              {errorText}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default MemberCard;
