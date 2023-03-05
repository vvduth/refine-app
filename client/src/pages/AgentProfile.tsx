import React from "react";
import { useParams } from "@pankod/refine-react-router-v6";
import { useGetIdentity, useOne } from "@pankod/refine-core";
import { Profile } from "components";
const AgentProfile = () => {
 

  const {id}  = useParams() ; 

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string ,
  });

  const myProfile = data?.data ?? [];
  if (isLoading) return <div>Is loading</div>;
  if (isError) return <div>Is error</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
