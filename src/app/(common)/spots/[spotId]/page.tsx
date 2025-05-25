import SpotDetailsPage from "@/components/pages/common/spot-details/SpotDetailsPage";
import React from "react";

const SpotDetails = async ({
  params,
}: {
  params: Promise<{ spotId: string }>;
}) => {
  const { spotId } = await params;
  return (
    <div>
      <SpotDetailsPage spotId={spotId} />
    </div>
  );
};

export default SpotDetails;
