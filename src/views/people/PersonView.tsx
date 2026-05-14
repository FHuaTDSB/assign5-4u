import { FaCalendar, FaCrow, FaLocationArrow, FaLongArrowAltLeft, FaStar } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, DetailItem, LinkGroup } from "@/components";
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <div className="grid min-h-full w-full grid-rows-[auto_1fr] justify-self-center p-5 pt-0">
      <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
        <div className="flex flex-col items-center gap-4">
          <img alt={data.name} className="w-50 rounded-xl object-cover" src={getImageUrl(data.profile_path)} />
          <Button onClick={() => navigate(-1)}>
            <div className="flex items-center gap-2">
              <FaLongArrowAltLeft /> Back
            </div>
          </Button>
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl text-gray-100">{data.name}</h1>
          <div className="grid grid-cols-4 gap-4 pt-2">
            <DetailItem icon={<FaCalendar />} label="Born" value={data.birthday} />
            <DetailItem icon={<FaCrow />} label="Died" value={data.deathday || "N/A"} />
            <DetailItem icon={<FaLocationArrow />} label="Place of Birth" value={data.place_of_birth} />
            <DetailItem icon={<FaStar />} label="Known for" value={data.known_for_department} />
          </div>
          <p className="text-blue-200 leading-relaxed">{data.biography}</p>
          <LinkGroup
            options={[
              { label: "Career", to: "career" },
              { label: "Images", to: "images" },
            ]}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
