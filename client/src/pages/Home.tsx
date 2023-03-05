import React from "react";
import { useList } from "@pankod/refine-core";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  TopAgent,
  PropertyCard,
} from "components";
import { Typography, Box, Stack } from "@pankod/refine-mui";
const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const latestProperties = data?.data ?? [];
  if (isLoading) return <div>Is loading</div>;
  if (isError) return <div>Is wrong</div>;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display={"flex"} flexWrap={"wrap"} gap={4}>
        <PieChart
          title="Propterties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#475be8", "#e4b8ef"]}
        />
        <PieChart
          title="Propterties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Customers"
          value={5520}
          series={[75, 25]}
          colors={["#475be8", "#e4e8bf"]}
        />
        <PieChart
          title="Total Cities"
          value={555}
          series={[75, 25]}
          colors={["#475be8", "#e3e7bf"]}
        />
      </Box>
      <Stack
        gap={4}
        mt="25px"
        width={"100%"}
        direction={{ xs: "column", lg: "row" }}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding={"20px"}
        bgcolor="#fcfcfc"
        display={"flex"}
        flexDirection="column"
        minWidth={"100%"}
        mt="25px"
      >
        <Typography fontSize={"18px"} fontWeight={600} color="#11142d">
          Latest properties
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map((prop) => (
            <PropertyCard
              key={prop._id}
              id={prop._id}
              title={prop.title}
              location={prop.location}
              price={prop.price}
              photo={prop.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
